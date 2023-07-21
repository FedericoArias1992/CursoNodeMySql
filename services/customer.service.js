const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');	//p/traer el modelo de la BD Users

class CustomerService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data.user)  //en el schema definimos email y password como elementos del objeto user
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({  //favor fijarse que ahora la consulta la hacemos con OOP y sin la sintaxis SQL, esta viene del ORM
      include:['user']
    });
      return rta;
  }

  async findOne(id) {
    const Customer = await models.Customer.findByPk(id);  //buscamos el id y luego le aplicamos los cambios
    if (!Customer){
      throw boom.notFound("Product Not Found");
    }
    return Customer ;
  }

  async update(id, changes) {
    const Customer = await models.Customer.findByPk(id);  //buscamos el id y luego le aplicamos los cambios
    if (!Customer){
      throw boom.notFound("Product Not Found");
    }
    const rta = await Customer.update(changes);

    return  rta;
  }

  async delete(id) {
    const Customer = await models.Customer.findByPk(id);  //buscamos el id y luego lo borramos
    if (!Customer){
      throw boom.notFound("Product Not Found");
    }
    await Customer.destroy();
    return { id }};
  }

module.exports = CustomerService;
