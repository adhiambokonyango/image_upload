const sql = require('mssql')
const Sequelize = require('sequelize');
const con =
    new Sequelize.Sequelize(

        "photos",
        "postapesa",
        "B0st@5296",

        {
            host: '41.76.175.65',
            dialect: "mssql",
            operatorsAliases: false,

            trustedConnection: true,
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

con.query("SELECT 1", (err, rows) => {
    if (err){
        console.log(err)
    }
}).then(function (result){
    console.log(result)
})




module.exports = con;