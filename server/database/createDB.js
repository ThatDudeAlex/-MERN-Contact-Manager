// makes interacting with MongoDB through Node.js simpler. provides a straight-forward,
// schema-based solution to model your application data
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

module.exports = connection;
