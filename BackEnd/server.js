
const express = require('express');
const dataRoutes=  require('./src/routes/dataRoutes.js');

const app = express();
const port = 3000;


app.use('/' , dataRoutes);

app.listen(port  , () => {
    console.log(`Server is ran on ${port}`);
});