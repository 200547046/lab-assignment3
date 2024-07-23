//importing express module
const express = require('express');
//creating an express app
const app = express();
//port number
const port = 3000;

//defining a route for the home page
app.get('/', (req, res) => {
  //sending a simple HTML response
  res.send('<h1>Hello, Welcome to Sooraj\'s website ! - Sooraj Rajeevan');
});

//starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
