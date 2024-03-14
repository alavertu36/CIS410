const sql = require('mssql');

const config = {
    user: 'larger',
    password: 'scale',
    server: 'buscissql1901.busdom.colostate.edu\\cisweb',
    database: 'Team103DB',
    trustServerCertificate: true
};
sql.connect(config)
    .then((myConnection) => {
        return (myConnection.query('SELECT * FROM VideoGame'));
    })
    .then((myData) => {
        console.log(myData);
    })
    .catch((myError) => {
        console.log("Something went wrong", myError);
    })

////////////////////////////////////////////////

async function executeQuery() {
    let connection = await sql.connect(config);
    myVideoGame = await connection.query('SELECT * FROM VideoGame');
}
executeQuery()
    .then(() => {
        console.log(myVideoGame)
    })
    .catch((myError) => {
        console.log(myError);
    })