//Here we make a connection with the database

const  sql  = require('mssql');

// oeyeyeyyeyeyeyeyeyye


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


async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected successfully');

    // Assuming you want to wait for the query to complete before returning the pool
    const result = await pool.request().query('SELECT * FROM skillsb_test');
    console.log(result);
    const result2 = await pool.request().query("DELETE FROM skillsb_test where name='DERRICK'");
    const result3 = await pool.request().query('SELECT * FROM skillsb_test');
    //const result2 = await pool.request().query(insert skillsb_test (name ,age) values ('DERRICK' , 65)
    console.log(result3);
    //console.log(result2);

    return pool;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

module.exports = {
  connectToDatabase,
};
