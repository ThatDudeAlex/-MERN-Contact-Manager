// fast and lightweight web framework for Node.js. Easier to write NodeJS code with it
// Cross-origin resource sharing (CORS) allows AJAX requests to skip the 
// Same-origin policy and access resources from remote hosts
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
// loads environment variables from a .env file into process.env. This makes development simpler. 
// Instead of setting environment variables on our development machine, they can be stored in a file

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
// const passport = require('passport')
// const passportStrategy = require('./auth')

// calls express() function and stores returning object into app
const app = express();
const db = require('./database/createDB') // stores database connection into db


app.use(bodyParser.json()); // makes bodyParser able to parse json data from incoming requests 
app.use(bodyParser.urlencoded({extended: false})) // able to parse params data from incoming requests 

// sets session for tracking user login
app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: new MongoStore({ mongooseConnection: db}),
}))

// const isAuthenticated = require('./auth')

// app.use(passport.initialize());
// app.use(passport.session());
// passportStrategy(passport)

// configs cors to allow * domains.. NOT SECURE FOR PRODUCTION!, use only while in development 
// in localhost 
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));



// ------- Routes -----------
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');


// API route modules 
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

// catch all 
app.use('*', (req, res) => {res.json("catch all works, under development")})


// sets port to the enviroment value or port 5000 if unavailable
const port = process.env.PORT || 5000;

// start node/express server on port and console log it
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
}); 