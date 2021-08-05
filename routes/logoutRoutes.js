const express = require('express');
const router = express.Router();
const RefreshTokens = require('../models/refreshTokens');

router
    .route('/')
    .delete((req, res) => {
        const { token } = req.body;
        RefreshTokens.deleteOne({ refreshToken : token }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            console.log('token deleted');
        });
        
        res.status(204).send();
    })

module.exports = router