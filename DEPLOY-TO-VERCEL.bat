@echo off
echo.
echo ========================================
echo 🚀 DEPLOYING VOYAGER PALEN TO VERCEL
echo ========================================
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found! Using local Node.js...
    set NODE_PATH=..\node-v18.20.4-win-x64\node.exe
    set NPM_PATH=..\node-v18.20.4-win-x64\npm.cmd
    set NPX_PATH=..\node-v18.20.4-win-x64\npx.cmd
) else (
    echo ✅ Node.js found in system PATH
    set NODE_PATH=node
    set NPM_PATH=npm
    set NPX_PATH=npx
)

echo 📦 Installing dependencies...
%NPM_PATH% install

echo.
echo 🔧 Installing Vercel CLI...
%NPM_PATH% install -g vercel

echo.
echo 🌟 DEPLOYMENT OPTIONS:
echo.
echo 1. 🚀 Quick Deploy (Automatic)
echo 2. 🔧 Custom Deploy (Manual Setup)
echo 3. 📋 Show Deployment Guide
echo.
set /p choice="Choose option (1-3): "

if "%choice%"=="1" goto quick_deploy
if "%choice%"=="2" goto custom_deploy
if "%choice%"=="3" goto show_guide
goto quick_deploy

:quick_deploy
echo.
echo 🚀 Starting Quick Deployment...
echo.
echo 📝 This will:
echo    ✅ Build your project
echo    ✅ Deploy to Vercel
echo    ✅ Give you a live URL
echo.
%NPX_PATH% vercel --prod
goto end

:custom_deploy
echo.
echo 🔧 Custom Deployment Setup...
echo.
echo 📝 Follow these steps:
echo    1. Run: vercel login
echo    2. Run: vercel
echo    3. Follow the prompts
echo    4. Run: vercel --prod
echo.
%NPX_PATH% vercel login
%NPX_PATH% vercel
goto end

:show_guide
echo.
echo 📋 DEPLOYMENT GUIDE:
echo.
echo 🌐 OPTION 1 - Vercel Website (Easiest):
echo    1. Go to https://vercel.com
echo    2. Sign up with GitHub/Google
echo    3. Click "New Project"
echo    4. Import your GitHub repo
echo    5. Deploy automatically!
echo.
echo 💻 OPTION 2 - Command Line:
echo    1. Run: npm install -g vercel
echo    2. Run: vercel login
echo    3. Run: vercel --prod
echo    4. Follow the prompts
echo.
echo 📁 OPTION 3 - GitHub Integration:
echo    1. Push code to GitHub
echo    2. Connect GitHub to Vercel
echo    3. Auto-deploy on every push!
echo.
pause
goto end

:end
echo.
echo 🎉 Deployment process completed!
echo.
echo 🌐 Your Voyager Palen Space Station will be live at:
echo    https://your-project-name.vercel.app
echo.
echo 📱 Features available online:
echo    ✅ Professional Command Dashboard
echo    ✅ Space Station Interface
echo    ✅ Real-time Monitoring
echo    ✅ Mobile Responsive
echo    ✅ Secure Authentication
echo.
pause
