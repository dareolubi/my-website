let courseData = [
    { title: 'Software Engineering', category: 'Core', credit: '20 credits', progress: 82, description: 'Design patterns, testing strategy, and modern software delivery practices.' },
    { title: 'Distributed Systems', category: 'Core', credit: '20 credits', progress: 68, description: 'Cloud architecture, scalability, service coordination, and resilient system design.' },
    { title: 'Professional Practice', category: 'Core', credit: '15 credits', progress: 74, description: 'Professional communication, workplace readiness, and career planning support.' },
    { title: 'Database Systems', category: 'Elective', credit: '15 credits', progress: 57, description: 'Relational modelling, query design, and efficient data management principles.' },
    { title: 'Human-Computer Interaction', category: 'Elective', credit: '15 credits', progress: 61, description: 'User-centred design, accessibility, and evaluation of digital experiences.' },
    { title: 'Final Year Project', category: 'Project', credit: '40 credits', progress: 88, description: 'Independent project development with research, implementation, and reflection.' }
];

const assignmentData = [
    { title: 'Final Year Project', description: 'Prototype and proposal review', due: '12 Nov', status: 'submitted' },
    { title: 'Distributed Systems Report', description: 'Architecture analysis and evaluation', due: '18 Nov', status: 'progress' },
    { title: 'Professional Practice Portfolio', description: 'Reflective portfolio and CV', due: '25 Nov', status: 'due' },
    { title: 'Database Systems Case Study', description: 'Query optimisation and schema design', due: '30 Nov', status: 'progress' }
];

const quotePool = [
    'Success is the sum of small efforts, repeated day in and day out.',
    'Discipline is choosing between what you want most and what you want now.',
    'Your future depends on many of your daily habits.',
    'The best way to predict the future is to build it.'
];

const factPool = [
    'The first computer mouse was made of wood.',
    'A group of flamingos is called a flamboyance.',
    'Octopuses have three hearts.',
    'Bananas are berries, but strawberries are not.'
];

const timetableData = [
    {
        day: 'Monday',
        slots: [
            { time: '09:00', module: 'Software Engineering', room: 'A1', type: 'Seminar' },
            { time: '11:00', module: 'Distributed Systems', room: 'B3', type: 'Lecture' },
            { time: '14:00', module: 'Professional Practice', room: 'C2', type: 'Workshop' }
        ]
    },
    {
        day: 'Tuesday',
        slots: [
            { time: '10:00', module: 'Database Systems', room: 'Lab 2', type: 'Practical' },
            { time: '13:00', module: 'Human-Computer Interaction', room: 'D4', type: 'Tutorial' }
        ]
    },
    {
        day: 'Wednesday',
        slots: [
            { time: '09:30', module: 'Final Year Project', room: 'Studio 5', type: 'Mentoring' },
            { time: '15:00', module: 'Professional Practice', room: 'C1', type: 'Seminar' }
        ]
    },
    {
        day: 'Thursday',
        slots: [
            { time: '11:00', module: 'Distributed Systems', room: 'B5', type: 'Lab' },
            { time: '15:30', module: 'Software Engineering', room: 'A2', type: 'Group work' }
        ]
    },
    {
        day: 'Friday',
        slots: [
            { time: '10:00', module: 'Career Development', room: 'HUB', type: 'Workshop' },
            { time: '12:00', module: 'Final Year Project', room: 'Studio 5', type: 'Review' }
        ]
    }
];

const profileData = {
    name: 'Aisha Rahman',
    studentId: 'UB234567',
    programme: 'BSc Computer Science',
    year: 'Level 6 / Year 3',
    email: 'aisha.rahman@beds.ac.uk',
    tutor: 'Dr. Samuel Patel',
    status: 'On track for a First-class degree',
    credits: '120 / 120',
    gpa: '3.8'
};

const palettes = {
    classic: { accent: '#7c3aed', accentStrong: '#5b21b6' },
    ocean: { accent: '#0ea5e9', accentStrong: '#0369a1' },
    sunset: { accent: '#f97316', accentStrong: '#c2410c' },
    forest: { accent: '#10b981', accentStrong: '#047857' }
};

