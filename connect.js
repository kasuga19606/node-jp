'user strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// if mongoose < 5.x, force ES6 Promise
// mongoose.Promise = global.Promise;
const app = express();

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: Date
})
mongoose.connect('mongodb://localhost:27017/test' , {useNewUrlParser:true}).then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    res.send('Hello World from Kasuga');
});
app.get('/test', (req, res) => {
    res.send('Testing is fun');
});

//app.listen(process.env.PORT);