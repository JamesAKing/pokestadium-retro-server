const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../utilities/authMiddleware');

router
    .route('/')
    .get(authenticateJWT, (req, res) => {

        const playerId = req.user;
        
        // Search User Record DB for a user that matches playerId

        // return user data as object

        res.send('GET/ User Record');
    })

module.exports = router;