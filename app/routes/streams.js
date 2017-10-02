var mysql = require('../../connMysql');

var con = mysql.getConn();
var KeyGenerator = require('uuid-key-generator');





exports.consulta = function(req,res)
{

  con.connect(function(err)
  {
    if(con.state == 'disconnected') throw err;
    var query = "SELECT * FROM stream WHERE _key=?  ";
	  con.query(query,req.params.stream_key, function (err, result, fields)
		{
      if (err) throw err;

      if(!result.length) // Checar se existe uma stream com a key fornecida
      {
        res.json("ERRO: stream com \'key\': "+ req.params.stream_key + " não foi registrada.");
        return;
      }
      var streamRes = result[0];
      var query = "SELECT data.timestamp, data.value FROM data WHERE idStream=? "; // Consultar todos os dados da stream
      con.query(query,streamRes.idStream, function (err, result, fields)
      {
        if (err) throw err;
        var dataRes = result;


        res.json({"oid": streamRes.idStream, "key": streamRes._key, "label": streamRes.label, "unit": streamRes.idUnit, "sensor":  streamRes.idSensor,"totalSize": dataRes.length, "dados": dataRes});
      });


    });

  });
}


exports.registrar = function(req,res)
{
  if(req.body.label == null || req.body.unit == null)
  {
    res.json("ERRO: label ou unit não informados.");
    return;
  }
  con.connect(function(err)
  {
    if(con.state == 'disconnected') throw err;

    var label = req.body.label + "";
    var unit = req.body.unit + "";

    var query = "SELECT * FROM sensor WHERE _key=? "; // Checar se existe um sensor com a key fornecida
	  con.query(query,req.params.sensor_key, function (err, result, fields)
		{
	    if (err) throw err;
      if(!result.length)
      {
        res.json("ERRO: sensor com \'key\': "+ req.params.sensor_key + " não foi registrado.");
        return;
      }

      var sensorRes = result;
      var query = "SELECT * FROM unit WHERE idUnit=? ";//Checar se existe uma unit com o id fornecido
  	  con.query(query,unit, function (err, result, fields)
  		{
  	    if (err) throw err;
        if(!result.length)
        {
          res.json("ERRO: unit com \'id\': "+ unit + " não foi registrado.");
          return;
        }
        var keygen = new KeyGenerator(256);

      	var key = keygen.generateKey().toString();
        var query = "INSERT INTO stream(idSensor,idUnit,_key,label,enabled) VALUES(?,?,?,?,?)"; //Cadastrar nova stream
        con.query(query,[sensorRes[0].idSensor,unit,key,label,1], function (err, result, fields)
        {
          res.json({"oid": result.insertId, "key": key, "label": label, "unit": unit, "sensor": sensorRes[0].idSensor, "totalSize": 0 })
        });

      });
	  });
  });
}
