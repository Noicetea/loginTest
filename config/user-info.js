const fs = require('fs');
let users = JSON.parse(fs.readFileSync(__dirname+'/user.json', 'utf8'));

function getUser(username){
    for(let user of users){
        if( user.username==username )
            return user;
    }
    return;
}

function getUserById(id){
    for(let user of users){
        if( user.id==id )
            return user;
    }
    return;
}

module.exports = {
    getUser:getUser,
    getUserById:getUserById,
}