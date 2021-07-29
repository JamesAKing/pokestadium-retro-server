const { v4: uuidv4 } = require('uuid');

const createNewUser = (newUserObj) => {
    return {
        playerId : uuidv4(),
        username : newUserObj.username,
        player : {
            firstName : newUserObj.firstName,
            lastName : newUserObj.lastName,
        }, 
        battleRecord : {
            total : 0,
            won : 0
        }
    }
}

module.exports = {
    createNewUser
};