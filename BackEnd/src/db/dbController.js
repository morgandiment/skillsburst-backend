//Here we make a connection with the database

const  sql  = require('mssql');


//these values are stored on render db which is gonna be temp till we find a better place to host
const config  = {
    user: 'skills_admin',
    server: 'skillsburst.database.windows.net',
    database: 'skillsdb ',
    password: "password'1",
    options: {
        encrypt: true,
    }
  
};


function connectToDatabase() {
  try {
      const pool =  sql.connect(config);
      console.log('Connected successfully');
      return pool;
  } catch (err) {
      console.error(err.message);
      throw err;
  }
}

module.exports = {
  connectToDatabase,
};
