const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// VARIABLE ASSIGNMENT
const PORT = process.env.PORT || 8080;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

// MONGOOESE
mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('Mongoose: Active'));

// ROUTES
const createUserRoutes = require('./routes/createUserRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const userRecordsRoutes = require('./routes/userRecordRoutes');

app.use('/create-user', createUserRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/user-record', userRecordsRoutes);

app.listen(PORT, () => console.log(`Server Active\nPort: ${PORT}`));