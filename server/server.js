const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();


const app = express(); // calls express() function and stores returning object into app
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

// configs cors to allow * domains.. NOT SECURE FOR PRODUCTION!
// use only while in development in localhost 
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


// -------Error Handling under construction 
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status(404)
//   console.log(err)
//   next(err)
// })

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   return res.json({success: false, msg: err.message})
// })
// ----------------------------------------


// sets port to the enviroment value or port 5000 if unavailable
const port = process.env.PORT || 5000;

// start node/express server on port and console log it
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
}); 