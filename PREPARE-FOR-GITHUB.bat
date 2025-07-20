@echo off
echo.
echo ========================================
echo 📁 PREPARING VOYAGER PALEN FOR GITHUB
echo ========================================
echo.

echo 🧹 Cleaning up files for GitHub...

REM Remove node_modules if it exists
if exist node_modules (
    echo Removing node_modules folder...
    rmdir /s /q node_modules
)

REM Remove build artifacts
if exist .next (
    echo Removing .next build folder...
    rmdir /s /q .next
)

if exist out (
    echo Removing out folder...
    rmdir /s /q out
)

REM Remove local Node.js if it exists
if exist ..\node-v18.20.4-win-x64 (
    echo Note: Local Node.js folder will not be included in GitHub
)

REM Copy the optimized .gitignore
if exist .gitignore.new (
    echo Updating .gitignore file...
    copy .gitignore.new .gitignore
    del .gitignore.new
)

echo.
echo ✅ Project cleaned and ready for GitHub!
echo.
echo 📋 WHAT'S READY FOR GITHUB:
echo    ✅ Source code (src/)
echo    ✅ Configuration files
echo    ✅ Package.json with dependencies
echo    ✅ Tailwind CSS config
echo    ✅ Next.js config
echo    ✅ Vercel deployment config
echo    ✅ Production README
echo    ✅ Proper .gitignore
echo.
echo ❌ EXCLUDED FROM GITHUB:
echo    ❌ node_modules (will be installed automatically)
echo    ❌ .next build folder (will be built on deployment)
echo    ❌ Environment variables (.env files)
echo    ❌ Local Node.js installation
echo.
echo 🚀 NEXT STEPS:
echo.
echo 1. 📁 CREATE GITHUB REPOSITORY:
echo    • Go to https://github.com
echo    • Click "New repository"
echo    • Name: "voyager-palen-space-station"
echo    • Description: "Professional Space Station Command Center"
echo    • Make it Public (so others can see it)
echo    • Don't initialize with README (we have one)
echo.
echo 2. 📤 UPLOAD YOUR PROJECT:
echo    • Drag and drop this entire "voyager-station" folder
echo    • OR use Git commands:
echo      git init
echo      git add .
echo      git commit -m "🚀 Initial commit - Voyager Palen Space Station"
echo      git branch -M main
echo      git remote add origin https://github.com/yourusername/voyager-palen-space-station.git
echo      git push -u origin main
echo.
echo 3. 🌐 DEPLOY TO VERCEL:
echo    • Go to https://vercel.com
echo    • Sign up/login
echo    • Click "Import Git Repository"
echo    • Select your GitHub repo
echo    • Deploy automatically!
echo.
echo 📊 PROJECT SIZE: 
dir /s /-c | find "File(s)"
echo.
echo 🎉 Your Voyager Palen Space Station is ready to go live!
echo.
pause