function getCurrentUser() {
    return localStorage.getItem('portalUser') || 'student';
}

async function apiRequest(url, options = {}) {
    if (window.location.protocol === 'file:') {
        throw new Error('Start the backend with start-portal.bat, then open http://localhost:8001/index.html. Do not open index.html directly.');
    }
    const { body, headers: suppliedHeaders, ...requestOptions } = options;
    const headers = new Headers(suppliedHeaders || {});
    if (body !== undefined && !headers.has('content-type')) headers.set('content-type', 'application/json');
    const response = await fetch(url, {
        ...requestOptions,
        headers,
        credentials: 'same-origin',
        body: body === undefined ? undefined : JSON.stringify(body)
    });
    if (response.status === 204) return null;
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'The server could not complete that request.');
    return payload;
}

function cachePortalUser(user) {
    localStorage.setItem('portalUser', user.role);
    localStorage.setItem('username', user.username);
    localStorage.setItem('displayName', user.displayName || user.name || 'Student');
}

function clearCachedPortalUser() {
    localStorage.removeItem('portalUser');
    localStorage.removeItem('username');
    localStorage.removeItem('displayName');
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function setWelcomeMessage() {
    const element = document.getElementById('welcomeMessage');
    if (!element) return;

    const user = getCurrentUser();
    const name = user === 'admin' ? 'Admin' : (localStorage.getItem('username') || 'Student');
    const capitalised = name.charAt(0).toUpperCase() + name.slice(1);
    element.textContent = `Welcome, ${capitalised}`;
}

function applyPalette(name) {
    const palette = palettes[name] || palettes.classic;
    document.documentElement.style.setProperty('--bg-accent', palette.accent);
    document.documentElement.style.setProperty('--bg-accent-strong', palette.accentStrong);
    localStorage.setItem('portalPalette', name);
}

function bindThemePresets() {
    document.querySelectorAll('[data-palette]').forEach((button) => {
        button.addEventListener('click', () => {
            applyPalette(button.dataset.palette);
            document.querySelectorAll('[data-palette]').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
        });
    });
    const saved = localStorage.getItem('portalPalette') || 'classic';
    applyPalette(saved);
    const activeButton = document.querySelector(`[data-palette="${saved}"]`);
    if (activeButton) activeButton.classList.add('active');
}

function attachNavigationHandlers() {
    document.querySelectorAll('.nav-item[data-page]').forEach((button) => {
        button.addEventListener('click', async () => {
            const page = button.dataset.page;
            if (page === 'index.html') {
                try {
                    await apiRequest('/api/auth/logout', { method: 'POST' });
                } catch {
                    // The server session may already have expired.
                }
                clearCachedPortalUser();
            }
            window.location.href = page;
        });
    });
}

function bindDynamicClickTargets() {
    document.querySelectorAll('.click-target[data-page]').forEach((element) => {
        element.addEventListener('click', () => {
            const page = element.dataset.page;
            if (page) {
                window.location.href = page;
            }
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const page = element.dataset.page;
                if (page) {
                    window.location.href = page;
                }
            }
        });
    });
}

function loginHandler() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const errorText = document.getElementById('loginError');
    const usernameLabel = document.getElementById('usernameLabel');
    const loginBtn = document.getElementById('loginBtn');
    const roleButtons = document.querySelectorAll('[data-login-role]');

    if (!loginForm || !usernameInput || !passwordInput || !errorText || !usernameLabel || !loginBtn) return;

    let selectedRole = 'student';

    roleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            selectedRole = button.dataset.loginRole;
            roleButtons.forEach((roleButton) => {
                const isSelected = roleButton === button;
                roleButton.classList.toggle('active', isSelected);
                roleButton.setAttribute('aria-pressed', String(isSelected));
            });
            usernameLabel.textContent = selectedRole === 'admin' ? 'Admin username' : 'Student username';
            usernameInput.placeholder = selectedRole === 'admin' ? 'Enter your admin username' : 'Enter your student username';
            loginBtn.textContent = selectedRole === 'admin' ? 'Admin sign in' : 'Student sign in';
            errorText.textContent = '';
        });
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        try {
            const result = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: { username, password, role: selectedRole }
            });
            cachePortalUser(result.user);
            window.location.href = result.user.role === 'admin' ? 'admin.html' : 'dashboard.html';
        } catch (error) {
            errorText.textContent = error.message;
        }
    });
}

