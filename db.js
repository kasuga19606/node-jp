//with module weare strict by default
//'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test' , {useNewUrlParser:true}).then(() => {
  console.log('Connected successfully.');
  //app.listen(process.env.PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

module.exports = mongoose.connection;