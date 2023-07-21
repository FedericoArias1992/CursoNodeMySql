//Aca van a estar toda la configuracion INICIAL y el setUp de los modelos
const { User, UserSchema } = require('./user.models');
const { Jornal, JornalSchema } = require('./jornal.models');
const { Customer, CustomerSchema } = require('./customer.models');
const { Product, ProductSchema } = require('./product.models');
const { Category, CategorySchema } = require('./category.models');
const { Order, OrderSchema } = require('./order.models');
const { OrderProduct, OrderProductSchema } = require('./order-product.models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));	//este init le indica que el objeto User debe tener el esquema UserSchema,
  //y le pasamos la configuracion del modelo estaticamente (no necesitamos crear una instancia de la config) products.init... y asi sucesivamente segun todas las tablas que necesitemos
  Jornal.init(JornalSchema, Jornal.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);          //aca se genera la asociacion
  Customer.associate(sequelize.models);          //aca se genera la asociacion
  Category.associate(sequelize.models);          //aca se genera la asociacion
  Product.associate(sequelize.models);          //aca se genera la asociacion
  Order.associate(sequelize.models);
}

module.exports = setupModels;
