const express = require('express');
const { db } = require('../models/userRecord');
const router = express.Router();
const UserRecord = require('../models/userRecord');
const { createNewUser } = require('../utilities/functions');

router
    .route('/')
    .post(async (req, res) => {
        // *** LOOK INTO HOW TO SECURLEY STORE USER DATA ***

        // Handle data on the client side to avoid excess API calls
        const rawUserData = req.body;
        
        try {
            //current DB entries to be updated as they use userName instead of correct username
            const data = await UserRecord.find({$or: [{email : rawUserData.email}, {username : rawUserData.username}]});
            // Differentiate between username and email
            if (data.length !== 0) return res.status(409).send('a user with that email or username already exists');
        } catch (err) {
            console.log(err);
        };

        const newUserRecord = new UserRecord(createNewUser(rawUserData));
        console.log(newUserRecord);


        // Add to DB


        // If Succesfully added, send success resp

        // If err, send err response

        res.send('POST/ add new user');
    })

module.exports = router;