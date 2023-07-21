const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');	//p/traer el modelo de la BD Users

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({  //favor fijarse que ahora la consulta la hacemos con OOP y sin la sintaxis SQL, esta viene del ORM
      include:['customer']
    });
      return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);  //buscamos el id y luego le aplicamos los cambios
    if (!user){
      throw boom.notFound("User Not Found");
    }
    return user ;
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);  //buscamos el id y luego le aplicamos los cambios
    if (!user){
      throw boom.notFound("Product Not Found");
    }
    const rta = await user.update(changes);

    return  rta;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);  //buscamos el id y luego lo borramos
    if (!user){
      throw boom.notFound("Product Not Found");
    }
    await user.destroy();
    return { id }};
  }


module.exports = UserService;
