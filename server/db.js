const mysql = require('mysql')

function connect()
{
    const connection = mysql.createConnection({
        host: '',
        user: 'dmc',
        password: 'dmc',
        database: 'project_db',
        port: 3306
    })

    connection.connect()
    return connection
}

module.exports = {
    connect: connect
}