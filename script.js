const courseData = [
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

const libraryData = [
    { title: 'Clean Code', author: 'Robert C. Martin', category: 'Software', status: 'Available', due: 'Next 2 days' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Systems', status: 'Borrowed', due: 'Due 7 Nov' },
    { title: 'Human-Computer Interaction', author: 'Alan Dix', category: 'Design', status: 'Available', due: 'Next 5 days' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Career', status: 'Available', due: 'Next 1 day' },
    { title: 'Operating Systems', author: 'A. Silberschatz', category: 'Computing', status: 'Reserved', due: 'Queue 3' }
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

const adminStudentRecords = [
    { name: 'Aisha Rahman', id: 'UB234567', programme: 'BSc Computer Science', course: 'BSc Computer Science', status: 'On track', username: 'student', dateOfBirth: '2002-05-14', address: '12 Sample Street, Luton, LU1 2AB', attendance: '94%', courseStart: '2023-09-18', expectedLeaving: '2026-06-30', email: 'aisha.rahman@example.edu' },
    { name: 'Daniel Smith', id: 'UB234568', programme: 'BSc Computer Science', course: 'BSc Computer Science', status: 'Needs review', username: 'demo-daniel', dateOfBirth: '2001-11-03', address: '8 Example Road, Bedford, MK40 1AA', attendance: '81%', courseStart: '2023-09-18', expectedLeaving: '2026-06-30', email: 'daniel.smith@example.edu' },
    { name: 'Priya Shah', id: 'UB234569', programme: 'BSc Computer Science', course: 'BSc Computer Science', status: 'On track', username: 'demo-priya', dateOfBirth: '2002-02-21', address: '24 Demo Avenue, Milton Keynes, MK9 2AB', attendance: '97%', courseStart: '2023-09-18', expectedLeaving: '2026-06-30', email: 'priya.shah@example.edu' },
    { name: 'Omar Ali', id: 'UB234570', programme: 'BSc Computer Science', course: 'BSc Computer Science', status: 'Action needed', username: 'demo-omar', dateOfBirth: '2001-08-09', address: '5 Example Close, Luton, LU2 7AA', attendance: '73%', courseStart: '2023-09-18', expectedLeaving: '2026-06-30', email: 'omar.ali@example.edu' }
];

const palettes = {
    classic: { accent: '#7c3aed', accentStrong: '#5b21b6' },
    ocean: { accent: '#0ea5e9', accentStrong: '#0369a1' },
    sunset: { accent: '#f97316', accentStrong: '#c2410c' },
    forest: { accent: '#10b981', accentStrong: '#047857' }
};

function getCurrentUser() {
    return localStorage.getItem('portalUser') || 'student';
}

function readPortalRecords(key) {
    try {
        const records = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(records) ? records : [];
    } catch {
        return [];
    }
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

function getStudentDisplayName() {
    return localStorage.getItem('displayName') || profileData.name;
}

function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function recordStudentEvent(eventType) {
    const now = new Date();
    const entry = {
        student: getStudentDisplayName(),
        username: localStorage.getItem('username') || 'student',
        event: eventType,
        timestamp: now.toISOString(),
        dateKey: getLocalDateKey(now)
    };
    const activity = readPortalRecords('portalLoginActivity');
    activity.unshift(entry);
    localStorage.setItem('portalLoginActivity', JSON.stringify(activity.slice(0, 100)));

    if (eventType === 'Signed in') {
        localStorage.setItem('portalActiveStudent', JSON.stringify({
            student: entry.student,
            username: entry.username,
            timestamp: entry.timestamp
        }));
    } else {
        localStorage.removeItem('portalActiveStudent');
    }
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
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            if (page === 'index.html') {
                if (getCurrentUser() === 'student') recordStudentEvent('Signed out');
                localStorage.removeItem('username');
                localStorage.removeItem('portalUser');
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

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        if (selectedRole === 'student' && username === 'student' && password === 'password') {
            localStorage.setItem('username', username);
            localStorage.setItem('portalUser', 'student');
            recordStudentEvent('Signed in');
            window.location.href = 'dashboard.html';
            return;
        }

        if (selectedRole === 'admin' && username === 'admin' && password === 'admin123') {
            localStorage.setItem('username', 'admin');
            localStorage.setItem('portalUser', 'admin');
            window.location.href = 'admin.html';
            return;
        }

        errorText.textContent = 'The username or password is incorrect.';
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

function renderLibrary() {
    const libraryGrid = document.getElementById('libraryGrid');
    if (!libraryGrid) return;

    libraryGrid.innerHTML = libraryData.map((item) => {
        const statusClass = item.status === 'Available' ? 'status-submitted' : item.status === 'Borrowed' ? 'status-progress' : 'status-due';
        return `
            <article class="library-card">
                <div class="library-topline">
                    <span class="course-badge">${item.category}</span>
                    <span class="library-status ${statusClass}">${item.status}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.author}</p>
                <div class="library-meta">
                    <span>${item.due}</span>
                    <button class="mini-btn borrow-btn" type="button">${item.status === 'Available' ? 'Borrow' : 'Reserve'}</button>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.borrow-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.library-card');
            const status = card.querySelector('.library-status');
            const label = button;
            if (status.textContent === 'Available') {
                status.textContent = 'Borrowed';
                status.className = 'library-status status-progress';
                label.textContent = 'Reserved';
            } else {
                status.textContent = 'Available';
                status.className = 'library-status status-submitted';
                label.textContent = 'Borrow';
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

function renderProfile() {
    const profileSummary = document.getElementById('profileSummary');
    const profileName = document.getElementById('profileName');
    if (!profileSummary || !profileName) return;

    const storedName = localStorage.getItem('displayName');
    const displayName = storedName || profileData.name;

    profileName.textContent = displayName;
    profileSummary.innerHTML = `
        <div class="profile-card">
            <span class="profile-label">Student ID</span>
            <strong>${profileData.studentId}</strong>
        </div>
        <div class="profile-card">
            <span class="profile-label">Programme</span>
            <strong>${profileData.programme}</strong>
        </div>
        <div class="profile-card">
            <span class="profile-label">Current year</span>
            <strong>${profileData.year}</strong>
        </div>
        <div class="profile-card">
            <span class="profile-label">Credits</span>
            <strong>${profileData.credits}</strong>
        </div>
        <div class="profile-card">
            <span class="profile-label">GPA</span>
            <strong>${profileData.gpa}</strong>
        </div>
        <div class="profile-card">
            <span class="profile-label">Tutor</span>
            <strong>${profileData.tutor}</strong>
        </div>
    `;

    const profileStatus = document.getElementById('profileStatus');
    if (profileStatus) {
        profileStatus.textContent = profileData.status;
    }

    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) {
        profileEmail.textContent = profileData.email;
    }
}

function bindProfileActions() {
    const saveButton = document.getElementById('saveProfileButton');
    const profileInput = document.getElementById('profileNameInput');
    if (!saveButton || !profileInput) return;

    saveButton.addEventListener('click', () => {
        const name = profileInput.value.trim() || profileData.name;
        localStorage.setItem('displayName', name);
        renderProfile();
        profileInput.value = name;
    });
}

function renderAdminOverview() {
    const adminData = document.getElementById('adminSummary');
    if (!adminData) return;

    const today = getLocalDateKey();
    const loginCount = readPortalRecords('portalLoginActivity')
        .filter((entry) => entry.event === 'Signed in' && entry.dateKey === today).length;
    const attendanceToday = readPortalRecords('portalAttendanceRecords')
        .filter((entry) => entry.dateKey === today);
    const currentlyPresent = attendanceToday.filter((entry) => !entry.checkOutAt).length;
    let activeStudent = null;
    try {
        activeStudent = JSON.parse(localStorage.getItem('portalActiveStudent') || 'null');
    } catch {
        activeStudent = null;
    }

    adminData.innerHTML = `
        <article class="stat-card stat-primary"><p>Student sign-ins today</p><h3>${loginCount}</h3><span>Recorded in this browser</span></article>
        <article class="stat-card stat-secondary"><p>Current student session</p><h3>${activeStudent ? '1' : '0'}</h3><span>${activeStudent ? escapeHTML(activeStudent.student) : 'No active demo session'}</span></article>
        <article class="stat-card stat-accent"><p>Checked in now</p><h3>${currentlyPresent}</h3><span>Student self check-ins today</span></article>
        <article class="stat-card stat-neutral"><p>Classes monitored</p><h3>${courseData.length}</h3><span>Available in the demo timetable</span></article>
    `;
}

function renderAdminActivity() {
    const loginRows = document.getElementById('loginActivityRows');
    const attendanceRows = document.getElementById('attendanceRows');
    if (!loginRows || !attendanceRows) return;

    const activity = readPortalRecords('portalLoginActivity');
    loginRows.innerHTML = activity.length
        ? activity.slice(0, 20).map((entry) => `
            <tr>
                <td>${escapeHTML(entry.student)}</td>
                <td>${escapeHTML(entry.event)}</td>
                <td>${new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="3" class="empty-table-message">No student sign-ins recorded yet.</td></tr>';

    const today = getLocalDateKey();
    const selectedCourse = document.getElementById('attendanceCourseFilter')?.value || 'all';
    const attendance = readPortalRecords('portalAttendanceRecords')
        .filter((entry) => entry.dateKey === today && (selectedCourse === 'all' || entry.className === selectedCourse));
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

    renderAdminOverview();
}

function renderAdminDirectory(filter = '') {
    const directoryRows = document.getElementById('studentDirectoryRows');
    if (!directoryRows) return;

    let activeStudent = null;
    try {
        activeStudent = JSON.parse(localStorage.getItem('portalActiveStudent') || 'null');
    } catch {
        activeStudent = null;
    }

    const matchingStudents = adminStudentRecords.filter((student) =>
        `${student.name} ${student.id} ${student.programme} ${student.status}`.toLowerCase().includes(filter.toLowerCase())
    );
    directoryRows.innerHTML = matchingStudents.length
        ? matchingStudents.map((student) => `
            <tr>
                <td><button class="student-profile-link" type="button" data-student-id="${escapeHTML(student.id)}" aria-label="Open profile for ${escapeHTML(student.name)}">${escapeHTML(student.name)}</button></td>
                <td><button class="student-profile-link" type="button" data-student-id="${escapeHTML(student.id)}" aria-label="Open profile for student ${escapeHTML(student.id)}">${escapeHTML(student.id)}</button></td>
                <td>${escapeHTML(student.programme)}</td>
                <td>${escapeHTML(student.status)}</td>
                <td>${activeStudent?.username === student.username ? 'Signed in' : 'No active session'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="5" class="empty-table-message">No students match this search.</td></tr>';
}

function openAdminStudentProfile(studentId) {
    const student = adminStudentRecords.find((record) => record.id === studentId);
    const profilePanel = document.getElementById('studentProfilePanel');
    const name = document.getElementById('studentProfileName');
    const studentNumber = document.getElementById('studentProfileId');
    const details = document.getElementById('studentProfileDetails');
    if (!student || !profilePanel || !name || !studentNumber || !details) return;

    const latestAttendance = readPortalRecords('portalAttendanceRecords')
        .filter((entry) => entry.username === student.username)
        .sort((first, second) => new Date(second.checkInAt) - new Date(first.checkInAt))[0];
    const dateFormat = (value) => new Date(`${value}T00:00:00`).toLocaleDateString([], {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    name.textContent = student.name;
    studentNumber.textContent = student.id;
    const fields = [
        ['Date of birth', dateFormat(student.dateOfBirth)],
        ['Home address', student.address],
        ['Email', student.email],
        ['Course', student.course],
        ['Attendance', `${student.attendance} (demo figure)`],
        ['Course start', dateFormat(student.courseStart)],
        ['Expected course leaving', dateFormat(student.expectedLeaving)],
        ['Academic status', student.status],
        ['Latest class check-in', latestAttendance ? `${latestAttendance.className} · ${new Date(latestAttendance.checkInAt).toLocaleString()}` : 'No check-ins recorded']
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
            <td>Demo data unavailable</td>
            <td><span class="library-status status-submitted">Listed</span></td>
        </tr>
    `).join('');
}

function renderAdminAnnouncements() {
    const announcementList = document.getElementById('adminAnnouncementList');
    if (!announcementList) return;

    const announcements = readPortalRecords('portalAnnouncements');
    announcementList.innerHTML = announcements.length
        ? announcements.slice(0, 5).map((announcement) => `
            <article class="admin-announcement-item">
                <div><strong>${escapeHTML(announcement.title)}</strong><span>${new Date(announcement.createdAt).toLocaleString()}</span></div>
                <p>${escapeHTML(announcement.message)}</p>
            </article>
        `).join('')
        : '<p class="empty-table-message">No admin announcements published yet.</p>';
}

function renderStudentAnnouncements() {
    const announcementList = document.getElementById('studentAnnouncements');
    if (!announcementList) return;

    const announcements = readPortalRecords('portalAnnouncements');
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

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('announcementTitle').value.trim();
        const message = document.getElementById('announcementMessage').value.trim();
        if (!title || !message) return;

        const announcements = readPortalRecords('portalAnnouncements');
        announcements.unshift({ title, message, createdAt: new Date().toISOString() });
        localStorage.setItem('portalAnnouncements', JSON.stringify(announcements.slice(0, 20)));
        form.reset();
        renderAdminAnnouncements();
    });
}

function guardAdminPage() {
    if (document.getElementById('adminSummary') && getCurrentUser() !== 'admin') {
        window.location.replace('index.html');
    }
}

function bindClassCheckin() {
    const classSelect = document.getElementById('classCheckinSelect');
    const checkinButton = document.getElementById('classCheckinButton');
    const checkinStatus = document.getElementById('checkinStatus');
    if (!classSelect || !checkinButton || !checkinStatus) return;

    classSelect.innerHTML = courseData.map((course) => `<option value="${escapeHTML(course.title)}">${escapeHTML(course.title)}</option>`).join('');

    const updateCheckinState = () => {
        const today = getLocalDateKey();
        const current = readPortalRecords('portalAttendanceRecords').find((entry) =>
            entry.username === (localStorage.getItem('username') || 'student') &&
            entry.dateKey === today && entry.className === classSelect.value && !entry.checkOutAt
        );
        checkinButton.textContent = current ? 'Check out of class' : 'Check in to class';
        checkinStatus.textContent = current ? `Present: ${current.className}` : 'Not checked in';
        checkinStatus.className = `tag ${current ? 'success' : 'neutral'}`;
    };

    classSelect.addEventListener('change', updateCheckinState);
    checkinButton.addEventListener('click', () => {
        const today = getLocalDateKey();
        const attendance = readPortalRecords('portalAttendanceRecords');
        const username = localStorage.getItem('username') || 'student';
        const activeRecord = attendance.find((entry) =>
            entry.username === username && entry.dateKey === today && entry.className === classSelect.value && !entry.checkOutAt
        );

        if (activeRecord) {
            activeRecord.checkOutAt = new Date().toISOString();
        } else {
            attendance.unshift({
                student: getStudentDisplayName(),
                username,
                className: classSelect.value,
                dateKey: today,
                checkInAt: new Date().toISOString(),
                checkOutAt: ''
            });
        }

        localStorage.setItem('portalAttendanceRecords', JSON.stringify(attendance.slice(0, 100)));
        updateCheckinState();
    });

    updateCheckinState();
}

function exportAttendance() {
    const records = readPortalRecords('portalAttendanceRecords');
    const rows = [['Student', 'Username', 'Class', 'Date', 'Check-in', 'Check-out', 'Status']];
    records.forEach((entry) => rows.push([
        entry.student,
        entry.username,
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
        courseFilter.innerHTML += courseData.map((course) => `<option value="${escapeHTML(course.title)}">${escapeHTML(course.title)}</option>`).join('');
        courseFilter.addEventListener('change', renderAdminActivity);
    }
    refreshButton?.addEventListener('click', renderAdminActivity);
    exportButton?.addEventListener('click', exportAttendance);
    document.querySelectorAll('[data-section]').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-section]').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (document.getElementById('adminSummary')) {
        renderAdminActivity();
        renderAdminDirectory();
        renderAdminCourses();
        renderAdminAnnouncements();
        bindAnnouncementPublishing();
        window.addEventListener('storage', (event) => {
            if (['portalLoginActivity', 'portalAttendanceRecords', 'portalActiveStudent'].includes(event.key)) {
                renderAdminActivity();
                renderAdminDirectory();
            }
            if (event.key === 'portalAnnouncements') {
                renderAdminAnnouncements();
            }
        });
    }
}

function bindRefreshButtons() {
    document.getElementById('refreshQuote')?.addEventListener('click', loadQuote);
    document.getElementById('refreshFact')?.addEventListener('click', loadFact);
}

setWelcomeMessage();
guardAdminPage();
renderStudentAnnouncements();
window.addEventListener('storage', (event) => {
    if (event.key === 'portalAnnouncements') renderStudentAnnouncements();
});
attachNavigationHandlers();
bindDynamicClickTargets();
loginHandler();
renderCourses();
renderAssignments();
renderLibrary();
renderTimetable();
renderProfile();
renderAdminOverview();
bindCourseFilters();
bindLibrarySearch();
loadQuote();
loadFact();
loadWeather();
loadTime();
setInterval(loadTime, 1000);

bindRefreshButtons();
bindProfileActions();
bindAdminActions();
bindClassCheckin();
darkModeToggle();
setAccentColor();
bindThemePresets();

