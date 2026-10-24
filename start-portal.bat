@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules\express\package.json" (
    echo Dependencies are missing. Open a terminal in this folder and run: npm install
    pause
    exit /b 1
)

set "PORT=8001"
node -e "fetch('http://localhost:8001/api/health').then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))" >nul 2>&1
if errorlevel 1 (
    start "Student Portal API" /D "%~dp0" cmd /k npm start
    timeout /t 2 /nobreak >nul
)
start "" "http://localhost:8001/index.html"
endlocal
