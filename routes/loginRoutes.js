const express = require('express');
const router = express.Router();
const UserRecord = require('../models/userRecord');

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

        try {
            const data = await UserRecord.find({ email: rawLoginData.email });
            if (data.length === 0) return res.status(401).send('invalid username or password');
            if (data.password !== rawLoginData.password) return res.status(401).send('invalid username or password');
        } catch (err) {
            console.log(err);
        };


        // search database for User Record

        // if User Record exists, compare login deatils password to saved password
            // if not equal return error
        
        // if passwords match create JWT token

        // Send JWT token to client

        res.send('POST/ login endpoint');
    })

module.exports = router;