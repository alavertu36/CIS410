// practicing database connections on the server side
const sql = require('mssql');
const config = {
    user: 'csu',
    password: 'rams',
    server: 'buscissql1901.busdom.colostate.edu\\cisweb',
    database: 'RWStudios',
    trustServerCertificate: true
};

// sql.connect(config)
//     .then((myConnection) => {
//         return(myConnection.query('SELECT * FROM FILM'));
//     })
//     .then((myData) => {
//         console.log(myData.recordset);
//     })
//     .catch((myError) => {
//         console.log('Something went wrong', myError);
//     });

////////////////////////////////////////////////////////////////////////////
// asynchronus equivalent function
let myMovies;
async function executeQuery() {
    let connection = await sql.connect(config);
    myMovies = await connection.query('SELECT * FROM FILM');
    // console.log(myMovies.recordset);
}

executeQuery()
    .then(() => {
        console.log(myMovies.recordset);
    })
    .catch((myError) => {
        console.log(myError);
    });