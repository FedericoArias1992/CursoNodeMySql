const { Pool } = require('pg');
const { config } = require('../config/config');

//vamos a 'encriptar' el nombre de usuario y la contrasenha usando funcion encodeURIComponent():
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
//El pool hace un await interno y luego comparte esa conexion con cualquier requerimiento de la app que necesite esa conexion
	const pool = new Pool ({ connectionString: URI });
module.exports = pool;
