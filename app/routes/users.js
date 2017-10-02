var mysql = require('../../connMysql');

var con = mysql.getConn();


exports.consulta = function(req,res){

	con.connect(function(err)
	{
	  if(con.state == 'disconnected') throw err;
		var query = "SELECT * FROM user";
	  con.query(query, function (err, result, fields)
		{
	    if (err) throw err;

			res.json(result);
	  });
	});
}

exports.consultaEspecifico = function(req,res){
  con.connect(function(err)
	{
    if(con.state == 'disconnected') throw err;

		var query = "SELECT * FROM user WHERE idUser=?";
	  con.query(query,req.params.user_id, function (err, result, fields)
		{
	    if (err) throw err;

			res.json(result);
	  });

	});

}