function renderCourses(filter = 'All') {
    const courseGrid = document.getElementById('courseGrid');
    if (!courseGrid) return;

    const visibleCourses = filter === 'All'
        ? courseData
        : courseData.filter((course) => course.category === filter);

    courseGrid.innerHTML = visibleCourses.map((course) => `
        <article class="course-card click-target" data-page="assignments.html" tabindex="0" role="button" aria-label="Open ${course.title} assignment details">
            <div class="card-top">
                <span class="course-badge">${course.category}</span>
                <span class="credit">${course.credit}</span>
            </div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="progress">
                <span class="progress-bar" style="width:${course.progress}%"></span>
            </div>
            <div class="course-meta">
                <span>${course.progress}% complete</span>
                <span>Next: seminar</span>
            </div>
        </article>
    `).join('');

    bindDynamicClickTargets();
}

async function loadCourseData() {
    const isAdminPage = Boolean(document.getElementById('adminSummary'));
    const result = await apiRequest(isAdminPage ? '/api/admin/courses' : '/api/courses');
    courseData = result.courses.map((course) => ({
        ...course,
        credit: `${course.credits} credits`
    }));
}

function bindCourseFilters() {
    document.querySelectorAll('.filter-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach((item) => item.classList.remove('active'));
            chip.classList.add('active');
            renderCourses(chip.textContent.trim());
        });
    });
}

function renderAssignments() {
    const assignmentList = document.getElementById('assignmentList');
    if (!assignmentList) return;

    assignmentList.innerHTML = assignmentData.map((item) => {
        const statusClass = item.status === 'submitted'
            ? 'status-submitted'
            : item.status === 'due'
                ? 'status-due'
                : 'status-progress';

        const humanStatus = item.status === 'submitted'
            ? 'Submitted'
            : item.status === 'due'
                ? 'Due soon'
                : 'In progress';

        return `
            <article class="assignment-item click-target" data-page="support.html" tabindex="0" role="button" aria-label="Open support for ${item.title}">
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
                <div>
                    <p>Due: ${item.due}</p>
                </div>
                <span class="assignment-status ${statusClass}">${humanStatus}</span>
            </article>
        `;
    }).join('');

    bindDynamicClickTargets();
}

