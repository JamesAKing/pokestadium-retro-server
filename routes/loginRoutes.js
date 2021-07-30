const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserRecord = require('../models/userRecord');
const { generateAccessToken } = require('../utilities/authFunctions');

router
    .route('/')
    .post(async (req, res) => {

        // DATA to be passed from frontend: 
        // {
        //     "username": "HotGuy94",
        //     "email": "test@test.com",
        //     "password": "password"
        // }

        const rawLoginData = req.body;

        // *** IMPROVE AUTHENTICATION METHODS TO BE SECURE ***

        try {
            const data = await UserRecord.find({ email: rawLoginData.email });

            if (data.length === 0) return res.status(401).send('invalid username or password');
            if (data[0].password !== rawLoginData.password) return res.status(401).send('invalid username or password');

            const playerId = data[0].playerId;
            const user = { playerId : playerId };

            const accessToken = generateAccessToken(user);

            res.status(200).json({ accessToken });

        } catch (err) {
            console.log(err);
        };

        // Fix Error: UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        res.send('POST/ login endpoint');
    })

module.exports = router;