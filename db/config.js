const { config } = require('../config/config');
//vamos a 'encriptar' el nombre de usuario y la contrasenha usando funcion encodeURIComponent():
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
	development: {
		url: URI,
		dialect:'mysql',
	},
	production:{
		url: URI,
		dialect:'mysql',
	}
}
