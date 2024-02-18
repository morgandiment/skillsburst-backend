const express = require('express');
const router = express.Router();

const dataRoutes = require('./dataRoutes');
const loginRoutes = require('./loginRoutes')

//data routes
router.use('/data',dataRoutes);

//login routes
router.use('/login',loginRoutes);


module.exports = router;