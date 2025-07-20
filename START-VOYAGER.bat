@echo off
title Voyager Palen - Development Server
color 0A

echo.
echo  ██╗   ██╗ ██████╗ ██╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
echo  ██║   ██║██╔═══██╗╚██╗ ██╔╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
echo  ██║   ██║██║   ██║ ╚████╔╝ ███████║██║  ███╗█████╗  ██████╔╝
echo  ╚██╗ ██╔╝██║   ██║  ╚██╔╝  ██╔══██║██║   ██║██╔══╝  ██╔══██╗
echo   ╚████╔╝ ╚██████╔╝   ██║   ██║  ██║╚██████╔╝███████╗██║  ██║
echo    ╚═══╝   ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
echo.
echo                    PALEN STATION - VP-2077
echo                  Development Server Starting...
echo.

set NODE_PATH=C:\Users\aspir\Desktop\voyager\node-v18.20.4-win-x64
set PATH=%NODE_PATH%;%PATH%

echo [INFO] Node.js Path: %NODE_PATH%
echo [INFO] Working Directory: %CD%
echo [INFO] Starting Next.js Development Server...
echo [INFO] Server will be available at: http://localhost:3001
echo.

"%NODE_PATH%\node.exe" "node_modules\next\dist\bin\next" dev -p 3001

echo.
echo [INFO] Server has stopped.
pause
