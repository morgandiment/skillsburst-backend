//MOST VALIDATION WILL BE DONE CLIENT SIDE BUT SOME WILL BE DONE SERVER SIDE
const emailValidator = require('deep-email-validator');
const db = require('../db/dbController');


//Using Deep Email Validator To validate Email https://www.abstractapi.com/guides/node-email-validation#:~:text=Node%20email%20validation.-,How%20Do%20I%20Check%20if%20An%20Email%20is%20Valid%20in,and%20the%20SMTP%20server%20response.
async function isEmailValid(email) {
    return emailValidator.validate(email)
}
  

async function checkUserExists(Username, Email, PhoneNumber) {
    try {
      // Create a SQL query to check if the username already exists
      const query = `SELECT * FROM Users WHERE Username = '${Username}' OR Email = '${Email}' OR PhoneNumber = '${PhoneNumber}'`;
  
      // Execute the query
      const pool = await db.connectToDatabase();
      const result = await pool.request().query(query);
  
      // Check if any matching records were found
      if (result.recordset.length > 0) {
        const existingUser = result.recordset[0];
        if (existingUser.Username === Username) {
          return { field: 'Username', exists: true };
        } else if (existingUser.Email === Email) {
          return { field: 'Email', exists: true };
        } else if (existingUser.PhoneNumber === PhoneNumber) {
          return { field: 'PhoneNumber', exists: true };
        }
      }
  
      // If no matching records were found, return null
      return null;
    } catch (error) {
      console.error('Error checking user existence:', error.message);
      throw error;
    }
}

module.exports =  { isEmailValid, checkUserExists };