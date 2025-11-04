@echo off
cd /d "%~dp0"
start cmd /k "npm run dev"
start cmd /k samboh-auto-backup.cmd
