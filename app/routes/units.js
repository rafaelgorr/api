
var mysql = require('../../connMysql');

var con = mysql.getConn();

exports.consulta = function(req,res)
{
  con.connect(function(err) {
    if(con.state == 'disconnected') throw err;
    con.query("SELECT * FROM unit", function (err, result, fields) {
      if (err) throw err;

      res.json(result);

    });
  });



}
