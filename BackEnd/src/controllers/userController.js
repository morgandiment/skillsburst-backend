const db = require('../db/dbController');

async function UpdateProfile (req,res){
    const {UserID ,DOB, PhoneNumber,FirstName,LastName} = req.body;

    try {
        console.log('ooo changing profile')

        //phone number validation - UK format with +44 or 0
        if (PhoneNumber) {
            var regex = /^(?:\+?44)?(?:0|\(0\))?\s?7\d{3}\s?\d{6}$/;
            if (!regex.test(PhoneNumber)) {
                return res.status(400).send({
                    message: 'The phone number is in the incorrect format.'
                });
            }
        }

        //updates database
        const query = `UPDATE UserProfile SET DOB = '${DOB}', PhoneNumber = '${PhoneNumber}', FirstName = '${FirstName}', LastName = '${LastName}' WHERE UserID = '${UserID}'`;
        const pool = await db.connectToDatabase();
        const result = await pool.request().query(query);
        console.log(result)
        await pool.close()
        res.status(200).json({ message: 'Profile update successful.' });
    } catch (error) {
            console.error(error);
           res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    UpdateProfile
};