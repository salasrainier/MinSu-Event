@echo off
REM Start local development server with Laragon MySQL
echo.
echo ========================================
echo MinSU Events - Local Development
echo ========================================
echo.
echo Connecting to Laragon MySQL at localhost:3306
echo.
echo Make sure:
echo - Laragon is running
echo - Content_event_system database exists
echo.

cd /d "%~dp0"
npm run dev
