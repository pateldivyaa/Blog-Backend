const express = require('express');
const app = express();

console.log('🔍 Testing minimal server setup...');

try {
  // Test 1: Basic Express setup
  app.use(express.json());
  console.log('✅ Express JSON middleware OK');

  // Test 2: Your router (comment this out first to test)
  // const router = require('./router');
  // app.use('/api', router);
  // console.log('✅ Router loaded OK');

  // Test 3: Basic route
  app.get('/', (req, res) => {
    res.json({ message: 'Server is working' });
  });
  console.log('✅ Basic route OK');

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`✅ Test server running on port ${PORT}`);
    console.log('If this works, the issue is in your router or how it\'s used');
  });

} catch (error) {
  console.error('❌ Error in test server:', error.message);
  console.error(error.stack);
}