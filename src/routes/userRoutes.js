const express = require('express');
const router = express.Router();
const  {UpdateProfile}  = require('../controllers/userController')

router.post('/updateUser', async (req, res) => {
    // console.log(req.body)
     await UpdateProfile(req, res);
 });

 module.exports = router;