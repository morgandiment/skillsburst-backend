const db = require('../db/dbController');
const { encrypt, hashMatch } = require('../utils/security');
const { isEmailValid, checkUserExists } = require('../utils/validation');

async function register_user (req,res){
    //checks login is present in the db
    try {
        console.log(req)
        const {Username , Email  , Password , DOB  } = req.body;
        const pool = await db.connectToDatabase();

        console.log(Username , Email ,DOB, Password)
        //Validating The detailss goes here :
        // const {valid} = await isEmailValid(Email);
        // if (!valid) {
        //     pool.close()
        //     return res.status(400).send({
        //       message: 'Please provide a valid email address.'
        //     });
        // }

        
        // Check if the user already exists in the database
        const userExistsInfo = await checkUserExists(Username, Email);
        if (userExistsInfo) {
            // console.log('fail Exist')
            await pool.close()
            return res.status(400).send({
            message: `${userExistsInfo.field} already exists in the database.`
            });
        }
        let UserId = generateUniqueUserId();
        while (await checkUserIdExists(UserId, pool)) {
            UserId = generateUniqueUserId();
        }
        // console.log('fail id')

        // Hashing Password for security reasons
        const passwordHash = await encrypt(Password);

        const query = `INSERT INTO Users (UserID , Username, Email, PasswordHash)
                     VALUES ('${UserId}','${Username}', '${Email}', '${passwordHash}')`;
        
        let result = await pool.request().query(query);

        let ProfileId = generateUniqueUserId();
        while (await checkUserIdExists(ProfileId, pool)) {
            ProfileId = generateUniqueUserId();
        }
   
        const query2 = `INSERT INTO UserProfile (ProfileID , UserID, DOB)
                VALUES ('${ProfileId}','${UserId}', '${DOB}')`; 
        let result2 = await pool.request().query(query2);
        await pool.close()
        res.status(200).json({ message: 'User registration successful.' });
      
    } catch (error) {
        //console.error(error);
        await pool.close()
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