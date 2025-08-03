@echo off
REM WellnessSpace Development Startup Script for Windows
echo 🌿 Starting WellnessSpace Development Environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Start Backend
echo 🚀 Starting Backend Server...
cd backend

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found. Creating from env.example...
    copy env.example .env
    echo 📝 Please update the .env file with your MongoDB URL and secrets
)

REM Install backend dependencies if node_modules doesn't exist
if not exist node_modules (
    echo 📦 Installing backend dependencies...
    npm install
)

REM Start backend in background
echo 🔧 Starting backend server on port 5000...
start "Backend Server" cmd /k "npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo 🎨 Starting Frontend Server...
cd ..\frontend

REM Install frontend dependencies if node_modules doesn't exist
if not exist node_modules (
    echo 📦 Installing frontend dependencies...
    npm install
)

REM Start frontend
echo ⚡ Starting frontend server on port 8080...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo 🎉 WellnessSpace is starting up!
echo 📱 Frontend: http://localhost:8080
echo 🔧 Backend: http://localhost:5000
echo.
echo Both servers are running in separate windows.
echo Close the windows to stop the servers.
echo.
pause 