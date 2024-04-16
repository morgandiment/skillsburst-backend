const express = require('express');
const router = express.Router();
const  {LoginUser,checkToken}  = require('../controllers/loginController')


router.post('/LoginUser', async (req, res) => {
   // console.log(req.body)
    await LoginUser(req, res);
});

router.post('/UserSession', async (req, res) => {
    //console.log(req.body)
    
    await checkToken(req, res);
 });
 


module.exports = router;