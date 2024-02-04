//Here we make a connection with the database

const { Pool } = require('pg');


//these values are stored on render db which is gonna be temp till we find a better place to host
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SkillsBurstdb',
    password: "Adriver13",
    port: 5432,
});


pool.on('connect',()=> {
    console.log('Connected Properly')
})
// module.exports = pool;


module.exports = {
    pool,
    query: (text, params) => pool.query(text, params)
    // [name of query set ie loginQueries] : queries.[name of query]
};