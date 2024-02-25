const express = require('express');
const router = express.Router();
const {verify_login} = require('../controllers/loginController')


router.get('/verifyLogin', async (req, res) => {
    const test = {
        body: {
          Value: 'adrianearlrivera@gmail.com',
          Password: 'securePassword123',
        },
    };
    await verify_login(test, res);
});


module.exports = router;