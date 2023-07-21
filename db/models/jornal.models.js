//dentro vamos a definir la estructura de la BD de usuarios:
const { Model, DataTypes } = require('sequelize');

const JORNAL_TABLE = 'jornal';	//definimos el nombre de la tabla

const JornalSchema = {		//definimos el schema de la BD (Distinto a Joi->usado para validacion de datos para hacer las consultas)
	id:{			//este es el eschema de creacion de la BD
		allowNull:false,
		autoIncrement: true,
		primaryKey:true,
		type: DataTypes.INTEGER
	},

	fecha: {
	  allowNull: false,
	  type: DataTypes.DATE,
	},

  Sucursal: {
	  allowNull: false,
	  type: DataTypes.STRING,
	},

  Operario_Fijo: {
	  allowNull: false,
	  type: DataTypes.STRING,
	  },

  Remplazo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  Motivo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  Hora_ingreso: {
    allowNull: false,
    type: DataTypes.TIME,
  },
  Hora_salida: {
    allowNull: false,
    type: DataTypes.TIME,
  },
  Horas_pagar: {
    allowNull: false,
    type: DataTypes.TIME,
  },
  Monto_pagar:{
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  Bono_adicional:{
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  Comentario:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  estado_pago:{
    allowNull: false,
    type: DataTypes.STRING,
  }
};

//Vamos a definir una clase (gracias a Sequelize es OOP) con nuestro modelo para extender
//las propiedades de sequelize para manipular la BD
//nos va a permitir usar metodos como findAll, destroy, findByPrimaryKey, etc que facilita
//el trabajo con BD
class Jornal extends Model {
	static associate(){	//static: no necesito declarar al objeto para que pueda heradar los metodos de Model
		//to be continued...
	}
	static config(sequelize){
		return {
		      sequelize,
		      tableName: JORNAL_TABLE,
		      modelName: 'Jornal',	//asi es como se llamara el modelo p/ BD SQL
		      timestamps: false,
		};
	}
}

module.exports = { JORNAL_TABLE, JornalSchema, Jornal };
