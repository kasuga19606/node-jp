// user strict implict 
const router = require('express').Router();
const user = require('./model');
router.route('/')
    
    .post((req , res )=> {
        console.log('data from http post' , req.body);
        user.create({
            firstname : req.body.firstname , 
            lastname : req.body.lastname , 
            dateOfBirth : new Date(req.body.dob).getTime()
        }).then(usr => {
            res.send(`user ${usr.firstname} creaated with id: ${usr._id}`);
        });
    })

    .get( (req , res) => {
        user.find().then(usrs => {
        res.send(usrs);
        });
    });
router.route('/:id')
    .get((req , res) => {
        //user.findById(req.);
        res.send('user');
    });
module.exports = router;
  /*
    user.create({
        firstname: 'John' , 
        lastname: 'Doe',
        dateOfBirth: new Date('1999-03-21').getTime()
    }).then(usr => {
        res.send('user ${usr.firstname} creaated with id: ${usr._id}');
    });
    */