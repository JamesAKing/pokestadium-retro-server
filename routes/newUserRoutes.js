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

        const { username, firstName, lastName, email, password } = req.body;
        
        console.log(username);

        try {
            const data = await UserRecord.find({$or: [{email : email}, {username : username}]});
            // Differentiate between username and email
            if (data.length !== 0) return res.status(409).send('a user with that email or username already exists');
        } catch (err) {
            console.log(err);
        };

        // try {
        //     const usernameData = await UserRecord.find({ username : username });
        //     if (usernameData.length !== 0) return res.status(409).send('A User with that Username already exists');
        // } catch (err) {
        //     console.log(err);
        // };

        // Create new User Record Object

        // Add to DB

        // If Succesfully added, send success resp

        // If err, send err response

        res.send('POST/ add new user');
    })

module.exports = router;