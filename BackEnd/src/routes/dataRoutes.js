const express = require('express');
const dbController = require('../db/dbController')
const router = express.Router();

dbController.pool.connect()

router.get('/testconnection', (req, res) => {
    const fakeApiResponse = { message: 'Simulated API response for testing' };

    res.status(200).json({ success: true, data: fakeApiResponse });
});


module.exports = router;