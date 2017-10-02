module.exports  =  {
  getConn: function()
  {
    var mysql = require('mysql');
    
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1503264",
      database: "rafaelgorr"
    });

    return con;
  }
}
