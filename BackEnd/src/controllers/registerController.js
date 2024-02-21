const db = require('../db/dbController');
const { encrypt, hashMatch } = require('../utils/security');
const { isEmailValid, checkUserExists } = require('../utils/validation');

async function register_user (req,res){
    //checks login is present in the db
    try {
        const {Username , Email , PhoneNumber, LastName, FirstName , Password} = req.body;
        const pool = await db.connectToDatabase();

        //Validating The detailss goes here :
        const {valid} = await isEmailValid(Email);
        if (!valid) {
            return res.status(400).send({
              message: 'Please provide a valid email address.'
            });
        }
        // Check if the user already exists in the database
        const userExistsInfo = await checkUserExists(Username, Email, PhoneNumber);
        if (userExistsInfo) {
            return res.status(400).send({
            message: `${userExistsInfo.field} already exists in the database.`
            });
        }
        let UserId = generateUniqueUserId();
        while (await checkUserIdExists(UserId, pool)) {
            UserId = generateUniqueUserId();
        }
        // Hashing Password for security reasons
        const passwordHash = await encrypt(Password);

        const query = `INSERT INTO Users (UserID , Username, Email, PhoneNumber, LastName, FirstName, PasswordHash)
                     VALUES ('${UserId}','${Username}', '${Email}', '${PhoneNumber}', '${LastName}', '${FirstName}', '${passwordHash}')`;
        
        let result = await pool.request().query(query);
        res.status(200).json({ message: 'User registration successful.' });
        console.log('we did it')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function checkUserIdExists(userId, pool) {
    const query = `SELECT * FROM Users WHERE UserID = '${userId}'`;
    const result = await pool.request().query(query);
    return result.recordset.length > 0;
}
  
function generateUniqueUserId() {
    return Math.floor(Math.random() * 1000000).toString();
}

module.exports = {
    register_user,
};