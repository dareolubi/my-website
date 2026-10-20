// Simple login credentials (for demo only)
const VALID_USERNAME = "user";
const VALID_PASSWORD = "password";

// Handle login form submission (event-driven programming)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // stop page reload

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Virtual identity: store login state
            localStorage.setItem("loggedIn", "true");
            message.textContent = "Login successful! Redirecting to dashboard...";
            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            message.textContent = "Invalid username or password.";
        }
    });
}

// On dashboard: check if user is logged in
if (window.location.pathname.endsWith("dashboard.html")) {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        // Not logged in, redirect back
        window.location.href = "index.html";
    }
}

// Event: button click to call external API (interoperability)
const apiButton = document.getElementById("apiButton");
if (apiButton) {
    apiButton.addEventListener("click", function() {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                const quoteElement = document.getElementById("quote");
                quoteElement.textContent = data.content;
            })
            .catch(error => {
                console.error("Error fetching quote:", error);
            });
    });
}

// Event: logout button
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    });
}
