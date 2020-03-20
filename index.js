/* eslint-disable no-console */
const server = require('./server');
require('dotenv').config();

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`---Server running on http://localhost:${port}---`);
});
