// ----- node packages ----- 
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

// routes 


// calls express() function and stores returning object into app
const app = express();

// start node + express server on port 5000
app.listen(5000); 