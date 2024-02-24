const bcrypt = require('bcrypt');


async function encrypt(value) {
    
    let salt = bcrypt.genSaltSync(10)
    let hash = await bcrypt.hash(value , salt)
    return hash;
} 

async function hashMatch(value , hash) {
    let isMatch = await bcrypt.compare(value,hash)
    return isMatch;
} 

module.exports = { encrypt, hashMatch };