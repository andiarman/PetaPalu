# Script untuk Menjalankan Backend Axum Server (Rust)
Write-Host "🦀 Menjalankan Peta Palu Backend Server (Rust / Axum)..." -ForegroundColor Cyan

$mingwBin = "C:\Users\andia\AppData\Local\Microsoft\WinGet\Packages\MartinStorsjo.LLVM-MinGW.MSVCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\llvm-mingw-20261020-msvcrt-x86_64\bin"
if (Test-Path $mingwBin) { $env:PATH = "$mingwBin;C:\Users\andia\.cargo\bin;$env:PATH" }

$env:PETAPALU_DATA_DIR = "$PSScriptRoot/data"
$env:PETAPALU_STATIC_DIR = "$PSScriptRoot/crates/frontend/dist"
$env:PORT = "8080"

cargo run -p petapalu-server
