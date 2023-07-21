const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.models')//importamos para obtener la relacion con la key del usuario as a foreignKey en customer Table

const CUSTOMER_TABLE = 'customers';

const CustomerSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {                     //este es el campo para la ForeignKey
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {              //aca lo referenciamos a la tabla User
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',      //caso de hacer put/patch al usuario->cascade
    onDelete: 'SET NULL'      //caso de hacer delete al usario->Set Null
  }
}

class Customer extends Model {

  static associate(models) {    //aca definimos la ForeignKey desde el modelo de User
    this.belongsTo(models.User, {as: 'user'});    //al ponerlo asi, el customer pertenece a User, asi seria la relacion
    this.hasMany(models.Order, {                  //ademas nos permite anidar el user al CRUD de customer -> fijarse
      as: 'orders',                               //en el servicio: customer.service.js. Notar que tambien customer tiene una
      foreignKey:'customerId'                     //relacion one a muchas ordenes de compra
    });

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
