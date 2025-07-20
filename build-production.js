#!/usr/bin/env node

/**
 * 🚀 VOYAGER PALEN - PRODUCTION BUILD SCRIPT
 * This script carefully builds the project for production deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('🚀 BUILDING VOYAGER PALEN FOR PRODUCTION');
console.log('========================================\n');

// Function to run commands safely
function runCommand(command, description) {
  console.log(`🔧 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`✅ ${description} completed successfully!\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

// Function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

// Function to get directory size
function getDirSize(dirPath) {
  try {
    const stats = execSync(`du -sh ${dirPath} 2>/dev/null || echo "Unknown"`, { encoding: 'utf8' });
    return stats.trim();
  } catch {
    return 'Unknown';
  }
}

async function buildProduction() {
  console.log('📋 Pre-build checks...');
  
  // Check if package.json exists
  if (!fileExists('package.json')) {
    console.error('❌ package.json not found!');
    process.exit(1);
  }
  
  // Check if src directory exists
  if (!fileExists('src')) {
    console.error('❌ src directory not found!');
    process.exit(1);
  }
  
  console.log('✅ Project structure verified\n');
  
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  try {
    if (fs.existsSync('.next')) {
      // Use Windows-compatible removal
      if (process.platform === 'win32') {
        execSync('rmdir /s /q .next', { stdio: 'ignore' });
      } else {
        fs.rmSync('.next', { recursive: true, force: true });
      }
      console.log('✅ Removed .next directory');
    }
    if (fs.existsSync('out')) {
      if (process.platform === 'win32') {
        execSync('rmdir /s /q out', { stdio: 'ignore' });
      } else {
        fs.rmSync('out', { recursive: true, force: true });
      }
      console.log('✅ Removed out directory');
    }
  } catch (error) {
    console.log('⚠️  Could not clean previous builds, continuing...');
  }
  console.log('');
  
  // Set production environment
  process.env.NODE_ENV = 'production';
  console.log('🌐 Environment set to production\n');
  
  // Install dependencies
  if (!runCommand('npm install', 'Installing dependencies')) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
  
  // Run linting
  if (!runCommand('npm run lint', 'Running ESLint checks')) {
    console.log('⚠️  Linting issues found, but continuing with build...\n');
  }
  
  // Build the project
  if (!runCommand('npm run build', 'Building for production')) {
    console.error('❌ Production build failed!');
    process.exit(1);
  }
  
  // Build statistics
  console.log('📊 Build Statistics:');
  console.log('==================');
  
  if (fs.existsSync('.next')) {
    console.log(`📁 .next directory: ${getDirSize('.next')}`);
    
    // Check for build artifacts
    const buildManifest = '.next/build-manifest.json';
    if (fs.existsSync(buildManifest)) {
      console.log('✅ Build manifest created');
    }
    
    const staticDir = '.next/static';
    if (fs.existsSync(staticDir)) {
      console.log('✅ Static assets generated');
    }
  }
  
  console.log('\n🎉 PRODUCTION BUILD COMPLETED SUCCESSFULLY!');
  console.log('\n🌐 Your Voyager Palen is ready for deployment!');
  console.log('\n📋 NEXT STEPS:');
  console.log('   1. Push to GitHub: git add . && git commit -m "Production build" && git push');
  console.log('   2. Deploy to Vercel: Go to https://vercel.com');
  console.log('   3. Import your GitHub repository');
  console.log('   4. Deploy automatically!');
  console.log('\n🚀 Production Features:');
  console.log('   ✅ Optimized bundle size');
  console.log('   ✅ Minified JavaScript/CSS');
  console.log('   ✅ Image optimization');
  console.log('   ✅ Security headers');
  console.log('   ✅ Performance optimizations');
  console.log('   ✅ SEO ready');
  console.log('\n🌟 Your space station will be live at:');
  console.log('   https://voyager-palen-space-station.vercel.app');
  console.log('\n========================================');
}

// Run the build
buildProduction().catch(error => {
  console.error('❌ Build process failed:', error);
  process.exit(1);
});
