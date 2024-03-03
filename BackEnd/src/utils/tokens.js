const db = require('../db/dbController');
const AsyncStorage = require('@react-native-async-storage/async-storage');

async function checkSessionTime() {
    try {
        const TokenExists = await retrieveToken();
        if (TokenExists === null) {
            return false;
        }
        const pool = await db.connectToDatabase();
        const query = `SELECT SessionTime FROM UsersSession WHERE SessionID = '${TokenExists}'`;
        const result = await pool.request().query(query);
        await pool.close()
        if (result.recordset.length > 0) {
            const sessionTime = result.recordset[0].SessionTime;
            const currentTime = new Date();
            if (sessionTime > currentTime) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking session expiration:', error);
        return false;
    }
}

const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token !== null) {
        console.log('Token retrieved successfully:', token);
        return token;
      } else {
        console.log('No token found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };


  module.exports = {
    checkSessionTime,
};