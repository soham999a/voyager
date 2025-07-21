@echo off
echo.
echo ========================================
echo 🚀 VOYAGER STATION - DEVELOPMENT MODE
echo ========================================
echo.

REM Try to use system Node.js first
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Using system Node.js...
    node --version
    echo 📡 Starting development server...
    echo 🌐 Server will be available at: http://localhost:3001
    echo 💡 Press Ctrl+C to stop the server
    echo.
    npm run dev
    goto :end
)

REM Fallback to bundled Node.js
echo 🔧 System Node.js not found, using bundled version...
if exist "..\node-v18.20.4-win-x64\node.exe" (
    set PATH=..\node-v18.20.4-win-x64;%PATH%
    echo ✅ Using bundled Node.js...
    node --version
    echo 📡 Starting development server...
    echo 🌐 Server will be available at: http://localhost:3001
    echo 💡 Press Ctrl+C to stop the server
    echo.
    npm run dev
) else (
    echo ❌ Node.js not found!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Or ensure the bundled Node.js is in the correct location.
    echo.
    echo Expected location: ..\node-v18.20.4-win-x64\node.exe
    echo Current directory: %CD%
)

:end
echo.
echo 🛑 Development server stopped.
pause
