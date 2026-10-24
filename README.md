# Student Learning Portal

**Author:** Oluwole Olubi<br>
**Module:** CIS046-3 Software for Enterprise<br>
**University:** University of Bedfordshire

## Project Overview

A multi-page student learning portal prototype. The browser UI is built with HTML, CSS, and vanilla JavaScript; an Express API handles authentication and portal operations; a SQLite database persists users, courses, sessions, attendance, announcements, and library loans.

This is an academic demo, not an official University of Bedfordshire system.

## Architecture

The browser renders the portal and sends same-origin HTTP requests with JSON to the Express API. The API validates each request, enforces roles, and reads or writes persistent records in SQLite. Weather is a separate browser-to-Open-Meteo request.

```text
Browser pages --HTTP/JSON + session cookie--> Express API --SQL--> SQLite database
	|
	+---------------- HTTPS/JSON -----------------------> Open-Meteo
```

This separates the user interface, application rules, and persistent storage. SQLite is kept on the server and is not downloaded by the browser.

🔐 Login Credentials
Choose Student or Admin on the login page and use the corresponding demo account:

| Role | Username | Password |
| --- | --- | --- |
| Student | `student` | `password` |
| Admin | `admin` | `admin123` |

The demo accounts are created by the server on its first run. Passwords are stored as scrypt hashes, and login sessions use HTTP-only cookies. The demo passwords are intentionally simple and must not be used for real accounts.

🎨 Features
🔐 Login System
Student and Admin role selection with separate demo sign-in flows.

Student features:
- Dashboard announcements, deadlines, quick actions, live date/time, weather, quote, and fun fact.
- Course catalogue with category filters and an assignment tracker with example statuses.
- Weekly timetable, student profile, searchable library, and demo borrow/reserve controls.
- Class self check-in/check-out, dark mode, accent colour, and palette controls.

Administrator features:
- Separate admin dashboard, student sign-in activity, current demo session, and attendance view.
- Searchable student directory with clickable name/ID profile details and example records.
- Course catalogue, announcement publishing, attendance filters, and CSV export.

Quotes and facts are selected from local JavaScript arrays. Weather is requested from Open-Meteo. Login, course, profile, attendance, announcement, and library operations use the API and database.

🌐 Deployment
The existing GitHub Pages address, <https://dareolubi.github.io/my-website/>, hosts only static files and cannot run this Express API. The full-stack website can be deployed as a Render web service using `render.yaml`; Render provides the shareable `onrender.com` URL after deployment.

Technologies and data:
- HTML5, CSS3, and vanilla JavaScript.
- Git and GitHub Pages.
- Node.js and Express for the same-origin JSON API.
- Node's built-in SQLite driver for persistent local data in `data/portal.sqlite`.
- HTTP-only, same-site session cookies and scrypt password hashing for the demo authentication flow.
- Open-Meteo for live weather in Milton Keynes.
- University-hosted logo and an Unsplash background photo on the login page. These images and weather require an internet connection.

Limitations:
- This is an educational demo, not a production university system. The seeded student records and personal details are fictional.
- The demo passwords are simple; do not use real credentials or personal information.
- Attendance is student self check-in and is not verified by location or a university system.
- Assignments are example records; file upload and grading are not implemented.
- Render's free web service uses temporary storage for SQLite. Data such as announcements, attendance, and loans can reset when its instance sleeps or restarts. For durable public data, use a managed database or a paid persistent disk.

🚀 Live Website
Visit the deployed site at <https://dareolubi.github.io/my-website/>.
📂 Project Structure
```text
index.html       Login and role selection
dashboard.html   Student dashboard
courses.html     Student course list
assignments.html Student assignment tracker
timetable.html   Student timetable
profile.html     Student profile
library.html     Student library
support.html     Student support centre
admin.html       Administrator dashboard
server.js        Express API, authentication, and database access
package.json     Node scripts and Express dependency
package-lock.json Locked Node dependency versions
style.css        Shared styles and responsive layouts
script.js        Demo data and page interactions
data/            Created on first run; local SQLite database (ignored by Git)
```
🧪 How to Run Locally
Requires Node.js 22.5 or later. On Windows, double-click `start-portal.bat` to start the API and open the portal in your default browser. Install dependencies first if prompted:

```powershell
npm install
```

You can also start the server manually with `npm start`, then open <http://localhost:8001/index.html>. Do not open `index.html` directly as a file because authentication requires the backend API. Stop the server with `Ctrl+C`. Run the API tests with `npm test`.

Optional: set `DEMO_STUDENT_PASSWORD` or `DEMO_ADMIN_PASSWORD` before the first run to change the initial demo passwords. The database is seeded only when each account is first created; changing these environment values later does not change existing passwords.

## Publish a Shareable Full-Stack Link

1. Push this project, including `render.yaml`, to the GitHub `main` branch.
2. In Render, choose **New → Blueprint** and connect the `dareolubi/my-website` repository.
3. Review the free web-service plan. Render will ask for `DEMO_STUDENT_PASSWORD` and `DEMO_ADMIN_PASSWORD`; enter demo-only passwords directly in Render, not in chat or source code.
4. Wait for the build and health check to pass. Share the generated `https://<service-name>.onrender.com` link, not the GitHub Pages or `localhost` URL.

The Render free instance may sleep when idle, so the first visit can take a little while to wake. Its temporary SQLite data resets after restarts. Use persistent hosting/database storage if you need data to survive restarts.

📚 Academic Integrity
GitHub Copilot was used to assist with design and code changes. The author should review, understand, and be able to explain the submitted work, and follow the module's rules for declaring AI assistance.

📞 Contact
For questions or support:
Oluwole  Olubi
University of Bedfordshire
