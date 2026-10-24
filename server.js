const crypto = require('node:crypto');
const { promisify } = require('node:util');
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const scrypt = promisify(crypto.scrypt);
const SESSION_COOKIE = 'portal_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

const seedCourses = [
    { code: 'CIS401', title: 'Software Engineering', category: 'Core', credits: 20, progress: 82, description: 'Design patterns, testing strategy, and modern software delivery practices.' },
    { code: 'CIS402', title: 'Distributed Systems', category: 'Core', credits: 20, progress: 68, description: 'Cloud architecture, scalability, service coordination, and resilient system design.' },
    { code: 'CIS403', title: 'Professional Practice', category: 'Core', credits: 15, progress: 74, description: 'Professional communication, workplace readiness, and career planning support.' },
    { code: 'CIS404', title: 'Database Systems', category: 'Elective', credits: 15, progress: 57, description: 'Relational modelling, query design, and efficient data management principles.' },
    { code: 'CIS405', title: 'Human-Computer Interaction', category: 'Elective', credits: 15, progress: 61, description: 'User-centred design, accessibility, and evaluation of digital experiences.' },
    { code: 'CIS406', title: 'Final Year Project', category: 'Project', credits: 40, progress: 88, description: 'Independent project development with research, implementation, and reflection.' }
];

const seedStudents = [
    { username: 'student', displayName: 'Aisha Rahman', studentId: 'UB234567', email: 'aisha.rahman@example.edu', dateOfBirth: '2002-05-14', address: '12 Sample Street, Luton, LU1 2AB', attendance: 94, courseStart: '2023-09-18', expectedLeaving: '2026-06-30', status: 'On track', password: process.env.DEMO_STUDENT_PASSWORD || 'password' },
    { username: 'demo-daniel', displayName: 'Daniel Smith', studentId: 'UB234568', email: 'daniel.smith@example.edu', dateOfBirth: '2001-11-03', address: '8 Example Road, Bedford, MK40 1AA', attendance: 81, courseStart: '2023-09-18', expectedLeaving: '2026-06-30', status: 'Needs review' },
    { username: 'demo-priya', displayName: 'Priya Shah', studentId: 'UB234569', email: 'priya.shah@example.edu', dateOfBirth: '2002-02-21', address: '24 Demo Avenue, Milton Keynes, MK9 2AB', attendance: 97, courseStart: '2023-09-18', expectedLeaving: '2026-06-30', status: 'On track' },
    { username: 'demo-omar', displayName: 'Omar Ali', studentId: 'UB234570', email: 'omar.ali@example.edu', dateOfBirth: '2001-08-09', address: '5 Example Close, Luton, LU2 7AA', attendance: 73, courseStart: '2023-09-18', expectedLeaving: '2026-06-30', status: 'Action needed' }
];