async function renderLibrary() {
    const libraryGrid = document.getElementById('libraryGrid');
    if (!libraryGrid) return;

    let items;
    try {
        items = (await apiRequest('/api/library')).items;
    } catch (error) {
        libraryGrid.innerHTML = `<p class="empty-table-message">${escapeHTML(error.message)}</p>`;
        return;
    }

    libraryGrid.innerHTML = items.map((item) => {
        const statusClass = item.status === 'Available' ? 'status-submitted' : item.status === 'Borrowed' ? 'status-progress' : 'status-due';
        const action = item.status === 'Borrowed' ? 'Return' : item.status === 'Available' ? 'Borrow' : 'Reserve';
        const due = item.status === 'Borrowed' && item.dueAt
            ? `Due ${new Date(item.dueAt).toLocaleDateString()}`
            : item.status === 'Unavailable'
                ? `Waiting list: ${item.queueLength}`
                : '14-day loan';
        return `
            <article class="library-card" data-library-item="${item.id}">
                <div class="library-topline">
                    <span class="course-badge">${escapeHTML(item.category)}</span>
                    <span class="library-status ${statusClass}">${item.status}</span>
                </div>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.author)}</p>
                <div class="library-meta">
                    <span>${due}</span>
                    <button class="mini-btn borrow-btn" data-item-id="${item.id}" data-item-status="${item.status}" type="button">${action}</button>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.borrow-btn').forEach((button) => {
        button.addEventListener('click', async () => {
            const itemId = button.dataset.itemId;
            const status = button.dataset.itemStatus;
            const action = status === 'Borrowed' ? 'return' : status === 'Available' ? 'borrow' : 'reserve';
            button.disabled = true;
            try {
                await apiRequest(`/api/library/${itemId}/${action}`, { method: 'POST' });
                await renderLibrary();
            } catch (error) {
                const card = button.closest('.library-card');
                if (card) card.querySelector('.library-meta span').textContent = error.message;
                button.disabled = false;
            }
        });
    });
}

function bindLibrarySearch() {
    const input = document.getElementById('librarySearch');
    if (!input) return;

    input.addEventListener('input', (event) => {
        const term = event.target.value.toLowerCase();
        const cards = document.querySelectorAll('.library-card');
        cards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? '' : 'none';
        });
    });
}

function loadQuote() {
    const quoteEl = document.getElementById('quoteText');
    if (!quoteEl) return;

    const quote = quotePool[Math.floor(Math.random() * quotePool.length)];
    quoteEl.textContent = quote;
}

function loadFact() {
    const factEl = document.getElementById('factText');
    if (!factEl) return;

    const fact = factPool[Math.floor(Math.random() * factPool.length)];
    factEl.textContent = fact;
}

function loadWeather() {
    const weatherEl = document.getElementById('weatherText');
    if (!weatherEl) return;

    // Interoperability example: request a JSON forecast from Open-Meteo over HTTPS.
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.04&longitude=-0.76&current_weather=true')
        .then((response) => response.json())
        .then((data) => {
            const weather = data.current_weather;
            weatherEl.textContent = `Milton Keynes: ${weather.temperature}°C · Wind ${weather.windspeed} km/h`;
        })
        .catch(() => {
            weatherEl.textContent = 'Weather unavailable right now.';
        });
}

function loadTime() {
    const timeEl = document.getElementById('timeText');
    const dateEl = document.getElementById('dateText');

    if (!timeEl || !dateEl) return;

    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dateEl.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function darkModeToggle() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const active = document.body.classList.contains('dark-mode');
        toggleBtn.textContent = active ? 'Light mode' : 'Dark mode';
    });
}

function setAccentColor() {
    const picker = document.getElementById('bgColorPicker');
    if (!picker) return;

    picker.addEventListener('input', (event) => {
        const value = event.target.value;
        document.documentElement.style.setProperty('--bg-accent', value);
        document.documentElement.style.setProperty('--bg-accent-strong', value);
        localStorage.setItem('portalPalette', 'custom');
    });
}

function renderTimetable() {
    const timetableGrid = document.getElementById('timetableGrid');
    if (!timetableGrid) return;

    timetableGrid.innerHTML = timetableData.map((day) => `
        <article class="timetable-day">
            <h3>${day.day}</h3>
            <div class="slot-list">
                ${day.slots.map((slot) => `
                    <div class="time-slot">
                        <div class="slot-time">${slot.time}</div>
                        <div>
                            <strong>${slot.module}</strong>
                            <span>${slot.type} · ${slot.room}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </article>
    `).join('');
}

async function renderProfile() {
    const profileSummary = document.getElementById('profileSummary');
    const profileName = document.getElementById('profileName');
    if (!profileSummary || !profileName) return;

    let profile;
    try {
        profile = (await apiRequest('/api/profile')).profile;
    } catch (error) {
        profileSummary.textContent = error.message;
        return;
    }

    profileName.textContent = profile.name;
    profileSummary.innerHTML = `
        <div class="profile-card"><span class="profile-label">Student ID</span><strong>${escapeHTML(profile.studentId)}</strong></div>
        <div class="profile-card"><span class="profile-label">Programme</span><strong>${escapeHTML(profile.programme)}</strong></div>
        <div class="profile-card"><span class="profile-label">Current year</span><strong>${profileData.year}</strong></div>
        <div class="profile-card"><span class="profile-label">Attendance</span><strong>${profile.attendance}%</strong></div>
        <div class="profile-card"><span class="profile-label">Course start</span><strong>${escapeHTML(profile.courseStart)}</strong></div>
        <div class="profile-card"><span class="profile-label">Expected leaving</span><strong>${escapeHTML(profile.expectedLeaving)}</strong></div>
    `;

    const profileStatus = document.getElementById('profileStatus');
    if (profileStatus) profileStatus.textContent = profile.status;

    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.textContent = profile.email;

    const profileInput = document.getElementById('profileNameInput');
    if (profileInput) profileInput.value = profile.name;
}

function bindProfileActions() {
    const saveButton = document.getElementById('saveProfileButton');
    const profileInput = document.getElementById('profileNameInput');
    if (!saveButton || !profileInput) return;

    saveButton.addEventListener('click', async () => {
        const name = profileInput.value.trim();
        try {
            await apiRequest('/api/profile', { method: 'PUT', body: { displayName: name } });
            localStorage.setItem('displayName', name);
            await renderProfile();
        } catch (error) {
            const profileStatus = document.getElementById('profileStatus');
            if (profileStatus) profileStatus.textContent = error.message;
        }
    });
}

async function renderAdminOverview() {
    const adminData = document.getElementById('adminSummary');
    if (!adminData) return;

    try {
        const overview = await apiRequest('/api/admin/overview');
        adminData.innerHTML = `
            <article class="stat-card stat-primary"><p>Student sign-ins today</p><h3>${overview.signInsToday}</h3><span>Recorded in the database</span></article>
            <article class="stat-card stat-secondary"><p>Active student sessions</p><h3>${overview.activeSessions}</h3><span>Current authenticated sessions</span></article>
            <article class="stat-card stat-accent"><p>Checked in today</p><h3>${overview.checkedIn}</h3><span>Student self check-ins</span></article>
            <article class="stat-card stat-neutral"><p>Courses monitored</p><h3>${overview.courseCount}</h3><span>Persistent course catalogue</span></article>
        `;
    } catch (error) {
        adminData.textContent = error.message;
    }
}

async function renderAdminActivity() {
    const loginRows = document.getElementById('loginActivityRows');
    const attendanceRows = document.getElementById('attendanceRows');
    if (!loginRows || !attendanceRows) return;

    const courseFilter = document.getElementById('attendanceCourseFilter')?.value || 'all';
    const attendanceUrl = courseFilter === 'all'
        ? '/api/admin/attendance'
        : `/api/admin/attendance?courseId=${encodeURIComponent(courseFilter)}`;
    try {
        const [activityResult, attendanceResult] = await Promise.all([
            apiRequest('/api/admin/login-activity'),
            apiRequest(attendanceUrl)
        ]);
        const { activity } = activityResult;
        const { attendance } = attendanceResult;
        loginRows.innerHTML = activity.length
            ? activity.slice(0, 20).map((entry) => `
                <tr><td>${escapeHTML(entry.student)}</td><td>${escapeHTML(entry.event)}</td><td>${new Date(entry.timestamp).toLocaleString()}</td></tr>
            `).join('')
            : '<tr><td colspan="3" class="empty-table-message">No student sign-ins recorded yet.</td></tr>';
        attendanceRows.innerHTML = attendance.length
            ? attendance.map((entry) => `
                <tr>
                    <td>${escapeHTML(entry.student)}</td>
                    <td>${escapeHTML(entry.className)}</td>
                    <td>${new Date(entry.checkInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td><span class="library-status ${entry.checkOutAt ? 'status-neutral' : 'status-submitted'}">${entry.checkOutAt ? 'Checked out' : 'Present · self check-in'}</span></td>
                </tr>
            `).join('')
            : '<tr><td colspan="4" class="empty-table-message">No class check-ins recorded today.</td></tr>';
        await renderAdminOverview();
    } catch (error) {
        loginRows.innerHTML = `<tr><td colspan="3" class="empty-table-message">${escapeHTML(error.message)}</td></tr>`;
        attendanceRows.innerHTML = '<tr><td colspan="4" class="empty-table-message">Attendance is unavailable.</td></tr>';
    }
}

async function renderAdminDirectory(filter = '') {
    const directoryRows = document.getElementById('studentDirectoryRows');
    if (!directoryRows) return;

    try {
        const { students } = await apiRequest('/api/admin/students');
        const matchingStudents = students.filter((student) =>
            `${student.name} ${student.studentId} ${student.programme} ${student.status}`.toLowerCase().includes(filter.toLowerCase())
        );
        directoryRows.innerHTML = matchingStudents.length
            ? matchingStudents.map((student) => `
                <tr>
                    <td><button class="student-profile-link" type="button" data-student-id="${escapeHTML(student.studentId)}" aria-label="Open profile for ${escapeHTML(student.name)}">${escapeHTML(student.name)}</button></td>
                    <td><button class="student-profile-link" type="button" data-student-id="${escapeHTML(student.studentId)}" aria-label="Open profile for student ${escapeHTML(student.studentId)}">${escapeHTML(student.studentId)}</button></td>
                    <td>${escapeHTML(student.programme || 'Unassigned')}</td>
                    <td>${escapeHTML(student.status)}</td>
                    <td>${student.hasActiveSession ? 'Signed in' : 'No active session'}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="5" class="empty-table-message">No students match this search.</td></tr>';
    } catch (error) {
        directoryRows.innerHTML = `<tr><td colspan="5" class="empty-table-message">${escapeHTML(error.message)}</td></tr>`;
    }
}

async function openAdminStudentProfile(studentId) {
    const profilePanel = document.getElementById('studentProfilePanel');
    const name = document.getElementById('studentProfileName');
    const studentNumber = document.getElementById('studentProfileId');
    const details = document.getElementById('studentProfileDetails');
    if (!profilePanel || !name || !studentNumber || !details) return;

    let student;
    try {
        student = (await apiRequest(`/api/admin/students/${encodeURIComponent(studentId)}`)).student;
    } catch (error) {
        details.innerHTML = `<div><dt>Profile error</dt><dd>${escapeHTML(error.message)}</dd></div>`;
        profilePanel.hidden = false;
        return;
    }
    const dateFormat = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString([], {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Not recorded';

    name.textContent = student.name;
    studentNumber.textContent = student.studentId;
    const fields = [
        ['Date of birth', dateFormat(student.dateOfBirth)],
        ['Home address', student.address],
        ['Email', student.email],
        ['Course', student.courses.map((course) => course.title).join(', ')],
        ['Attendance', `${student.attendance}%`],
        ['Course start', dateFormat(student.courseStart)],
        ['Expected course leaving', dateFormat(student.expectedLeaving)],
        ['Academic status', student.status],
        ['Latest class check-in', student.latestAttendance ? `${student.latestAttendance.className} · ${new Date(student.latestAttendance.checkInAt).toLocaleString()}` : 'No check-ins recorded']
    ];
    details.innerHTML = fields.map(([label, value]) => `
        <div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>
    `).join('');
    profilePanel.hidden = false;
    profilePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderAdminCourses() {
    const courseRows = document.getElementById('adminCourseRows');
    if (!courseRows) return;

    courseRows.innerHTML = courseData.map((course) => `
        <tr>
            <td>${escapeHTML(course.title)}</td>
            <td>${escapeHTML(course.category)}</td>
            <td>${escapeHTML(course.credit)}</td>
            <td>${course.enrolledStudents ?? 'N/A'}</td>
            <td><span class="library-status status-submitted">Listed</span></td>
        </tr>
    `).join('');
}

async function renderAdminAnnouncements() {
    const announcementList = document.getElementById('adminAnnouncementList');
    if (!announcementList) return;

    let announcements;
    try {
        announcements = (await apiRequest('/api/announcements')).announcements;
    } catch (error) {
        announcementList.textContent = error.message;
        return;
    }
    announcementList.innerHTML = announcements.length
        ? announcements.slice(0, 5).map((announcement) => `
            <article class="admin-announcement-item">
                <div><strong>${escapeHTML(announcement.title)}</strong><span>${new Date(announcement.createdAt).toLocaleString()}</span></div>
                <p>${escapeHTML(announcement.message)}</p>
            </article>
        `).join('')
        : '<p class="empty-table-message">No admin announcements published yet.</p>';
}

async function renderStudentAnnouncements() {
    const announcementList = document.getElementById('studentAnnouncements');
    if (!announcementList) return;

    let announcements;
    try {
        announcements = (await apiRequest('/api/announcements')).announcements;
    } catch {
        return;
    }
    const existingCustom = announcementList.querySelectorAll('[data-admin-announcement]');
    existingCustom.forEach((item) => item.remove());
    announcements.slice(0, 5).forEach((announcement) => {
        const item = document.createElement('li');
        item.dataset.adminAnnouncement = 'true';
        const title = document.createElement('strong');
        title.textContent = announcement.title;
        const message = document.createElement('p');
        message.textContent = announcement.message;
        item.append(title, message);
        announcementList.prepend(item);
    });
}

function bindAnnouncementPublishing() {
    const form = document.getElementById('announcementForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('announcementTitle').value.trim();
        const message = document.getElementById('announcementMessage').value.trim();
        if (!title || !message) return;

        try {
            await apiRequest('/api/announcements', { method: 'POST', body: { title, message } });
            form.reset();
            await renderAdminAnnouncements();
        } catch (error) {
            const list = document.getElementById('adminAnnouncementList');
            if (list) list.textContent = error.message;
        }
    });
}

async function guardPortalAccess() {
    const isLoginPage = Boolean(document.getElementById('loginForm'));
    if (isLoginPage) return true;
    try {
        const { user } = await apiRequest('/api/auth/me');
        cachePortalUser(user);
        const expectedRole = document.getElementById('adminSummary') ? 'admin' : 'student';
        if (user.role !== expectedRole) {
            window.location.replace(user.role === 'admin' ? 'admin.html' : 'dashboard.html');
            return false;
        }
        return true;
    } catch {
        clearCachedPortalUser();
        window.location.replace('index.html');
        return false;
    }
}

function bindClassCheckin() {
    const classSelect = document.getElementById('classCheckinSelect');
    const checkinButton = document.getElementById('classCheckinButton');
    const checkinStatus = document.getElementById('checkinStatus');
    if (!classSelect || !checkinButton || !checkinStatus) return;

    classSelect.innerHTML = courseData.map((course) => `<option value="${course.id}">${escapeHTML(course.title)}</option>`).join('');

    const updateCheckinState = async () => {
        const currentRecords = await apiRequest('/api/attendance/mine');
        const current = currentRecords.attendance.find((entry) =>
            String(entry.courseId) === classSelect.value && !entry.checkOutAt
        );
        checkinButton.textContent = current ? 'Check out of class' : 'Check in to class';
        checkinStatus.textContent = current ? `Present: ${current.className}` : 'Not checked in';
        checkinStatus.className = `tag ${current ? 'success' : 'neutral'}`;
        checkinButton.dataset.attendanceId = current?.id || '';
    };

    classSelect.addEventListener('change', updateCheckinState);
    checkinButton.addEventListener('click', async () => {
        checkinButton.disabled = true;
        try {
            if (checkinButton.dataset.attendanceId) {
                await apiRequest(`/api/attendance/${checkinButton.dataset.attendanceId}/check-out`, { method: 'POST' });
            } else {
                await apiRequest('/api/attendance/check-in', {
                    method: 'POST',
                    body: { courseId: Number(classSelect.value) }
                });
            }
            await updateCheckinState();
        } catch (error) {
            checkinStatus.textContent = error.message;
            checkinStatus.className = 'tag neutral';
        } finally {
            checkinButton.disabled = false;
        }
    });

    updateCheckinState().catch((error) => {
        checkinStatus.textContent = error.message;
    });
}

async function exportAttendance() {
    const { attendance: records } = await apiRequest('/api/admin/attendance');
    const rows = [['Student', 'Username', 'Class', 'Date', 'Check-in', 'Check-out', 'Status']];
    records.forEach((entry) => rows.push([
        entry.student,
        entry.studentId,
        entry.className,
        entry.dateKey,
        entry.checkInAt,
        entry.checkOutAt || '',
        entry.checkOutAt ? 'Checked out' : 'Present (self check-in)'
    ]));

    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const downloadUrl = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'student-attendance.csv';
    link.click();
    URL.revokeObjectURL(downloadUrl);
}

function bindAdminActions() {
    const courseFilter = document.getElementById('attendanceCourseFilter');
    const refreshButton = document.getElementById('refreshAdminData');
    const exportButton = document.getElementById('downloadAttendance');
    const directorySearch = document.getElementById('studentDirectorySearch');
    const directoryRows = document.getElementById('studentDirectoryRows');
    const profilePanel = document.getElementById('studentProfilePanel');
    let lastProfileTrigger = null;

    directoryRows?.addEventListener('click', (event) => {
        const profileButton = event.target.closest('[data-student-id]');
        if (profileButton) {
            lastProfileTrigger = profileButton;
            openAdminStudentProfile(profileButton.dataset.studentId);
        }
    });
    document.getElementById('closeStudentProfile')?.addEventListener('click', () => {
        if (profilePanel) profilePanel.hidden = true;
        lastProfileTrigger?.focus();
    });
    directorySearch?.addEventListener('input', () => renderAdminDirectory(directorySearch.value));
    if (courseFilter) {
        courseFilter.innerHTML = '<option value="all">All classes</option>' + courseData.map((course) =>
            `<option value="${course.id}">${escapeHTML(course.title)}</option>`
        ).join('');
        courseFilter.addEventListener('change', renderAdminActivity);
    }
    refreshButton?.addEventListener('click', renderAdminActivity);
    exportButton?.addEventListener('click', async () => {
        try {
            await exportAttendance();
        } catch (error) {
            const note = document.querySelector('.admin-demo-note');
            if (note) note.textContent = error.message;
        }
    });
    document.querySelectorAll('[data-section]').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-section]').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (document.getElementById('adminSummary')) bindAnnouncementPublishing();
}

function bindRefreshButtons() {
    document.getElementById('refreshQuote')?.addEventListener('click', loadQuote);
    document.getElementById('refreshFact')?.addEventListener('click', loadFact);
}

async function initializePage() {
    if (window.location.protocol === 'file:') {
        window.location.replace('http://localhost:8001/index.html');
        return;
    }
    if (!await guardPortalAccess()) return;
    if (document.getElementById('loginForm')) {
        loginHandler();
        return;
    }

    setWelcomeMessage();
    attachNavigationHandlers();
    bindDynamicClickTargets();
    try {
        await loadCourseData();
    } catch (error) {
        const courseGrid = document.getElementById('courseGrid');
        if (courseGrid) courseGrid.textContent = error.message;
    }
    if (document.getElementById('adminSummary')) renderAdminCourses();
    renderCourses();
    renderAssignments();
    await renderLibrary();
    renderTimetable();
    await renderProfile();
    await renderStudentAnnouncements();
    bindCourseFilters();
    bindLibrarySearch();
    bindRefreshButtons();
    bindProfileActions();
    bindAdminActions();
    bindClassCheckin();
    darkModeToggle();
    setAccentColor();
    bindThemePresets();
    loadQuote();
    loadFact();
    loadWeather();
    loadTime();
    setInterval(loadTime, 1000);

    if (document.getElementById('adminSummary')) {
        await Promise.all([renderAdminActivity(), renderAdminDirectory(), renderAdminAnnouncements()]);
        setInterval(() => {
            renderAdminActivity();
            renderAdminDirectory(document.getElementById('studentDirectorySearch')?.value || '');
        }, 15000);
    }
}

const publicPortalPages = new Set([
    'index.html', 'dashboard.html', 'courses.html', 'assignments.html',
    'timetable.html', 'profile.html', 'library.html', 'support.html', 'admin.html'
]);
const openedFromFile = window.location.protocol === 'file:';
const openedOnGitHubPages = window.location.hostname === 'dareolubi.github.io';

if (openedFromFile || openedOnGitHubPages) {
    const requestedPage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    const targetPage = publicPortalPages.has(requestedPage) ? requestedPage : 'index.html';
    window.location.replace(`https://beds-student-portal.onrender.com/${targetPage}${window.location.search}${window.location.hash}`);
} else {
    initializePage();
}

