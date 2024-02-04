const express = require('express');
const dbController = require('../db/dbController')
const router = express.Router();

dbController.pool.connect()

module.exports = router;