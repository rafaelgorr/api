var mysql = require('../../connMysql');

var con = mysql.getConn();

exports.publicarDado = function(req,res)
{
  if(req.body.timestamp == null || req.body.value == null)
  {
    res.json("ERRO: timestamp ou value não informados.");
    return;
  }
  con.connect(function(err)
  {
    if(con.state == 'disconnected') throw err;

    var timestamp = req.body.timestamp + "";
    var value = req.body.value + "";

    var query = "SELECT * FROM stream WHERE _key=? "; // Checar se existe uma stream com a key fornecida
	  con.query(query,req.params.stream_key, function (err, result, fields)
		{
        if (err) throw err;
        if(!result.length)
        {
          res.json("ERRO: stream com \'key\': "+ req.params.stream_key + " não foi registrada.");
          return;
        }
        var streamRes = result[0];
        var query = "INSERT INTO data(idStream,timestamp,value) VALUES(?,?,?)";
        con.query(query, [result[0].idStream,timestamp, value ], function(err,result,fields)
        {
          res.json({"oid": result.insertId, "timestamp": timestamp, "value": value});
        });

    });

  });

}
