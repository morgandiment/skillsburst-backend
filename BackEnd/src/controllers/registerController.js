const db = require('../db/dbController');
const { encrypt, hashMatch } = require('../utils/security');
const { isEmailValid, checkUserExists } = require('../utils/validation');

async function register_user (req,res){
    //checks login is present in the db
    try {
        // console.log(req)
        const {Username , Email  , Password , DOB  } = req.body;

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
            console.log('1')
            // console.log('fail Exist')
           
            return res.status(400).send({
            message: `${userExistsInfo.field} already exists in the database.`
            });
        }
        console.log('fail id1')
        let UserId = generateUniqueUserId();
        // while (await checkUserIdExists(UserId, pool)) {
        //     UserId = generateUniqueUserId();
        // }
        console.log('fail id')

        // Hashing Password for security reasons
        const passwordHash = await encrypt(Password);
        console.log('fail id')


        const query = `INSERT INTO Users (UserID , Username, Email, PasswordHash)
                     VALUES ('${UserId}','${Username}', '${Email}', '${passwordHash}')`;
        const pool = await db.connectToDatabase();
        let result = await pool.request().query(query);
        await pool.close()
        console.log('noe')

        let ProfileId = generateUniqueUserId();
        // while (await checkUserIdExists(ProfileId, pool)) {
        //     ProfileId = generateUniqueUserId();
        // }
        console.log('noe')
   
        const query2 = `INSERT INTO UserProfile (ProfileID , UserID, DOB)
                VALUES ('${ProfileId}','${UserId}', '${DOB}')`; 
        const pool2 = await db.connectToDatabase();
        let result2 = await pool2.request().query(query2);
        await pool2.close()
        res.status(200).json({ message: 'User registration successful.' });
      
    } catch (error) {
        
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