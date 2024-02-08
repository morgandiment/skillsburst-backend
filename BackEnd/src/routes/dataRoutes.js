const express = require('express');
const dbController = require('../db/dbController')
const router = express.Router();

dbController.connectToDatabase();

router.get('/testconnection', (req, res) => {
    const fakeApiResponse = { message: 'Simulated API response for testing' };

    res.status(200).json({ success: true, data: fakeApiResponse });
    console.log('Sucess')
});

router.get('/testquery', (req,res) => {
    
})

module.exports = router;