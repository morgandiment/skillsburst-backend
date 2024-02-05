
const express = require('express');
const cors = require('cors');
const Routes=  require('./src/routes/Routes.js');

const app = express();
const port = 3000;
app.use(cors());

app.use('/',Routes);

app.listen(port  , () => {
    console.log(`Server is ran on ${port}`);
});