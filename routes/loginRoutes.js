const express = require('express');
const router = express.Router();

router
    .route('/')
    .post((req, res) => {
        res.send('POST/ login endpoint');
    })

module.exports = router;