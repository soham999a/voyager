// Simple test to see if we can run Next.js
const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Testing Next.js setup...');
console.log('📁 Current directory:', __dirname);

try {
  // Check if Next.js is installed
  const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next');
  console.log('📦 Looking for Next.js at:', nextPath);
  
  // Try to run next build first to check for errors
  console.log('🔨 Testing Next.js compilation...');
  
  const result = execSync('node node_modules/next/dist/bin/next build', {
    cwd: __dirname,
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  console.log('✅ Build successful!');
  console.log('📤 Output:', result);
  
} catch (error) {
  console.error('❌ Error during build:');
  console.error('📥 Error message:', error.message);
  console.error('📥 Error output:', error.stdout);
  console.error('📥 Error stderr:', error.stderr);
}
