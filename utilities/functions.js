const { v4: uuidv4 } = require('uuid');

const createNewUser = (id, newUserObj) => {
    return {
        id : id,
        userName : newUserObj.userName,
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