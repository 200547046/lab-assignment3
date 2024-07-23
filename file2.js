//importing express module
const express = require('express');
//importing file system module to read the JSON file
const fs = require('fs');
//creating an express app
const app = express();
//port number
const port = 3000;

//defining a route to display json data
app.get('/cars', (req, res) => {
  //reading the json file
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
      //handling file read error
      res.status(500).send('Error reading file');
    } else {
      //sending json data as response
      res.send(data);
    }
  });
});

//starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
