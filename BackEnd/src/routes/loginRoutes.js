const express = require('express');
const router = express.Router();
const  {verify_login}  = require('../controllers/loginController')

router.get('/verifyLogin', async (req, res) => {
    console.log('dgsgsdgds')
    // Assuming verify_login is an asynchronous function, you can await it
    await verify_login(req, res);
});



module.exports = router;