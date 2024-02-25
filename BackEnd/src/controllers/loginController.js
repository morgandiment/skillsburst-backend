const db = require('../db/dbController');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { hashMatch } = require('../utils/security');
const { isEmailValid } = require('../utils/validation');
const AsyncStorage = require('@react-native-async-storage/async-storage');


async function verify_login (req,res){
    try {
        const {Value ,Password} = req.body;

        if (Value.includes('@')) {
            const {valid} = await isEmailValid(Value);
            if (!valid) {
                return res.status(400).send({
                    message: 'Please provide a valid email address.'
                });
            }
        }

        const retrieveQuery = `SELECT * FROM Users WHERE (Username = '${Value}' OR Email = '${Value}')`;
        const pool = await db.connectToDatabase();
        const result = await pool.request().query(retrieveQuery);

        if (result.recordset.length > 0) {
            const userDetails = result.recordset[0];
            const passwordHash = await hashMatch(Password, userDetails.PasswordHash);
            if (passwordHash){
                let UserKey = generateUniqueKey(userDetails.UserID);
                while (await checkUserKeyExists(UserKey, pool)) {
                    UserKey = generateUniqueKey(userDetails.UserID);
                }
                const insertQuery = `INSERT INTO UsersSession (SessionID , UserID, SessionTime)
                VALUES ('${UserKey}','${userDetails.UserID}', DATEADD(minute, 20, GETDATE()))`;
                let finalresult = await pool.request().query(insertQuery);

                await AsyncStorage.setItem('jwtToken', UserKey);
                
                res.json({ data: userDetails, message: 'Login successful'});
            }
            else{
                console.error('The password entered does not match the username/email entered:', error.message);
                throw new error('oeye');
            }
        } else {
            console.error('The username/email has been entered incorrectly or do not exist in the database:', error.message);
            throw error;
        }
        pool.close();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function checkUserKeyExists(finalKey, pool) {
    const query = `SELECT * FROM UsersSession WHERE SessionID = '${finalKey}'`;
    const result = await pool.request().query(query);
    return result.recordset.length > 0;
}
  

function generateUniqueKey(finalID) {
    const key = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: finalID }, key);
    return token;
}


module.exports = {
    verify_login,
};