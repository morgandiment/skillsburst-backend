const express = require('express');
const router = express.Router();

const dataRoutes = require('./dataRoutes');
const loginRoutes = require('./loginRoutes')
const registerRoutes = require('./registerRoutes')

const { checkSessionTime } = require('../utils/Tokens');

// gonna add stuff here for token validation
// if the token exists then we should go straight to the progress popup
// if a token does not exist on the user's device then we will go to the login screen
// const SessionExists = await checkSessionTime();
// if (SessionExists) {
//     router.use('/progresspoup',progressRoutes);
// }
// else {
//     router.use('/login',loginRoutes);
// }

//data routes
router.use('/data',dataRoutes);

//login routes
router.use('/login',loginRoutes);

//register routes
router.use('/register',registerRoutes);

module.exports = router;