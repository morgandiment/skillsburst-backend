const db = require('../db/dbController');
const { encrypt, hashMatch } = require('../utils/security');
const { isEmailValid, checkUserExists } = require('../utils/validation');

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

        const query = `SELECT * FROM Users WHERE (Username = '${Value}' OR Email = '${Value}')`;
        const pool = await db.connectToDatabase();
        const result = await pool.request().query(query);

        if (result.recordset.length > 0) {
            const existingUser = result.recordset[0];
            console.log(existingUser.PasswordHash)
            const passwordHash = await hashMatch(Password, existingUser.PasswordHash);
            if (passwordHash){
                res.json({ data: existingUser, message: 'Login successful'});
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

module.exports = {
    verify_login,
};