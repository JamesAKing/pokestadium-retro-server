const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

app.listen(PORT, () => console.log(`Server Active\nPort: ${PORT}`));