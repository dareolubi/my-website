/* 
CIS046-3 Software for Enterprise
Author: Oluwole

Academic Integrity Notes:
- Event-driven logic supported by Microsoft Copilot (AI).
- API interoperability patterns inspired by MDN documentation.
- All final JavaScript written, adapted, and integrated by me.
*/

// ---------------------------
// LOGIN FUNCTIONALITY
// ---------------------------

document.getElementById("loginBtn")?.addEventListener("click", () => {
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    if (username === "student" && password === "password") {
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("loginError").textContent =
            "Invalid login. Use username: student, password: password.";
    }
});

// ---------------------------
// VIRTUAL IDENTITY ON DASHBOARD
// ---------------------------

if (document.getElementById("welcomeMessage")) {
    const user = localStorage.getItem("username") || "Student";
    document.getElementById("welcomeMessage").textContent = `Welcome, ${user}`;
}

// ---------------------------
// INTEROPERABILITY: QUOTE API
// ---------------------------

function loadQuote() {
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => {
            document.getElementById("quoteText").textContent = data.content;
        })
        .catch(() => {
            document.getElementById("quoteText").textContent =
                "Quote service unavailable.";
        });
}

document.getElementById("refreshQuote")?.addEventListener("click", loadQuote);

// ---------------------------
// INTEROPERABILITY: FUN FACT API
// ---------------------------

function loadFact() {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.json())
        .then(data => {
            document.getElementById("factText").textContent = data.text;
        })
        .catch(() => {
            document.getElementById("factText").textContent =
                "Fun fact service unavailable.";
        });
}

document.getElementById("refreshFact")?.addEventListener("click", loadFact);

// ---------------------------
// LIVE WEATHER + TIME + DATE
// ---------------------------

function loadWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.04&longitude=-0.76&current_weather=true")
        .then(res => res.json())
        .then(data => {
            const w = data.current_weather;
            document.getElementById("weatherText").textContent =
                `Milton Keynes: ${w.temperature}°C · Wind ${w.windspeed} km/h`;
        })
        .catch(() => {
            document.getElementById("weatherText").textContent =
                "Weather unavailable.";
        });
}

function loadTime() {
    const now = new Date();
    document.getElementById("timeText").textContent =
        now.toLocaleTimeString();
    document.getElementById("dateText").textContent =
        now.toLocaleDateString();
}

setInterval(loadTime, 1000);

// ---------------------------
// EVENT-DRIVEN: DARK MODE
// ---------------------------

document.getElementById("darkModeToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// ---------------------------
// EVENT-DRIVEN: BACKGROUND COLOUR
// ---------------------------

document.getElementById("bgColorPicker")?.addEventListener("input", (e) => {
    document.body.style.background = e.target.value;
});

// ---------------------------
// NAVIGATION BUTTONS
// ---------------------------

document.getElementById("dashboardBtn")?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

document.getElementById("coursesBtn")?.addEventListener("click", () => {
    window.location.href = "courses.html";
});

document.getElementById("assignmentsBtn")?.addEventListener("click", () => {
    window.location.href = "assignments.html";
});

document.getElementById("supportBtn")?.addEventListener("click", () => {
    window.location.href = "support.html";
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("username");
    window.location.href = "index.html";
});

// ---------------------------
// INITIAL LOAD
// ---------------------------

loadQuote();
loadFact();
loadWeather();
loadTime();
