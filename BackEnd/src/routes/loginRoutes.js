const express = require('express');
const router = express.Router();
const  {verify_login}  = require('../controllers/loginController')


const mockRequest = {
    body: {
        username: "same",
        password: 243,
    },
};

const mockResponse = {
    json: (data) => {
        console.log(data);
    },
    status: (code) => {
        return {
            json: (data) => {
                console.log(data);
            },
        };
    },
};

router.get('/verifyLogin', async (req, res) => {
    console.log('dgsgsdgds')
    // Assuming verify_login is an asynchronous function, you can await it
    await verify_login(req, res);
});



module.exports = router;