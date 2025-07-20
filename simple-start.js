const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Voyager Palen Development Server...');
console.log('📁 Working directory:', process.cwd());

// Use the full path to Node.js
const nodePath = 'C:\\Users\\aspir\\Desktop\\voyager\\node-v18.20.4-win-x64\\node.exe';
const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');

console.log('📦 Node.js path:', nodePath);
console.log('📦 Next.js binary:', nextBin);

// Check if files exist
if (!fs.existsSync(nodePath)) {
  console.error('❌ Node.js not found at:', nodePath);
  process.exit(1);
}

if (!fs.existsSync(nextBin)) {
  console.error('❌ Next.js not found at:', nextBin);
  process.exit(1);
}

console.log('✅ All dependencies found, starting server...');

const server = spawn(nodePath, [nextBin, 'dev', '-p', '3001'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: __dirname,
  env: { ...process.env, NODE_ENV: 'development' }
});

server.stdout.on('data', (data) => {
  process.stdout.write(data);
});

server.stderr.on('data', (data) => {
  process.stderr.write(data);
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`🔚 Server exited with code ${code}`);
});

console.log('🌟 Server starting at http://localhost:3001');
console.log('⏳ Please wait for compilation to complete...');
