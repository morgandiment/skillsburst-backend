const express = require('express');
const router = express.Router();
const  {register_user}  = require('../controllers/registerController')

router.get('/registerUser', async (req, res) => {
    console.log('dgsgsdgds')
    const test = {
        body: {
          Username: 'john_doe',
          Email: 'adrianearlrivera@gmail.com',
          PhoneNumber: '07737169901',
          LastName: 'Doe',
          FirstName: 'John',
          Password: 'securePassword123',
        },
    };
      
    // Assuming verify_login is an asynchronous function, you can await it
    await register_user(test, res);
});

module.exports = router;