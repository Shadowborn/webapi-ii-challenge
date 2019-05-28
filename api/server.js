const express = require('express');

const postsRouter = require('../posts/posts-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda posts API</h>
    <p>Welcome to the Lambda posts API</p>
  `);
});

server.use('/api/posts', postsRouter);

// add an endpoint that returns all the messages for a post
// add an endpoint for adding new message to a post

// export default server // ES2015 modules
module.exports = server; // <<<<<<<<<<<<<<<<< add this line
