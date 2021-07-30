const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RefreshTokens = require('../models/refreshTokens');

router
    .route('/')
    .delete((req, res) => {
        const token = req.body.token;
        RefreshTokens.deleteOne({ refreshToken : token }, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log('token deleted');
        })
        res.status(204).send();
    })

module.exports = router