# Cloudflare Tunnel for MySQL - Keep this PowerShell window OPEN!
# 
# INSTRUCTIONS:
# 1. Download cloudflared from: https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/
# 2. Extract cloudflared.exe to a folder (e.g., C:\cloudflared\)
# 3. Edit the path below to match your installation
# 4. Run this script (right-click, Run with PowerShell)
# 5. Copy the tunnel URL shown and provide it to the agent

# ============ CONFIGURATION ============
$CloudflaredPath = "C:\cloudflared\cloudflared.exe"  # Edit this path!
$LocalMysqlHost = "127.0.0.1"
$LocalMysqlPort = 3306

# ============ START TUNNEL ============
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cloudflare MySQL Tunnel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $CloudflaredPath)) {
    Write-Host "ERROR: cloudflared.exe not found at: $CloudflaredPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Download cloudflared here:" -ForegroundColor Yellow
    Write-Host "https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Then edit the `$CloudflaredPath variable in this script" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting tunnel to $LocalMysqlHost:$LocalMysqlPort" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Keep this window OPEN while using the app!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Once started, you'll see a URL like:" -ForegroundColor Green
Write-Host "tcp://xxxxx-xxxxx-xxxxx.trycloudflare.com:XXXXX" -ForegroundColor Cyan
Write-Host ""
Write-Host "Copy that URL and provide it to the agent!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

& $CloudflaredPath tunnel --url tcp://${LocalMysqlHost}:${LocalMysqlPort}
