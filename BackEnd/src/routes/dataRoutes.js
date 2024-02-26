const express = require('express');
const dbController = require('../db/dbController')
const router = express.Router();



router.get('/test', (req, res) => {
    const fakeApiResponse = { message: 'Simulated API response for testing' };

    return res.status(200).json({ success: true, data: fakeApiResponse });
    console.log('Sucess')
});



module.exports = router;