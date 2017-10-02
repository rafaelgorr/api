# RESTFul API

REQUISITOS
  1 - Node.js
  2 - Express
  3 - Postman

INSTRUÇÕES
  1 - Importar as tabelas que estão na pasta 'Mysql' usando o MySQL Workbench.
  2 - Rodar o servidor Mysql.
  3 - Executar o programa com o comando "node servidor.js"

EXECUÇÃO (POSTMAN)
  1 - Consultar unidades de grandeza ( unit )               -->     [GET] localhost:8000/api/units
  2 - Consultar Sensores ( sensor ) de um Usuário ( user )  -->     [GET] localhost:8000/api/sensor/user/:user_id
  3 - Consulta de um Sensor ( sensor ) específico           -->     [GET] localhost:8000/api/sensor/:sensor_key
  4 - Consulta de dados de um Stream ( stream ) específico  -->     [GET] localhost:8000/api/streams/:stream_key
  5 - Registrar Sensor ( sensor )                           -->     [POST] localhost:8000/api/sensor
  6 - Registrar Stream ( stream ) para Sensor ( sensor )    -->     [POST] localhost:8000/api/streams/:sensor_key
  7 - Publicar dado em um Stream ( stream )                 -->     [POST] localhost:8000/api/data/:stream_key
  
  
  
PS.: Para obter as chaves de stream, sensor, etc é necessário fazer uma consulta no Mysql Workbench, ex.: "select stream.key from rafaelgorr.stream"
  
