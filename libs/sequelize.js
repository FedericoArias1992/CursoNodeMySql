const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('../db/models/');

//vamos a 'encriptar' el nombre de usuario y la contrasenha usando funcion encodeURIComponent():
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging:console.log,
  }
);

setupModels(sequelize);	//le pasamos la conexion como argumento
//sequelize.sync();	//sequelize va a agarrar los modelos que le pasamos y VA a CREAR
	//esa estructura de BD p/ c/ tabla (en este caso, solo users-pq la estamos
	//creandp manualmente a diferencia de products que lo hicimos en pg admin)

module.exports = sequelize;
