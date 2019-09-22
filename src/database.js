const mongoose = require ('mongoose');

const URI = 'mongodb://localhost/mern';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true   } ) 
.then(db => console.log('bbdd conectada'))
.catch(error => console.log(error));


module.exports= mongoose;