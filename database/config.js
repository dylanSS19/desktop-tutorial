const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');
 
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;



// const mongoose = require('mongoose');
// const mysql = require('mysql');


// const open = mysql.createConnection({
//     host: process.env.mysqlHost, 
//     database: process.env.mysqlDB,
//     user: process.env.mysqlDBUser,
//     password: process.env.mysqlPass
// });

// const dbConnection = async() => {

//     try {

//         await open.connect(function(error){

//             if(error){
//                 throw error;
//             }else{
//                 // console.log("Conexion exitosa");
//             }
        
//         });
    
//         console.log('Base de datos online');

//     } catch (error) {
//         console.log(error);
//         throw new Error('Error a la hora de iniciar la base de datos');
//     }


// }



// module.exports = {
//     dbConnection
// }
