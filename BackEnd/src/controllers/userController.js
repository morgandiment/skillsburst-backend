async function UpdateProfile (req,res){
    const {UserID ,DOB, PhoneNumber,FirstName,LastName} = req.body;
    
    try {

        //validation
        //presence check , all checks are done

        //do the check if real phone number exists
        //CHANGE THIS TO UPDATE 
        //UPDATE THE UserProfile Table


        res.status(400).json({ message: 'Ua.' });

        const query = `SELECT * FROM Users WHERE (Username = '${User}' OR Email = '${User}')`;
        const pool = await db.connectToDatabase();
        const result = await pool.request().query(query);
        
        res.status(200).json({ message: 'User registration successful.' });
    } catch (error) {

           res.status(500).json({ error: 'Internal Server Error' });
    }


}

module.exports = {
    UpdateProfile
};