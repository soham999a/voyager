@echo off
echo Starting Voyager Palen Development Server...
echo Setting up Node.js environment...

set NODE_PATH=C:\Users\aspir\Desktop\voyager\node-v18.20.4-win-x64
set PATH=%NODE_PATH%;%PATH%

echo Node.js path: %NODE_PATH%
echo Current directory: %CD%

echo Testing Node.js installation...
"%NODE_PATH%\node.exe" --version

echo Starting development server directly...
"%NODE_PATH%\node.exe" node_modules\next\dist\bin\next dev -p 3001

pause
