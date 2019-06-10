'user strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
// if mongoose < 5.x, force ES6 Promise
// mongoose.Promise = global.Promise;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded);

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: Date
});

const user = mongoose.model('User' , userSchema);

mongoose.connect('mongodb://localhost:27017/test' , {useNewUrlParser:true}).then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/user' , (req , res )=> {

    console.log('data from http post' , req.body);
    user.create({
        firstname : req.body.firstname , 
        lastname : req.body.lastname , 
        dateOfBirth : new Date (req.body.dateOfBirth).getTime
    }).then(usr => {
        res.send('user ${usr.firstname} creaated with id: ${usr._id}');
    });
    app.get('/user' , (req , res) => {
        user.find().then(usrs => {
        res.send(usrs);
        });
    });
    /*
    user.create({
        firstname: 'John' , 
        lastname: 'Doe',
        dateOfBirth: new Date('1999-03-21').getTime()
    }).then(usr => {
        res.send('user ${usr.firstname} creaated with id: ${usr._id}');
    });
    */
});

app.get('/', (req, res) => {
    res.send('Hello World from Kasuga');
});

app.get('/test', (req, res) => {
    res.send('Testing is fun');
});