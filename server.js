const express = require('express');
const server = express();
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

// Middleware
server.use(express.json());
server.use(logger);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	let fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	console.log(`Request method: ${req.method}`);
	console.log(`Request URL: ${fullUrl}`);
	console.log(`Timestamp: ${new Date()}`);
	console.log(`--------------------------------------------------------------`);
	next();
}

module.exports = server;
