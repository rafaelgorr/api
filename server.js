
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

var KeyGenerator = require('uuid-key-generator');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var router  = express.Router();

var units = require('./app/routes/units');
var sensors = require('./app/routes/sensors');
var users = require('./app/routes/users');
var streams = require('./app/routes/streams');
var datas = require('./app/routes/datas');

app.use('/api', router);


app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);


var mysql = require('./connMysql');

var con = mysql.getConn();


//units
router.route('/units').get( units.consulta); //[GET] Consultar unidades de grandeza ( unit )


//sensors
router.route('/sensor').post(sensors.cadastro); //[POST] Registrar Sensor ( sensor )
router.route('/sensor/:sensor_key').get(sensors.consulta); //[GET] Consulta de um Sensor ( sensor ) específico.
router.route('/sensor/user/:user_id').get(sensors.consultaUsu); //[GET] Consultar Sensores ( sensor ) de um Usuário ( user )

//users
router.route('/users').get(users.consulta);
router.route('/users/:user_id').get(users.consultaEspecifico);

//streams
router.route('/streams/:sensor_key').post(streams.registrar); //[POST] Registrar Stream ( stream ) para Sensor ( sensor )
router.route('/streams/:stream_key').get(streams.consulta);//[GET] Consulta de dados de um Stream ( stream ) específico. Ex: 

//data
router.route('/data/:stream_key').post(datas.publicarDado); //[POST] Publicar dado em um Stream ( stream )
