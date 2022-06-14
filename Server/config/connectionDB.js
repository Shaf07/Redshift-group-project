const { Sequelize } = require('sequelize')
require('dotenv').config();


// const sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
//     host: process.env.RDS_HOSTNAME,
//     port: process.env.RDS_PORT,
//     dialect: "mysql"
// })

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

sequelize.authenticate().then(() => {
    console.log("connection sucessful");
}).catch((error) => {
    console.log("no connect")
})



module.exports = sequelize;