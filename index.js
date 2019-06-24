'user strict'
require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const db = require('./db');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));



const user = require('./user/model');

db.on('connected' , () => app.listen(process.env.PORT));
/*
mongoose.connect('mongodb://localhost:27017/test' , {useNewUrlParser:true}).then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});
*/
app.get('/user' , (req , res) => {
    user.find().then(usrs => {
    res.send(usrs);
    });
});

app.post('/user' , (req , res )=> {

    /*
    console.log('data from http post' , req.body);
    user.create({
        name : req.body.name , 
        age : req.body.age , 
        gender : req.body.gender,
        color : req.body.color , 
        weight : req.body.weight , 
    }).then(usr => {
        res.send(`user ${usr.name} creaated with id: ${usr._id} age ${usr.age}`);
    });
    */
    console.log('data from http post' , req.body);
    user.create({
        firstname : req.body.firstname , 
        lastname : req.body.lastname , 
        dateOfBirth : new Date(req.body.dob).getTime()
    }).then(usr => {
        res.send(`user ${usr.firstname} creaated with id: ${usr._id}`);
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