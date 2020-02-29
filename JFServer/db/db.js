let config = require('../constants/config');
let mysql = require('mysql2');
let pool = mysql.createPool({
  host: config.SERVER_WEB,
  user: config.USER_NAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: 20
});

// const promisePool = pool.promise();

// const transaction = pool.getConnection((err, conn) => {
//   console.log("Connected to MySQL");
// });

module.exports = {
  pool
}