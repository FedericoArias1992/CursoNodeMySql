//const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
//const getConnection = require ('../libs/postgres');
//const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');
//const setupModels = require('../db/models');
const { models } = require('./../libs/sequelize')
const { Op } = require("sequelize"); //este es para las queries especiales, en nuestro caso filtrar por rango de precios

class ProductsService {

  constructor(){
  //  this.products = [];
  //  this.generate();
  }

  async create(data) {
    const products = await models.Product.create(data);
    return products;
  }

  async find(query) {
    const options = {
      include: ['category'],   //para mostrar la categoria si o si pero es un parametro
      where:{}         //para filtrar el precio, lo dejamos vacio por si se manda el filtro por query params (en la url)
    };
    const { limit, offset } = query;   //si se pasan el limit y el offset entonces los agregamos al parametro del servicio
    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }
    const { price } = query;
    if (price){
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max){
      options.where.price = {
        [Op.between]: [price_min, price_max]
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const query = `SELECT * FROM tasks WHERE id = ${id}`;//generamos la conexion a postgres
    const [rta] = await sequelize.query(query);
    //const product = this.products.find(item => item.id === id);
    if (!rta) {
      throw boom.notFound('product not found');
    }
    if (id.isBlock) {
      throw boom.conflict('product is block');
    }
    return rta;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const query = `DELETE FROM tasks WHERE id = ${id}`;
    const rta = await this.pool.query(query);
    if (!rta) {
      throw boom.notFound('product not found');
    }
    return rta;
  }

}

module.exports = ProductsService;
