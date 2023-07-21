require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',	//para marcae el entorno de produccion, si no existe la variable, entonces por defecto es development
	port: process.env.PORT || 3000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbName: process.env.DB_NAME,
};

module.exports = { config };