const seedLibrary = [
    { title: 'Clean Code', author: 'Robert C. Martin', category: 'Software' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Systems' },
    { title: 'Human-Computer Interaction', author: 'Alan Dix', category: 'Design' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Career' },
    { title: 'Operating Systems', author: 'A. Silberschatz', category: 'Computing' }
];

function dateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function createDatabase(databasePath) {
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    const db = new DatabaseSync(databasePath);
    db.exec('PRAGMA foreign_keys = ON');
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            display_name TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
            password_salt TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            student_id TEXT UNIQUE,
            email TEXT,
            date_of_birth TEXT,
            home_address TEXT,
            attendance_percent INTEGER,
            course_start TEXT,
            expected_leaving TEXT,
            academic_status TEXT NOT NULL DEFAULT 'On track',
            login_enabled INTEGER NOT NULL DEFAULT 1 CHECK (login_enabled IN (0, 1)),
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY,
            code TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            credits INTEGER NOT NULL,
            progress INTEGER NOT NULL DEFAULT 0,
            description TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS enrollments (
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, course_id)
        );
        CREATE TABLE IF NOT EXISTS sessions (
            token_hash TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            expires_at TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS login_activity (
            id INTEGER PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            username TEXT NOT NULL,
            display_name TEXT NOT NULL,
            event TEXT NOT NULL CHECK (event IN ('Signed in', 'Signed out')),
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
            check_in_at TEXT NOT NULL,
            check_out_at TEXT,
            date_key TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS attendance_date_idx ON attendance(date_key, course_id);
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            created_by INTEGER NOT NULL REFERENCES users(id),
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS library_items (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            category TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS library_loans (
            id INTEGER PRIMARY KEY,
            item_id INTEGER NOT NULL REFERENCES library_items(id),
            user_id INTEGER NOT NULL REFERENCES users(id),
            loaned_at TEXT NOT NULL,
            due_at TEXT NOT NULL,
            returned_at TEXT
        );
        CREATE INDEX IF NOT EXISTS library_loan_item_idx ON library_loans(item_id, returned_at);
        CREATE TABLE IF NOT EXISTS library_reservations (
            id INTEGER PRIMARY KEY,
            item_id INTEGER NOT NULL REFERENCES library_items(id),
            user_id INTEGER NOT NULL REFERENCES users(id),
            reserved_at TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Waiting'
        );
    `);
    return db;
}

async function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    const derivedKey = await scrypt(password, salt, 64);
    return { salt, hash: derivedKey.toString('hex') };
}

async function seedDatabase(db) {
    const insertUser = db.prepare(`
        INSERT OR IGNORE INTO users (
            username, display_name, role, password_salt, password_hash, student_id, email,
            date_of_birth, home_address, attendance_percent, course_start, expected_leaving,
            academic_status, login_enabled, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const findUser = db.prepare('SELECT id FROM users WHERE username = ?');
    const insertCourse = db.prepare(`
        INSERT OR IGNORE INTO courses (code, title, category, credits, progress, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const findCourse = db.prepare('SELECT id FROM courses WHERE code = ?');
    const addEnrollment = db.prepare('INSERT OR IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)');

    const students = [...seedStudents];
    const adminPassword = process.env.DEMO_ADMIN_PASSWORD || 'admin123';
    const usersToSeed = [
        ...students.map((student) => ({ ...student, role: 'student' })),
        { username: 'admin', displayName: 'Portal Administrator', role: 'admin', password: adminPassword, status: 'Administrator' }
    ];

    for (const user of usersToSeed) {
        const password = user.password || crypto.randomBytes(32).toString('hex');
        const { salt, hash } = await hashPassword(password);
        insertUser.run(
            user.username, user.displayName, user.role, salt, hash, user.studentId || null,
            user.email || null, user.dateOfBirth || null, user.address || null,
            user.attendance ?? null, user.courseStart || null, user.expectedLeaving || null,
            user.status || 'On track', user.login_enabled === false ? 0 : 1, new Date().toISOString()
        );
    }

    for (const course of seedCourses) {
        insertCourse.run(course.code, course.title, course.category, course.credits, course.progress, course.description);
    }

    for (const student of students) {
        const user = findUser.get(student.username);
        for (const course of seedCourses) {
            const courseRow = findCourse.get(course.code);
            addEnrollment.run(user.id, courseRow.id);
        }
    }

    const addItem = db.prepare('INSERT OR IGNORE INTO library_items (id, title, author, category) VALUES (?, ?, ?, ?)');
    seedLibrary.forEach((item, index) => addItem.run(index + 1, item.title, item.author, item.category));
}

function sha256(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

function readCookie(request, name) {
    const cookies = request.headers.cookie || '';
    for (const cookie of cookies.split(';')) {
        const separator = cookie.indexOf('=');
        if (separator < 0) continue;
        if (cookie.slice(0, separator).trim() === name) return decodeURIComponent(cookie.slice(separator + 1).trim());
    }
    return null;
}

function todayRange(date = new Date()) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start: start.toISOString(), end: end.toISOString() };
}

async function createPortalApp(options = {}) {
    const databasePath = options.databasePath || process.env.PORTAL_DB_PATH || path.join(__dirname, 'data', 'portal.sqlite');
    const db = createDatabase(databasePath);
    await seedDatabase(db);
    const app = express();

    app.disable('x-powered-by');
    app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : false);
    app.use(express.json({ limit: '32kb' }));

    function requireAuth(request, response, next) {
        const rawToken = readCookie(request, SESSION_COOKIE);
        if (!rawToken) return response.status(401).json({ error: 'Sign in to continue.' });

        const session = db.prepare(`
            SELECT u.id, u.username, u.display_name AS displayName, u.role, u.student_id AS studentId
            FROM sessions s JOIN users u ON u.id = s.user_id
            WHERE s.token_hash = ? AND s.expires_at > ? AND u.login_enabled = 1
        `).get(sha256(rawToken), new Date().toISOString());
        if (!session) return response.status(401).json({ error: 'Your session has expired. Sign in again.' });
        request.user = session;
        request.sessionTokenHash = sha256(rawToken);
        next();
    }

    function requireAdmin(request, response, next) {
        if (request.user?.role !== 'admin') return response.status(403).json({ error: 'Administrator access is required.' });
        next();
    }

    function requireStudent(request, response, next) {
        if (request.user?.role !== 'student') return response.status(403).json({ error: 'Student access is required.' });
        next();
    }

    function recordLoginEvent(user, event) {
        db.prepare(`INSERT INTO login_activity (user_id, username, display_name, event, created_at) VALUES (?, ?, ?, ?, ?)`)
            .run(user.id, user.username, user.display_name || user.displayName, event, new Date().toISOString());
    }

    app.get('/api/health', (request, response) => response.json({ status: 'ok' }));

    app.post('/api/auth/login', async (request, response) => {
        const username = String(request.body?.username || '').trim().toLowerCase();
        const password = String(request.body?.password || '');
        const requestedRole = request.body?.role;
        if (!username || password.length < 1 || !['student', 'admin'].includes(requestedRole)) {
            return response.status(400).json({ error: 'Enter a username, password, and account type.' });
        }

        const user = db.prepare('SELECT * FROM users WHERE username = ? AND login_enabled = 1').get(username);
        const fallback = user || { password_salt: 'portal-login-check', password_hash: '0'.repeat(128) };
        const { hash } = await hashPassword(password, fallback.password_salt);
        const supplied = Buffer.from(hash, 'hex');
        const expected = Buffer.from(fallback.password_hash, 'hex');
        const validPassword = supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);

        if (!user || user.role !== requestedRole || !validPassword) {
            return response.status(401).json({ error: 'The username or password is incorrect.' });
        }

        const token = crypto.randomBytes(32).toString('base64url');
        const now = new Date();
        const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);
        db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
            .run(sha256(token), user.id, expiresAt.toISOString(), now.toISOString());
        recordLoginEvent(user, 'Signed in');
        response.cookie(SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: SESSION_DURATION_MS
        });
        response.json({ user: { id: user.id, username: user.username, displayName: user.display_name, role: user.role } });
    });

    app.post('/api/auth/logout', requireAuth, (request, response) => {
        db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(request.sessionTokenHash);
        recordLoginEvent(request.user, 'Signed out');
        response.clearCookie(SESSION_COOKIE, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
        response.status(204).end();
    });

    app.get('/api/auth/me', requireAuth, (request, response) => {
        response.json({ user: request.user });
    });

    app.get('/api/courses', requireAuth, (request, response) => {
        const courses = db.prepare(`
            SELECT c.id, c.code, c.title, c.category, c.credits, c.progress, c.description
            FROM courses c JOIN enrollments e ON e.course_id = c.id
            WHERE e.user_id = ? ORDER BY c.code
        `).all(request.user.id);
        response.json({ courses });
    });

    app.get('/api/admin/courses', requireAuth, requireAdmin, (request, response) => {
        const courses = db.prepare(`
            SELECT c.id, c.code, c.title, c.category, c.credits, c.progress, c.description,
                COUNT(e.user_id) AS enrolledStudents
            FROM courses c LEFT JOIN enrollments e ON e.course_id = c.id
            GROUP BY c.id ORDER BY c.code
        `).all();
        response.json({ courses });
    });

    app.get('/api/profile', requireAuth, requireStudent, (request, response) => {
        const profile = db.prepare(`
            SELECT username, display_name AS name, student_id AS studentId, email,
                academic_status AS status, attendance_percent AS attendance,
                course_start AS courseStart, expected_leaving AS expectedLeaving
            FROM users WHERE id = ?
        `).get(request.user.id);
        const courses = db.prepare(`SELECT c.title FROM courses c JOIN enrollments e ON e.course_id = c.id WHERE e.user_id = ? ORDER BY c.code`)
            .all(request.user.id);
        response.json({ profile: { ...profile, programme: courses[0]?.title || 'Unassigned', courses } });
    });

    app.put('/api/profile', requireAuth, requireStudent, (request, response) => {
        const displayName = String(request.body?.displayName || '').trim();
        if (displayName.length < 2 || displayName.length > 80) {
            return response.status(400).json({ error: 'Name must be between 2 and 80 characters.' });
        }
        db.prepare('UPDATE users SET display_name = ? WHERE id = ?').run(displayName, request.user.id);
        response.json({ profile: { ...request.user, name: displayName } });
    });

    app.get('/api/announcements', requireAuth, (request, response) => {
        const announcements = db.prepare(`
            SELECT a.id, a.title, a.message, a.created_at AS createdAt, u.display_name AS author
            FROM announcements a JOIN users u ON u.id = a.created_by
            ORDER BY a.created_at DESC LIMIT 30
        `).all();
        response.json({ announcements });
    });

    app.post('/api/announcements', requireAuth, requireAdmin, (request, response) => {
        const title = String(request.body?.title || '').trim();
        const message = String(request.body?.message || '').trim();
        if (!title || !message || title.length > 90 || message.length > 400) {
            return response.status(400).json({ error: 'Enter a title and message within the stated limits.' });
        }
        const result = db.prepare(`INSERT INTO announcements (title, message, created_by, created_at) VALUES (?, ?, ?, ?)`)
            .run(title, message, request.user.id, new Date().toISOString());
        response.status(201).json({ id: Number(result.lastInsertRowid), title, message });
    });

    app.get('/api/attendance/mine', requireAuth, (request, response) => {
        const records = db.prepare(`
            SELECT a.id, a.check_in_at AS checkInAt, a.check_out_at AS checkOutAt,
                a.date_key AS dateKey, c.id AS courseId, c.title AS className
            FROM attendance a JOIN courses c ON c.id = a.course_id
            WHERE a.user_id = ? ORDER BY a.check_in_at DESC LIMIT 50
        `).all(request.user.id);
        response.json({ attendance: records });
    });

    app.post('/api/attendance/check-in', requireAuth, (request, response) => {
        if (request.user.role !== 'student') return response.status(403).json({ error: 'Only student accounts can check in.' });
        const courseId = Number(request.body?.courseId);
        if (!Number.isInteger(courseId)) return response.status(400).json({ error: 'Select a class.' });
        const enrolled = db.prepare('SELECT 1 FROM enrollments WHERE user_id = ? AND course_id = ?').get(request.user.id, courseId);
        if (!enrolled) return response.status(403).json({ error: 'You are not enrolled in this class.' });

        const existing = db.prepare(`SELECT id FROM attendance WHERE user_id = ? AND course_id = ? AND date_key = ? AND check_out_at IS NULL`)
            .get(request.user.id, courseId, dateKey());
        if (existing) return response.status(409).json({ error: 'You are already checked in to this class.', attendanceId: existing.id });

        const now = new Date().toISOString();
        const result = db.prepare(`INSERT INTO attendance (user_id, course_id, check_in_at, date_key) VALUES (?, ?, ?, ?)`)
            .run(request.user.id, courseId, now, dateKey());
        response.status(201).json({ attendanceId: Number(result.lastInsertRowid), checkInAt: now });
    });

    app.post('/api/attendance/:id/check-out', requireAuth, (request, response) => {
        if (request.user.role !== 'student') return response.status(403).json({ error: 'Only student accounts can check out.' });
        const result = db.prepare(`
            UPDATE attendance SET check_out_at = ?
            WHERE id = ? AND user_id = ? AND check_out_at IS NULL
        `).run(new Date().toISOString(), Number(request.params.id), request.user.id);
        if (result.changes !== 1) return response.status(404).json({ error: 'Active check-in not found.' });
        response.status(204).end();
    });

    app.get('/api/admin/overview', requireAuth, requireAdmin, (request, response) => {
        const { start, end } = todayRange();
        const signIns = db.prepare(`
            SELECT COUNT(*) AS count FROM login_activity a JOIN users u ON u.id = a.user_id
            WHERE u.role = 'student' AND a.event = 'Signed in' AND a.created_at >= ? AND a.created_at < ?
        `).get(start, end).count;
        const activeSessions = db.prepare(`
            SELECT COUNT(*) AS count FROM sessions s JOIN users u ON u.id = s.user_id
            WHERE u.role = 'student' AND s.expires_at > ?
        `).get(new Date().toISOString()).count;
        const checkedIn = db.prepare(`SELECT COUNT(*) AS count FROM attendance WHERE date_key = ? AND check_out_at IS NULL`).get(dateKey()).count;
        const courseCount = db.prepare('SELECT COUNT(*) AS count FROM courses').get().count;
        response.json({ signInsToday: signIns, activeSessions, checkedIn, courseCount });
    });

    app.get('/api/admin/login-activity', requireAuth, requireAdmin, (request, response) => {
        const activity = db.prepare(`
            SELECT a.username, a.display_name AS student, a.event, a.created_at AS timestamp
            FROM login_activity a JOIN users u ON u.id = a.user_id
            WHERE u.role = 'student' ORDER BY a.id DESC LIMIT 100
        `).all();
        response.json({ activity });
    });

    app.get('/api/admin/students', requireAuth, requireAdmin, (request, response) => {
        const students = db.prepare(`
            SELECT u.id, u.username, u.display_name AS name, u.student_id AS studentId,
                u.email, u.academic_status AS status, u.attendance_percent AS attendance,
                CASE WHEN EXISTS (
                    SELECT 1 FROM sessions s WHERE s.user_id = u.id AND s.expires_at > ?
                ) THEN 1 ELSE 0 END AS hasActiveSession,
                (SELECT c.title FROM enrollments e JOIN courses c ON c.id = e.course_id
                    WHERE e.user_id = u.id ORDER BY c.code LIMIT 1) AS programme
            FROM users u WHERE u.role = 'student' ORDER BY u.display_name
        `).all(new Date().toISOString());
        response.json({ students });
    });

    app.get('/api/admin/students/:studentId', requireAuth, requireAdmin, (request, response) => {
        const student = db.prepare(`
            SELECT id, username, display_name AS name, student_id AS studentId, email,
                date_of_birth AS dateOfBirth, home_address AS address,
                attendance_percent AS attendance, course_start AS courseStart,
                expected_leaving AS expectedLeaving, academic_status AS status
            FROM users WHERE role = 'student' AND student_id = ?
        `).get(request.params.studentId);
        if (!student) return response.status(404).json({ error: 'Student record not found.' });

        const courses = db.prepare(`SELECT c.id, c.title FROM courses c JOIN enrollments e ON e.course_id = c.id WHERE e.user_id = ? ORDER BY c.code`)
            .all(student.id);
        const latestAttendance = db.prepare(`
            SELECT c.title AS className, a.check_in_at AS checkInAt, a.check_out_at AS checkOutAt
            FROM attendance a JOIN courses c ON c.id = a.course_id
            WHERE a.user_id = ? ORDER BY a.check_in_at DESC LIMIT 1
        `).get(student.id) || null;
        response.json({ student: { ...student, courses, latestAttendance } });
    });

    app.get('/api/admin/attendance', requireAuth, requireAdmin, (request, response) => {
        const selectedDate = /^\d{4}-\d{2}-\d{2}$/.test(String(request.query.date || '')) ? request.query.date : dateKey();
        const courseId = Number(request.query.courseId) || null;
        const records = db.prepare(`
            SELECT a.id, u.display_name AS student, u.student_id AS studentId,
                c.id AS courseId, c.title AS className, a.check_in_at AS checkInAt,
                a.check_out_at AS checkOutAt, a.date_key AS dateKey
            FROM attendance a JOIN users u ON u.id = a.user_id JOIN courses c ON c.id = a.course_id
            WHERE a.date_key = ? AND (? IS NULL OR c.id = ?)
            ORDER BY a.check_in_at DESC
        `).all(selectedDate, courseId, courseId);
        response.json({ attendance: records });
    });

    app.get('/api/library', requireAuth, (request, response) => {
        const items = db.prepare(`
            SELECT i.id, i.title, i.author, i.category,
                CASE WHEN EXISTS (SELECT 1 FROM library_loans l WHERE l.item_id = i.id AND l.returned_at IS NULL AND l.user_id = ?)
                    THEN 'Borrowed'
                    WHEN EXISTS (SELECT 1 FROM library_loans l WHERE l.item_id = i.id AND l.returned_at IS NULL)
                    THEN 'Unavailable'
                    ELSE 'Available' END AS status,
                (SELECT l.due_at FROM library_loans l WHERE l.item_id = i.id AND l.user_id = ? AND l.returned_at IS NULL LIMIT 1) AS dueAt,
                (SELECT COUNT(*) FROM library_reservations r WHERE r.item_id = i.id AND r.status = 'Waiting') AS queueLength
            FROM library_items i ORDER BY i.title
        `).all(request.user.id, request.user.id);
        response.json({ items });
    });

    app.post('/api/library/:itemId/borrow', requireAuth, (request, response) => {
        if (request.user.role !== 'student') return response.status(403).json({ error: 'Only student accounts can borrow items.' });
        const itemId = Number(request.params.itemId);
        const item = db.prepare('SELECT id FROM library_items WHERE id = ?').get(itemId);
        if (!item) return response.status(404).json({ error: 'Library item not found.' });
        const activeLoan = db.prepare('SELECT id FROM library_loans WHERE item_id = ? AND returned_at IS NULL').get(itemId);
        if (activeLoan) return response.status(409).json({ error: 'This item is currently unavailable.' });
        const now = new Date();
        const due = new Date(now);
        due.setDate(due.getDate() + 14);
        db.prepare('INSERT INTO library_loans (item_id, user_id, loaned_at, due_at) VALUES (?, ?, ?, ?)')
            .run(itemId, request.user.id, now.toISOString(), due.toISOString());
        response.status(201).json({ status: 'Borrowed', dueAt: due.toISOString() });
    });

    app.post('/api/library/:itemId/reserve', requireAuth, (request, response) => {
        if (request.user.role !== 'student') return response.status(403).json({ error: 'Only student accounts can reserve items.' });
        const itemId = Number(request.params.itemId);
        const item = db.prepare('SELECT id FROM library_items WHERE id = ?').get(itemId);
        if (!item) return response.status(404).json({ error: 'Library item not found.' });
        const activeReservation = db.prepare(`SELECT id FROM library_reservations WHERE item_id = ? AND user_id = ? AND status = 'Waiting'`).get(itemId, request.user.id);
        if (activeReservation) return response.status(409).json({ error: 'You already have an active reservation.' });
        db.prepare('INSERT INTO library_reservations (item_id, user_id, reserved_at) VALUES (?, ?, ?)')
            .run(itemId, request.user.id, new Date().toISOString());
        response.status(201).json({ status: 'Reserved' });
    });

    app.post('/api/library/:itemId/return', requireAuth, (request, response) => {
        if (request.user.role !== 'student') return response.status(403).json({ error: 'Only student accounts can return items.' });
        const result = db.prepare(`UPDATE library_loans SET returned_at = ? WHERE item_id = ? AND user_id = ? AND returned_at IS NULL`)
            .run(new Date().toISOString(), Number(request.params.itemId), request.user.id);
        if (result.changes !== 1) return response.status(404).json({ error: 'No active loan found for this item.' });
        response.status(204).end();
    });

    app.use('/api', (request, response) => response.status(404).json({ error: 'API route not found.' }));
    const publicFiles = new Set([
        'index.html', 'dashboard.html', 'courses.html', 'assignments.html',
        'timetable.html', 'profile.html', 'library.html', 'support.html',
        'admin.html', 'style.css', 'script.js'
    ]);
    app.get('/', (request, response) => response.sendFile(path.join(__dirname, 'index.html')));
    app.get('/:fileName', (request, response, next) => {
        if (!publicFiles.has(request.params.fileName)) return next();
        response.sendFile(path.join(__dirname, request.params.fileName));
    });
    app.use((error, request, response, next) => {
        console.error(error);
        if (response.headersSent) return next(error);
        response.status(500).json({ error: 'An unexpected server error occurred.' });
    });

    return { app, db };
}

if (require.main === module) {
    const port = Number(process.env.PORT || 8001);
    createPortalApp().then(({ app }) => {
        app.listen(port, () => console.log(`Student portal running at http://localhost:${port}`));
    }).catch((error) => {
        console.error('Could not start the student portal:', error);
        process.exitCode = 1;
    });
}

module.exports = { createPortalApp };