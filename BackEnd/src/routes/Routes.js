const express = require('express');
const router = express.Router();

const dataRoutes = require('./dataRoutes');
const loginRoutes = require('./loginRoutes')
const registerRoutes = require('./registerRoutes')
const userRoutes = require('./userRoutes')
const bodyParser = require('body-parser');
router.use(bodyParser.json());


const { checkSessionTime } = require('../utils/tokens');




//data routes
router.use('/data',dataRoutes);

//login routes
router.use('/login',loginRoutes);

//register routes
router.use('/register',registerRoutes);

//user routes
router.use('/user', userRoutes)

module.exports = router;