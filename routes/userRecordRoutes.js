const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserRecord = require('../models/userRecord');
const { authenticateJWT } = require('../utilities/authFunctions');

router
    .route('/')
    .get(authenticateJWT, async (req, res) => {
        const { playerId } = req.user;
        try {
            const data = await UserRecord.find({ playerId : playerId});
            
            if (data.length === 0) return res.status(404).send('user data not present');

            res.status(200).json(data[0]);
        } catch (err) {
            console.log(err);
            res.status(500).send('error retrieving data');
        }
    });

module.exports = router;