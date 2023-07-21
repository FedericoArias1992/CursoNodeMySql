const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.models')//importamos para obtener la relacion con la key del order as a foreignKey en customer Table
const { PRODUCT_TABLE } = require('./product.models')//importamos para obtener la relacion con la key del product as a foreignKey en customer Table


const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  orderId: {                     //este es el campo para la ForeignKey
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {              //aca lo referenciamos a la tabla User
      model: ORDER_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',      //caso de hacer put/patch al usuario->cascade
    //onDelete: 'SET NULL'      //caso de hacer delete al usario->Set Null
  },
  productId: {                     //este es el campo para la ForeignKey
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {              //aca lo referenciamos a la tabla User
      model: PRODUCT_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',      //caso de hacer put/patch al usuario->cascade
    //onDelete: 'SET NULL'      //caso de hacer delete al usario->Set Null
  },
  amount:{
    field: 'amount',
    allowNull:false,
    type: DataTypes.INTEGER,
  },
}

class OrderProduct extends Model {

  static associate() {    //aca definimos la ForeignKey desde el modelo de User
    //this.belongsTo(models.User, {as: 'user'});    //al ponerlo asi, el customer pertenece a User, asi seria la relacion
    //this.hasMany(models.Order, {                  //ademas nos permite anidar el user al CRUD de customer -> fijarse
    //  as: 'orders',                               //en el servicio: customer.service.js. Notar que tambien customer tiene una
    //  foreignKey:'customerId'                     //relacion one a muchas ordenes de compra
    //});

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
