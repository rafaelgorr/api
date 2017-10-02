var mysql = require('../../connMysql');

var con = mysql.getConn();

var KeyGenerator = require('uuid-key-generator');

class Stream {
  constructor(oid,key,label,unit,sensor,totalSize){
    this.oid = oid;
    this.key = key;
    this.label = label;
    this.unit = unit;
    this.sensor = sensor;
    this.totalSize = totalSize;
    this.data = [];
  }
}

class StreamWData {
  constructor(oid,key,label,unit,sensor,totalSize){
    this.oid = oid;
    this.key = key;
    this.label = label;
    this.unit = unit;
    this.sensor = sensor;
    this.totalSize = totalSize;
  }
}

class Data{
  constructor(timestamp,value)
  {
    this.timestamp = timestamp;
    this.value = value;
  }
}

class Sensor {
  constructor(oid,key,label, description)
  {
    this.oid = oid;
    this.key = key;
    this.label = label;
    this.description = description;
    this.streams = [];
  }
}

exports.consultaUsu = function(req,res)
{
  con.connect(function(err)
  {
    if(con.state == 'disconnected') throw err;
    var a;
    var query = "select sensor.idSensor, sensor.idUser, sensor._key as keySensor, sensor.label as sensorLabel, sensor.description, "
                +"stream._key, stream.idStream, stream.label, stream.idUnit,data.*  from rafaelgorr.sensor"
      + " left outer join rafaelgorr.stream on sensor.idSensor = stream.idSensor "
      +	" left outer join rafaelgorr.data on stream.idStream = data.idStream	"
      + "where idUser=? order by stream.idSensor, stream._key";
    con.query(query,req.params.user_id, function(err,result,fields)
    {
      if (err) throw err;
      if(!result.length) // Checar se existe um sensor com a key fornecida
      {
        res.json("ERRO: user com \'id\': "+ req.params.user_id + " não foi encontrado.");
        return;
      }
      var str;
      var snsrs = [];
      var sns;
      var lastSensor = "";
      var lastStream = "";
      var streams = [];
      for(k=0;k<result.length;k++)
      {
        if(lastSensor != result[k].idSensor)
        {
          lastSensor = result[k].idSensor;
          sns = new Sensor();
          sns.oid = result[k].idSensor;
          sns.key = result[k].keySensor;
          sns.label = result[k].labelSensor;
          sns.description = result[k].description;
          lastStream = "";

          if(result[k]._key != null)
          {
            for(i=k;i<result.length;i++)
            {
              if(result[i].idSensor == lastSensor && result[i]._key != lastStream)
              {
                lastStream = result[i]._key;
                str = new StreamWData();
                str.oid = result[i].idStream;
                str.key = result[i]._key;
                str.label = result[i].label;
                str.unit = result[i].idUnit;
                str.sensor = result[i].idSensor;
                str.totalSize = 0;

                for(j=k;j<result.length;j++)
                  if(result[i].idSensor == lastSensor &&  lastStream == result[j]._key)
                    str.totalSize++;

                streams.push(str);
              }
            }
            sns.streams = streams;
            streams = [];
            snsrs.push(sns);
        }
        else {
          snsrs.push(sns);
        }



      }


    }

      res.json(snsrs);

    });


  });
}


exports.consulta = function(req,res)
{
  con.connect(function(err)
  {
    if(con.state == 'disconnected') throw err;
    var query = "select sensor.idSensor as oid, sensor._key as keySensor, sensor.description, stream.*, data.timestamp, data.value from rafaelgorr.sensor  "
	               +"left outer join rafaelgorr.stream on sensor.idSensor = stream.idSensor  "
                  +"left outer join rafaelgorr.data on stream.idStream = data.idStream  "
                  +"where sensor._key =? ORDER BY stream.idStream, data.timestamp desc  ";
    con.query(query,req.params.sensor_key, function (err, result, fields)
		{
      if (err) throw err;

      if(!result.length) // Checar se existe um sensor com a key fornecida
      {
        res.json("ERRO: sensor com \'key\': "+ req.params.stream_key + " não foi registrado.");
        return;
      }
      var str;
      var dt;
      var streams = [];
      var lastStream = "";
      for(i=0;i<result.length;i++) //Transformar do resultado da query em Mysql para json
      {
        if(result[i]._key != lastStream)
        {
          lastStream = result[i]._key;
          str = new Stream();
          str.oid = result[i].idStream;
          str.key = result[i]._key;
          str.label = result[i].label;
          str.unit = result[i].idUnit;
          str.sensor = result[i].idSensor;
          str.totalSize = 0;

          for(j=0;j<result.length;j++)
          {
            if(lastStream == result[j]._key)
            {
              str.totalSize++;
              if(str.totalSize <= 5)
              {
                dt = new Data();
                dt.timestamp = result[j].timestamp;
                dt.value = result[j].value;

                if(dt.timestamp != null ||dt.value != null)
                  str.data.push(dt);
                else
                  str.data.push();
              }
            }

          }


          streams.push(str);
        }
      }

      var sensorRes = result[0];
      var out = {"oid": sensorRes.oid,
                  "key": sensorRes.keySensor,
                 "label" : sensorRes.label,
                 "description": sensorRes.description,
                 "streams": streams
                };

      res.json(out);

    });



  });
}

exports.cadastro = function(req,res)
{
	var label = req.body.label;
	var description = req.body.description;

	var keygen = new KeyGenerator(256);

	var key = keygen.generateKey().toString();

	var insert = "INSERT INTO sensor (_key,label,description)  VALUES (?,?,?)";

  con.connect(function(err){
    if(con.state == 'disconnected') throw err;
    con.query(insert,[key , label, description], function (err, result)
  	{
      if (err) throw err;
      res.json({"oid": result.insertId, "key": key, "label": label, "description": description});

    });
  });

}
