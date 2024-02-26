
const express = require('express');
const cors = require('cors');
const Routes=  require('./src/routes/Routes.js');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

app.use(Routes);
app.use(express.json());
app.use(bodyParser.json());


module.exports = app;
