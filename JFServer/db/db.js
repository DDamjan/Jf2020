let config = require('../constants/config');
let mysql = require('mysql');
let pool  = mysql.createPool({
  host            : config.SERVER_WEB,
  user            : config.USER_NAME,
  password        : config.PASSWORD,
  database        : config.DATABASE,
  connectionLimit: 20
});

module.exports = {
    pool: pool
}