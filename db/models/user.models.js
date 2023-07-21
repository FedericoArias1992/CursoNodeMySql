//dentro vamos a definir la estructura de la BD de usuarios:
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';	//definimos el nombre de la tabla

const UserSchema = {		//definimos el schema de la BD (Distinto a Joi->usado para validacion de datos para hacer las consultas)
	id:{			//este es el eschema de creacion de la BD
		allowNull:false,
		autoIncrement: true,
		primaryKey:true,
		type: DataTypes.INTEGER
	},

	  email: {
	    allowNull: false,
	    type: DataTypes.STRING,
	    unique: true,	//de esta manera limitamos que el email sea unico por usuario
	  },

	  password: {
      allowNull: false,
      type: DataTypes.STRING,
	  },

	  role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
      },

	  createdAt: {		//para guardar el momento en el que se registra la persona
	  allowNull: false,
	  type: DataTypes.DATE,
	  field: 'created_at',	//es buena practica que en JS: Camel case y BD:Snake case
	  defaultValue: Sequelize.NOW,
	  },
};

//Vamos a definir una clase (gracias a Sequelize es OOP) con nuestro modelo para extender
//las propiedades de sequelize para manipular la BD
//nos va a permitir usar metodos como findAll, destroy, findByPrimaryKey, etc que facilita
//el trabajo con BD
class User extends Model {
	static associate(models){	//static: no necesito declarar al objeto para que pueda heradar los metodos de Model
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey:'userId'
    });
	}
	static config(sequelize){
		return {
		      sequelize,
		      tableName: USER_TABLE,
		      modelName: 'User',	//asi es como se llamara el modelo p/ BD SQL
		      timestamps: false,
		};
	}
}

module.exports = { USER_TABLE, UserSchema, User };
