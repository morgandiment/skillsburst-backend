const express = require('express');
const router = express.Router();

const dataRoutes = require('./dataRoutes');

//data routes
router.use('/data',dataRoutes);


module.exports = router;