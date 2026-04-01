# Chitragupt Platform Launch Script (Local Windows)
# -----------------------------------------------

Write-Host "🚀 Starting Chitragupt Local Governance Platform..." -ForegroundColor Cyan

# 1. Start PostgreSQL (Manual Mode)
$pgPath = "C:\Program Files\PostgreSQL\16\bin\postgres.exe"
$pgData = "C:\Program Files\PostgreSQL\16\data"

if (Test-Path $pgPath) {
    Write-Host "📦 Starting PostgreSQL..." -ForegroundColor Saffron
    Start-Process -FilePath $pgPath -ArgumentList "-D", """$pgData""" -WindowStyle Hidden
    Start-Sleep -Seconds 3
} else {
    Write-Host "⚠️ PostgreSQL not found at $pgPath. Ensure it is installed." -ForegroundColor Red
}

# 2. Start Backend
Write-Host "🛡️ Starting Backend (Port 5000)..." -ForegroundColor Blue
Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd backend && npm run dev" -NoNewWindow
Start-Sleep -Seconds 5

# 3. Start Frontend
Write-Host "🌐 Starting Frontend (Port 3000)..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd frontend && npm run dev" -NoNewWindow
Start-Sleep -Seconds 10

# 4. Open Browser
Write-Host "🌍 Launching Chitragupt Home..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host "✅ System Startup Initiated. Check backend/frontend terminal windows for logs." -ForegroundColor Green
