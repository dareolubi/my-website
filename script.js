// -------------------------------
// LOGIN PAGE LOGIC
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const VALID_USERNAME = "user";
    const VALID_PASSWORD = "password";

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const message = document.getElementById("loginMessage");

            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                localStorage.setItem("loggedIn", "true");
                message.textContent = "Login successful! Redirecting...";
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                message.textContent = "Invalid username or password.";
            }
        });
    }
});


// -------------------------------
// DASHBOARD PAGE PROTECTION
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("dashboard.html")) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html";
        }
    }
});


// -------------------------------
// LOGOUT BUTTON
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    }
});


// -------------------------------
// API EVENT (Interoperability)
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const apiButton = document.getElementById("apiButton");

    if (apiButton) {
        apiButton.addEventListener("click", async () => {
            try {
                const response = await fetch("https://api.quotable.io/random");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                document.getElementById("quote").innerText = data.content;
            } catch (error) {
                document.getElementById("quote").innerText = "Error fetching quote.";
                console.error("Fetch error:", error);
            }
        });
    }
});


// -------------------------------
// EXTRA EVENT (Event‑Driven Programming)
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const colorBtn = document.getElementById("colorBtn");

    if (colorBtn) {
        colorBtn.addEventListener("click", () => {
            document.body.style.backgroundColor =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
        });
    }
});

