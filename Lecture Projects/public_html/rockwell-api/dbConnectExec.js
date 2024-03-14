const sql = require('mssql');
const config = require ('./config.js');

async function executeQuery (aQuery) {
    const connection = await sql.connect(config.DB);
    let result = await connection.query(aQuery);
    return result.recordset;
}

module.exports = {executeQuery: executeQuery};