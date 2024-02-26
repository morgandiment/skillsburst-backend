const express = require('express');
const router = express.Router();
const  {LoginUser}  = require('../controllers/loginController')


router.post('/LoginUser', async (req, res) => {
   // console.log(req.body)
    await LoginUser(req, res);
});



module.exports = router;