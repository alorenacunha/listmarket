const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("sadf");
  next();
});


mongoose.connect(
  "mongodb+srv://dba:dbaroot@listmarket-jmqlc.mongodb.net/test?retryWrites=true&w=majority",
  { dbName: 'listmarket', useNewUrlParser: true }
).then(() => {
  console.log('Connection to the Atlas Cluster is successful!')
}).catch((err) => console.error(err));

requireDir('./src/models');

app.use('/api', require('./src/routes'));
app.listen(4001);