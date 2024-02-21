const db = require('../db/dbController');

//validation
async function verify_login (req,res){
    //checks login is present in the db
    try {
        // const { username, password } = req.body;
        let username = "jack";
        let password = "smart" ;
        const pool = await db.connectToDatabase();
        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

        let result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            const user = result.recordset[0]; 
            //getting rid of info like passwords cuz it is sensitive
            delete user.password;
            res.json({ data: user, message: 'Login successful' });
        } else {
            // No user found, send a error as a response
            res.status(401).json({ error: 'Invalid credentials', message: 'Login failed' });
        }
        pool.close();
        console.log('hiiiiiiiiiii')
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    verify_login,
};