/* 
CIS046-3 Software for Enterprise
Author: Oluwole

Academic Integrity Notes:
- Event-driven logic supported by Microsoft Copilot (AI).
- API interoperability patterns inspired by MDN documentation.
- All final JavaScript written, adapted, and integrated by me.
*/

// Detect page type
document.addEventListener("DOMContentLoaded", () => {
    const pageType = document.body.getAttribute("data-page");

    if (pageType === "login") {
        initLoginPage();
    } else if (pageType === "dashboard") {
        protectDashboard();
        initDashboardPage();
    }
});

/* ============================
   LOGIN PAGE LOGIC
   ============================ */
function initLoginPage() {
    const VALID_USERNAME = "user";
    const VALID_PASSWORD = "password";

    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const message = document.getElementById("loginMessage");

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);

            message.textContent = "Login successful! Redirecting...";
            message.style.color = "green";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            message.textContent = "Invalid username or password.";
            message.style.color = "red";
        }
    });
}

/* ============================
   DASHBOARD PROTECTION
   ============================ */
function protectDashboard() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

/* ============================
   DASHBOARD INITIALISATION
   ============================ */
function initDashboardPage() {
    setupLogout();
    setupThemeToggle();
    setupTimeAndDate();
    setupQuoteAPI();
    setupFactAPI();
    setupWeatherDemo();
    setupBackgroundColorButton();
    personaliseAvatar();
    setupSidebarNavigation(); // NEW: Navigation fix
}

/* ============================
   LOGOUT BUTTON
   ============================ */
function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        window.location.href = "index.html";
    });
}

/* ============================
   DARK MODE TOGGLE
   ============================ */
function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

/* ============================
   TIME & DATE WIDGET
   ============================ */
function setupTimeAndDate() {
    const timeEl = document.getElementById("currentTime");
    const dateEl = document.getElementById("currentDate");

    function updateTime() {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString();
        dateEl.textContent = now.toLocaleDateString();
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* ============================
   QUOTE API
   ============================ */
function setupQuoteAPI() {
    const apiButton = document.getElementById("apiButton");
    const quoteText = document.getElementById("quoteText");

    apiButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            quoteText.textContent = `"${data.content}" — ${data.author}`;
        } catch {
            quoteText.textContent = "Error fetching quote.";
        }
    });
}

/* ============================
   FUN FACT API
   ============================ */
function setupFactAPI() {
    const factButton = document.getElementById("factButton");
    const factText = document.getElementById("factText");

    factButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
            const data = await response.json();
            factText.textContent = data.text;
        } catch {
            factText.textContent = "Error fetching fun fact.";
        }
    });
}

/* ============================
   WEATHER DEMO
   ============================ */
function setupWeatherDemo() {
    const weatherButton = document.getElementById("weatherButton");
    const weatherInfo = document.getElementById("weatherInfo");

    const demoConditions = [
        "18°C · Partly cloudy",
        "21°C · Sunny",
        "15°C · Light rain",
        "12°C · Overcast",
        "19°C · Breezy"
    ];

    weatherButton.addEventListener("click", () => {
        const random = Math.floor(Math.random() * demoConditions.length);
        weatherInfo.textContent = demoConditions[random];
    });
}

/* ============================
   BACKGROUND COLOUR BUTTON
   ============================ */
function setupBackgroundColorButton() {
    const colorBtn = document.getElementById("colorBtn");

    colorBtn.addEventListener("click", () => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = randomColor;
    });
}

/* ============================
   PERSONALISE AVATAR
   ============================ */
function personaliseAvatar() {
    const avatarTitle = document.querySelector(".card-avatar h2");
    const username = localStorage.getItem("username") || "Student";
    avatarTitle.textContent = `Welcome, ${username}`;
}

/* ============================
   SIDEBAR NAVIGATION (FIX)
   ============================ */
function setupSidebarNavigation() {
    const navButtons = document.querySelectorAll(".sidebar-nav .nav-item");

    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const label = btn.textContent.trim().toLowerCase();

            if (label === "dashboard") window.location.href = "dashboard.html";
            if (label === "courses") window.location.href = "courses.html";
            if (label === "assignments") window.location.href = "assignments.html";
            if (label === "support") window.location.href = "support.html";
        });
    });
}
