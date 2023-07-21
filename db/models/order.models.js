const{ Model, DataTypes, Sequelize }=require('sequelize');
const{ CUSTOMER_TABLE }=require('./customer.models');  //impoetamos para hacer la asociacion

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	customerId: {
		field: 'customer_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		References: {
			model: CUSTOMER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
  total: {    //para calcular virtualmente un total de la orden de compra PARA todos los items dentro de la Orden
    type:DataTypes.VIRTUAL,
    get(){
      if (this.items.length > 0) {        //aca this is orders
        return this.items.reduce((total, item)=> {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
    }
  }
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
			as: 'customer',
		});
    this.belongsToMany(models.Product, {
      as:'items',
      through: models.OrderProduct,    //es relacion muchos a muchos, la relacion la resuelve atraves (through) la tabla
      foreignKey:'orderId',
      otherKey:'productId',
    })
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
