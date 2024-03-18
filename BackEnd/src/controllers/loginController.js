const db = require('../db/dbController');
const { encrypt, hashMatch } = require('../utils/security');
const { isEmailValid, checkUserExists } = require('../utils/validation');
const AsyncStorage = require('@react-native-async-storage/async-storage');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


async function LoginUser (req,res){
    try {
        const {User ,Password} = req.body;
        console.log( req.body,'asefdaf');
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
        
        console.log(result)
        if (result.recordset.length > 0) {
            const userDetails = result.recordset[0];
            console.log('passed 1')
            const passwordHash = await hashMatch(Password, userDetails.PasswordHash);

            if (passwordHash){
                console.log('yesyesyes')
                let UserKey = generateUniqueKey(userDetails.UserID);
                console.log(UserKey ,'sfgsdgh')
                // while ( checkUserKeyExists(UserKey, pool)) {
                //     console.log('yooo')
                //     UserKey = generateUniqueKey(userDetails.UserID);

                // }
                console.log(UserKey ,'nopes')
                const insertQuery = `INSERT INTO UsersSession (SessionID , UserID, SessionTime)
                VALUES ('${UserKey}','${userDetails.UserID}', DATEADD(minute, 60, GETDATE()))`;
                let finalresult = await pool.request().query(insertQuery);
                console.log(UserKey ,'ni')
                // await AsyncStorage.setItem('jwtToken', UserKey);
                console.log(UserKey ,'234')
                await pool.close()
                res.status(200).json({ data: userDetails, message: 'Login successful' , token :UserKey });
               
            }
            else{
            //    console.error('The password entered does not match the username/email entered:', error.message);
                
               await pool.close()
               return res.status(400).send({
                    errType: 'password',
                    message: 'The password entered does not match the username/email entered'
               });
            }
        } else {
            console.log('nope')
            await pool.close()
         //   console.error('The username/email has been entered incorrectly or do not exist in the database:', error.message);
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
        console.log('yooooooooo')

        console.log(token)
        //const query = `SELECT * FROM Users WHERE (Username = '${User}' OR Email = '${User}')`;
        const query = `SELECT * FROM Users WHERE UserID IN (SELECT UserID FROM UsersSession WHERE SessionID = '${token}' )`;
        const pool = await db.connectToDatabase();
        console.log(query)
        const result = await pool.request().query(query);
        console.log(result)
        console.log('SAFGRSD')
        
        console.log(pool,'112')
        await pool.close()
        if (pool) {
            console.log(pool,'221')
            console.log('wahts up');
        } else {
            console.log('i closed bro')
        }
        res.status(200).json({ data: result.recordset[0] });
               
    } catch (error) {
           console.error(error);
           res.status(500).json({ error: 'Internal Server Error' });
    } 
}
async function checkUserKeyExists(finalKey, pool) {
    const query = `SELECT * FROM UsersSession WHERE SessionID = '${finalKey}'`;
    console.log(query)
    const result = await pool.request().query(query);
    console.log(result ,'sxfsed')
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