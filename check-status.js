const http = require('http');

console.log('🔍 Checking Voyager Palen Station Status...');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log('✅ Station Status: ONLINE');
  console.log(`📡 Response Code: ${res.statusCode}`);
  console.log('🌐 Server URL: http://localhost:3001');
  console.log('🚀 Voyager Palen is ready for command!');
});

req.on('error', (err) => {
  console.log('❌ Station Status: OFFLINE');
  console.log('🔧 Error:', err.message);
  console.log('💡 Try running: START-VOYAGER.bat');
});

req.on('timeout', () => {
  console.log('⏰ Station Status: TIMEOUT');
  console.log('🔧 Server may be starting up...');
  req.destroy();
});

req.end();
