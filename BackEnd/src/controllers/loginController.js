const db = require('../db/dbController');
const { encrypt, hashMatch } = require('../utils/security');
const { isEmailValid, checkUserExists } = require('../utils/validation');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


async function LoginUser (req,res){
    try {
        const {User ,Password} = req.body;
        // if (User.includes('@')) {
        //     const {valid} = await isEmailValid(User);
        //     if (!valid) {
        //         return res.status(400).send({
        //             message: 'Please provide a valid email address.'
        //         });
        //     }
        // }

        const query = `SELECT * FROM Users WHERE (Username = '${User}' OR Email = '${User}')`;
        const pool = await db.connectToDatabase();
        const result = await pool.request().query(query);
        
        if (result.recordset.length > 0) {
            const userDetails = result.recordset[0];
            const passwordHash = await hashMatch(Password, userDetails.PasswordHash);

            if (passwordHash){
                let UserKey = generateUniqueKey(userDetails.UserID);
                // while ( checkUserKeyExists(UserKey, pool)) {
                //     console.log('yooo')
                //     UserKey = generateUniqueKey(userDetails.UserID);

                // }
                const insertQuery = `INSERT INTO UsersSession (SessionID , UserID, SessionTime)
                VALUES ('${UserKey}','${userDetails.UserID}', DATEADD(minute, 60, GETDATE()))`;
                let finalresult = await pool.request().query(insertQuery);
                await pool.close()
                res.status(200).json({ data: userDetails, message: 'Login successful' , token :UserKey });
               
            }
            else{               
               await pool.close()
               return res.status(400).send({
                    errType: 'password',
                    message: 'The password entered does not match the username/email entered'
               });
            }
        } else {
            console.log('nope')
            await pool.close()
            return res.status(400).send({
                errType: 'username',
                message: 'The username/email has been entered incorrectly or do not exist in the database'
            });
        }
        await pool.close();

    } catch (error) {
     //   console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function checkToken(req,res){
    try {
        const {token} = req.body;
        const query = `SELECT * FROM Users WHERE UserID IN (SELECT UserID FROM UsersSession WHERE SessionID = '${token}' )`;
        const pool = await db.connectToDatabase();
        const result = await pool.request().query(query);
        
        await pool.close()
        res.status(200).json({ data: result.recordset[0] });
               
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
    LoginUser,checkToken
};