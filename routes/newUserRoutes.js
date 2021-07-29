const express = require('express');
const { db } = require('../models/userRecord');
const router = express.Router();
const UserRecord = require('../models/userRecord');
const { createNewUser } = require('../utilities/functions');

router
    .route('/')
    .post(async (req, res) => {
        // *** LOOK INTO HOW TO SECURLEY STORE USER DATA ***

        // DATA to be passed from frontend: 
        // {
        //     "username": "HotGuy94",
        //     "firstName": "James",
        //     "lastName": "King",
        //     "email": "test@test.com",
        //     "password": "password"
        // }

        // Handle data validation on the client side to avoid excess API calls
        const rawUserData = req.body;
        
        try {
            //current DB entries to be updated as they use userName instead of correct username
            const data = await UserRecord.find({$or: [{email : rawUserData.email}, {username : rawUserData.username}]});
            // Differentiate between username and email
            if (data[0].username === rawUserData.username && data[0].email === rawUserData.email) return res.status(409).send('a user with that email and username already exists');
            if (data[0].email === rawUserData.email) return res.status(409).send('a user with that email already exists');
            if (data[0].username === rawUserData.username) return res.status(409).send('a user with that username already exists');

            if (data.length !== 0) return res.status(409).send('a user with that email or username already exists');
        } catch (err) {
            console.log(err);
        };

        const newUserRecord = new UserRecord(createNewUser(rawUserData));
        
        newUserRecord.save(err => {
            if (err) {
                console.log(err)
                return res.status(502).send('error savng new record');
            }
            console.log('added new user record');
        })

        res.status(201).send('new user added to DB');
    })

module.exports = router;