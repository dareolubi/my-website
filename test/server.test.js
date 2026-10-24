const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createPortalApp } = require('../server');

let app;
let db;
let server;
let baseUrl;

test.before(async () => {
    ({ app, db } = await createPortalApp({ databasePath: ':memory:' }));
    server = app.listen(0);
    await new Promise((resolve) => server.once('listening', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    db.close();
});

async function api(path, { cookie, ...options } = {}) {
    const headers = new Headers(options.headers || {});
    if (cookie) headers.set('cookie', cookie);
    if (options.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
    return fetch(`${baseUrl}${path}`, { ...options, headers });
}

async function signIn(role, username, password) {
    const response = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ role, username, password })
    });
    const cookie = response.headers.get('set-cookie')?.split(';')[0];
    return { response, cookie };
}

test('health endpoint is available without authentication', async () => {
    const response = await api('/api/health');
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
});

test('static hosting serves portal pages but not server internals', async () => {
    const page = await api('/index.html');
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type'), /text\/html/);

    const source = await api('/server.js');
    assert.equal(source.status, 404);

    const database = await api('/data/portal.sqlite');
    assert.equal(database.status, 404);
});

test('login checks the selected role and protects admin routes', async () => {
    const wrongRole = await signIn('admin', 'student', 'password');
    assert.equal(wrongRole.response.status, 401);

    const student = await signIn('student', 'student', 'password');
    assert.equal(student.response.status, 200);
    assert.match(student.response.headers.get('set-cookie'), /HttpOnly/i);

    const denied = await api('/api/admin/students', { cookie: student.cookie });
    assert.equal(denied.status, 403);

    const admin = await signIn('admin', 'admin', 'admin123');
    assert.equal(admin.response.status, 200);
    const allowed = await api('/api/admin/students', { cookie: admin.cookie });
    assert.equal(allowed.status, 200);
    assert.equal((await allowed.json()).students.length, 4);
});

test('logout invalidates the server session', async () => {
    const { cookie } = await signIn('student', 'student', 'password');
    const logout = await api('/api/auth/logout', { method: 'POST', cookie });
    assert.equal(logout.status, 204);

    const session = await api('/api/auth/me', { cookie });
    assert.equal(session.status, 401);
});

test('student profile updates are stored in the database', async () => {
    const { cookie } = await signIn('student', 'student', 'password');
    const updated = await api('/api/profile', {
        method: 'PUT',
        cookie,
        body: JSON.stringify({ displayName: 'Aisha Portal Demo' })
    });
    assert.equal(updated.status, 200);

    const readback = await api('/api/profile', { cookie });
    assert.equal((await readback.json()).profile.name, 'Aisha Portal Demo');
});

test('SQLite records survive an API server restart', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'student-portal-'));
    const databasePath = path.join(directory, 'portal.sqlite');
    let instance = await createPortalApp({ databasePath });
    let instanceServer = instance.app.listen(0);
    await new Promise((resolve) => instanceServer.once('listening', resolve));
    let instanceUrl = `http://127.0.0.1:${instanceServer.address().port}`;

    try {
        const login = await fetch(`${instanceUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ role: 'admin', username: 'admin', password: 'admin123' })
        });
        const cookie = login.headers.get('set-cookie').split(';')[0];
        const publication = await fetch(`${instanceUrl}/api/announcements`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', cookie },
            body: JSON.stringify({ title: 'Persistent notice', message: 'Stored across server restart.' })
        });
        assert.equal(publication.status, 201);

        await new Promise((resolve, reject) => instanceServer.close((error) => error ? reject(error) : resolve()));
        instance.db.close();

        instance = await createPortalApp({ databasePath });
        instanceServer = instance.app.listen(0);
        await new Promise((resolve) => instanceServer.once('listening', resolve));
        instanceUrl = `http://127.0.0.1:${instanceServer.address().port}`;
        const announcements = await fetch(`${instanceUrl}/api/announcements`, { headers: { cookie } });
        assert.equal(announcements.status, 200);
        assert.equal((await announcements.json()).announcements[0].title, 'Persistent notice');
    } finally {
        if (instanceServer.listening) {
            await new Promise((resolve, reject) => instanceServer.close((error) => error ? reject(error) : resolve()));
        }
        instance.db.close();
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

test('student attendance is stored and can be checked out', async () => {
    const { cookie } = await signIn('student', 'student', 'password');
    const coursesResponse = await api('/api/courses', { cookie });
    const courses = (await coursesResponse.json()).courses;
    const course = courses.find((item) => item.title === 'Distributed Systems');

    const checkedIn = await api('/api/attendance/check-in', {
        method: 'POST',
        cookie,
        body: JSON.stringify({ courseId: course.id })
    });
    assert.equal(checkedIn.status, 201);
    const attendanceId = (await checkedIn.json()).attendanceId;

    const duplicate = await api('/api/attendance/check-in', {
        method: 'POST',
        cookie,
        body: JSON.stringify({ courseId: course.id })
    });
    assert.equal(duplicate.status, 409);

    const checkedOut = await api(`/api/attendance/${attendanceId}/check-out`, { method: 'POST', cookie });
    assert.equal(checkedOut.status, 204);

    const mine = await api('/api/attendance/mine', { cookie });
    const records = (await mine.json()).attendance;
    assert.equal(records[0].className, 'Distributed Systems');
    assert.ok(records[0].checkOutAt);
});

test('admin announcement is visible to signed-in students', async () => {
    const admin = await signIn('admin', 'admin', 'admin123');
    const published = await api('/api/announcements', {
        method: 'POST',
        cookie: admin.cookie,
        body: JSON.stringify({ title: 'Library hours', message: 'The library closes at 10pm this week.' })
    });
    assert.equal(published.status, 201);

    const student = await signIn('student', 'student', 'password');
    const announcements = await api('/api/announcements', { cookie: student.cookie });
    assert.equal((await announcements.json()).announcements[0].title, 'Library hours');
});

test('library borrowing persists and prevents double lending', async () => {
    const { cookie } = await signIn('student', 'student', 'password');
    const itemsResponse = await api('/api/library', { cookie });
    const items = (await itemsResponse.json()).items;
    const item = items.find((record) => record.title === 'Clean Code');

    const borrowed = await api(`/api/library/${item.id}/borrow`, { method: 'POST', cookie });
    assert.equal(borrowed.status, 201);

    const duplicate = await api(`/api/library/${item.id}/borrow`, { method: 'POST', cookie });
    assert.equal(duplicate.status, 409);

    const refreshed = await api('/api/library', { cookie });
    assert.equal((await refreshed.json()).items.find((record) => record.id === item.id).status, 'Borrowed');
});