const express = require('express');
const router = express.Router();
const UserRecord = require('../models/userRecord');
const { createNewUser } = require('../utilities/functions');

router
    .route('/')
    .post(async (req, res) => {
        // *** LOOK INTO HOW TO SECURLEY STORE USER DATA ***
        const rawUserData = req.body;
        
        try {
            const data = await UserRecord.find({$or: [{email : rawUserData.email}, {username : rawUserData.username}]});
            if (data.length !== 0) {     
                if (data[0].username === rawUserData.username && data[0].email === rawUserData.email) return res.status(409).send('a user with that email and username already exists');
                if (data[0].email === rawUserData.email) return res.status(409).send('a user with that email already exists');
                if (data[0].username === rawUserData.username) return res.status(409).send('a user with that username already exists');
            }
            
            const newUserRecord = new UserRecord(createNewUser(rawUserData));        
            newUserRecord.save(err => {
                if (err) {
                    console.log(err)
                    return res.status(502).send('error savng new record');
                }
                console.log('added new user record');
            })
    
            res.status(201).send('new user added to DB');
        } catch (err) {
            console.log(err);
            // Add correct status code
            res.status(400).send(err);
        };
    })

module.exports = router;