// fast and lightweight web framework for Node.js. Easier to write NodeJS code with it
const express = require('express');

// makes interacting with MongoDB through Node.js simpler. provides a straight-forward, 
// schema-based solution to model your application data
const mongoose = require('mongoose');

// Cross-origin resource sharing (CORS) allows AJAX requests to skip the 
// Same-origin policy and access resources from remote hosts
const cors = require('cors');

// authentication middleware for Node. Its single purpose is: authenticate requests
const passport = require('passport');

// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
const bodyParser = require('body-parser');

// loads environment variables from a .env file into process.env. This makes development simpler. 
// Instead of setting environment variables on our development machine, they can be stored in a file
const dotenv = require('dotenv').config();

// calls express() function and stores returning object into app
const app = express();


// ------- Routes -----------
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

// API route modules 
app.use('/users', userRoutes);
// app.use('/contacts', contactRoutes);

// catch all 
// app.use('*', (req, res) => {res.json("catch all works")})


// ------ Node modules ------
app.use(cors()); // (Enable All CORS Requests)
app.use(bodyParser.json()); // makes bodyParser able to parse json data from incoming requests 




// ----- database connection -----
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})






// sets port to the enviroment value or port 5000 if unavailable
const port = process.env.PORT || 5000;

// start node/express server on port and console log it
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
}); 