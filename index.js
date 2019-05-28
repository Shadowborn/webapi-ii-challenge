// import server from './api/server' // ES2015 modules
const server = require('./api/server.js'); // CommonJS modules

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
