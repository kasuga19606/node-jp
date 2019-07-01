'user strict'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username !== process.env.username || password !== process.env.password) {
            done(null, false, {message: 'Incorrect credentials.'});
            return;
        }
        return done(null, {username:username}); // returned object usally contains something to identify the user
    }
));

const app = express();
app.use(express.static('public'));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:false}));

const user = require('./user/model');

db.on('connected' , () => {
    if(process.env.NODE_ENV == development){
        require('./localhost')(app , Process.env.HTTPS, process.env.PORT);
    }else{
        require('./production')(app , process.env.PORT);
    }
});

app.use('/user' , require('./user/router'));

app.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login.html', 
    session: false })
);


app.get('/', (req, res) => {
    if(req.secure){
        res.send('Hello Secure from kasuga');
    }else{
        res.send('Hello World from Kasuga');
    }
});

app.get('/test', (req, res) => {
    res.send('Testing is fun');
});