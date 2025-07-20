@echo off
echo.
echo ========================================
echo 🚀 VOYAGER PALEN - PRODUCTION BUILD
echo ========================================
echo.

REM Set the Node.js path
set NODE_PATH=..\node-v18.20.4-win-x64
set PATH=%NODE_PATH%;%PATH%

echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next 2>nul
if exist out rmdir /s /q out 2>nul
echo ✅ Cleaned previous builds

echo.
echo 📦 Installing dependencies...
%NODE_PATH%\npm.cmd install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo 🔧 Running production build...
set NODE_ENV=production
%NODE_PATH%\npm.cmd run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo ✅ BUILD COMPLETED SUCCESSFULLY!
echo.
echo 📊 Build Statistics:
if exist .next (
    echo ✅ .next folder created
    dir .next /s /-c | find "File(s)"
) else (
    echo ❌ .next folder not found
)

echo.
echo 🎉 Your Voyager Palen is ready for deployment!
echo.
echo 📋 NEXT STEPS:
echo    1. Push to GitHub
echo    2. Deploy to Vercel  
echo    3. Share your live URL!
echo.
echo 🌐 Will be live at: https://voyager-palen-space-station.vercel.app
echo.
pause
