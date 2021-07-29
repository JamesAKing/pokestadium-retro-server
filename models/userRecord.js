const mongoose = require('mongoose');

const UserRecordSchema = new mongoose.Schema({
    id : String,
    userName : String,
    player : {
        firstName : String,
        lastName : String,
        date : {
            type : String, 
            default : Date.now()
        }
        // profilePic : String,
        // Auth Info
    },
    battleRecord : {
        total : Number,
        won : Number
    },
    pokemonParties : [
        {
            partyId : String,
            pokemon : [
                {
                    pokemonId : String,
                    moves : Array,
                    exp : Number
                }
            ]
        }
    ]
});

const UserRecord = mongoose.model('UserRecord', UserRecordSchema);

module.exports = UserRecord;