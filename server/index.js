const express = require('express');
// By calling express, it creates a single running express app.
const app = express();

// Whenever any incoming request matches this route, callback gonna be executed
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Take the port available on the server or use default for dev environment
const PORT = process.env.PORT || 5000;
// Listen incoming traffic on port: 5000
app.listen(PORT);
