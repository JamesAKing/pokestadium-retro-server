const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserRecord = require('../models/userRecord');
const RefreshTokens = require('../models/refreshTokens');
const { generateAccessToken } = require('../utilities/authFunctions');

router
    .route('/')
    .post(async (req, res) => {
        const rawLoginData = req.body;

        // *** IMPROVE AUTHENTICATION METHODS TO BE SECURE ***

        try {
            const data = await UserRecord.find({ email: rawLoginData.email });

            if (data.length === 0) return res.status(401).send('invalid username or password');
            if (data[0].password !== rawLoginData.password) return res.status(401).send('invalid username or password');

            const playerId = data[0].playerId;
            const user = { playerId : playerId };

            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

            const newRefreshTokens = new RefreshTokens({ refreshToken : refreshToken });
            
            newRefreshTokens.save(err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err)
                }
                console.log('refresh token saved to DB');

            })
            
            res.header("Authorization", `Bearer ${accessToken}`).status(200).json({ accessToken, refreshToken });
        } catch (err) {
            console.log(err);
            res.send('POST/ login endpoint error');
        };
    });

router
    .route('/token')
    .post(async (req, res) => {
        const refreshToken = req.body.token;
        if (refreshToken == null) return res.status(401).send('no token provded');
        
        try {
            const data = await RefreshTokens.find({ refreshToken: refreshToken });
            if (data.length === 0) return res.status(403).send('invalid token');

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(403).send('invalid token');
                }
                const accessToken = generateAccessToken({ name: user.name })
                res.status(200).json({ accessToken });
            })

        } catch (err) {
            res.status().send('error accessing refresh token database');
        };
    })

module.exports = router;