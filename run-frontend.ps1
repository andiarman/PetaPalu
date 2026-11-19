# Script untuk Build & Serve Frontend Rust WebAssembly (Trunk)
Write-Host "⚡ Menjalankan Frontend Rust WebAssembly (Trunk)..." -ForegroundColor Green

$env:PATH = "C:\Users\andia\.cargo\bin;$env:PATH"

trunk serve
