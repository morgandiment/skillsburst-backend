const express = require('express');
const router = express.Router();
const  {register_user}  = require('../controllers/registerController')

router.post('/registerUser', async (req, res) => {
  console.log('szgseg', req.body)
  // console.log(req.body,'hi')
    // Assuming verify_login is an asynchronous function, you can await it
  await register_user(req, res);
});

module.exports = router;