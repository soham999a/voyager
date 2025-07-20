const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Voyager Palen Development Server...');
console.log('📁 Current directory:', __dirname);

// Check if Next.js exists
const nextPath = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
console.log('📦 Next.js path:', nextPath);

if (!fs.existsSync(nextPath)) {
  console.error('❌ Next.js not found at:', nextPath);
  console.log('📋 Available files in node_modules/next/dist/bin/:');
  try {
    const binDir = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin');
    const files = fs.readdirSync(binDir);
    console.log(files);
  } catch (e) {
    console.error('Cannot read bin directory:', e.message);
  }
  process.exit(1);
}

console.log('✅ Next.js found, starting server...');

const child = spawn('node', [nextPath, 'dev', '-p', '3001'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: __dirname,
  env: { ...process.env, PORT: '3001' }
});

child.stdout.on('data', (data) => {
  console.log('📤 STDOUT:', data.toString());
});

child.stderr.on('data', (data) => {
  console.error('📥 STDERR:', data.toString());
});

child.on('error', (error) => {
  console.error('❌ Error starting server:', error);
});

child.on('close', (code) => {
  console.log(`🔚 Server process exited with code ${code}`);
});

console.log('🌟 Server should be starting at http://localhost:3001');
console.log('⏳ Please wait for the server to compile...');
