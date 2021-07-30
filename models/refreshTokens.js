const mongoose = require('mongoose');

const RefreshTokensSchema = new mongoose.Schema({
    refreshToken: String
});

const RefreshTokens = mongoose.model('RefreshTokens', RefreshTokensSchema);

module.exports = RefreshTokens;