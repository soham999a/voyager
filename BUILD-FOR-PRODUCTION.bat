@echo off
echo.
echo ========================================
echo 🚀 BUILDING VOYAGER PALEN FOR PRODUCTION
echo ========================================
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found! Using local Node.js...
    set NODE_PATH=..\node-v18.20.4-win-x64\node.exe
    set NPM_PATH=..\node-v18.20.4-win-x64\npm.cmd
) else (
    echo ✅ Node.js found in system PATH
    set NODE_PATH=node
    set NPM_PATH=npm
)

echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo.
echo 📦 Installing production dependencies...
%NPM_PATH% install --production=false

echo.
echo 🔧 Running TypeScript checks...
%NPM_PATH% run lint

echo.
echo 🏗️ Building for production...
set NODE_ENV=production
%NPM_PATH% run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Production build completed successfully!
echo.
echo 📊 Build Statistics:
dir .next /s /-c | find "File(s)"
echo.

echo 🌐 Your Voyager Palen is ready for deployment!
echo.
echo 📋 NEXT STEPS:
echo    1. Push to GitHub: git add . && git commit -m "Production build" && git push
echo    2. Deploy to Vercel: Go to https://vercel.com
echo    3. Import your GitHub repository
echo    4. Deploy automatically!
echo.
echo 🚀 Production Features:
echo    ✅ Optimized bundle size
echo    ✅ Minified JavaScript/CSS
echo    ✅ Image optimization
echo    ✅ Security headers
echo    ✅ Performance optimizations
echo    ✅ SEO ready
echo.

pause
