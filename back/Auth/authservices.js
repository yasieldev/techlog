const bcrypt = require("bcrypt");



function hashPassword(password){
    const saltRound = 10;
    return bcrypt.hash(password, saltRound)
}

function verifyPassword(current_password, hashed_password){
    return bcrypt.compare(current_password, hashed_password);
}


module.exports = {hashPassword, verifyPassword};