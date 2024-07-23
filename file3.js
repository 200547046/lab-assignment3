//importing express module
const express = require('express');
//importing file system module to read/write the json file
const fs = require('fs');
//creating an express app
const app = express();
//setting the port number
const port = 3000;

//middleware
app.use(express.json());

//function to read json data from file
const readData = () => {
  const data = fs.readFileSync('./data/data.json', 'utf8');
  return JSON.parse(data);
};

//function to write json data to file
const writeData = (data) => {
  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2));
};

//create (POST) - adding a new car
app.post('/cars', (req, res) => {
  const cars = readData();
  const newCar = req.body;
  cars.push(newCar);
  writeData(cars);
  res.status(201).send('Car added');
});

//update (PUT) - updating an existing car
app.put('/cars/:id', (req, res) => {
  const cars = readData();
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;
  const index = cars.findIndex(car => car.id === carId);
  if (index !== -1) {
    cars[index] = { id: carId, ...updatedCar };
    writeData(cars);
    res.send('Car updated');
  } else {
    res.status(404).send('Car not found');
  }
});

//delete (DELETE) - deleting a car
app.delete('/cars/:id', (req, res) => {
  const cars = readData();
  const carId = parseInt(req.params.id);
  const filteredCars = cars.filter(car => car.id !== carId);
  if (filteredCars.length < cars.length) {
    writeData(filteredCars);
    res.send('Car deleted');
  } else {
    res.status(404).send('Car not found');
  }
});

//starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
