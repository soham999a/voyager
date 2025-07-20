@echo off
cd /d "%~dp0"
echo Starting Voyager Station development server...
echo Current directory: %CD%
echo.
"%~dp0..\node-v18.20.4-win-x64\node.exe" "%~dp0node_modules\next\dist\bin\next" dev
pause
