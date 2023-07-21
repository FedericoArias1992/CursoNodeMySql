const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');	//p/traer el modelo de la BD Jornals

class JornalService {
  constructor() {}

  async create(data) {
    const newJornal = await models.Jornal.create(data);
    return newJornal;
  }

  async find() {
    const rta = await models.Jornal.findAll();	//favor fijarse que ahora la consulta la hacemos con OOP y sin la sintaxis SQL, esta viene del ORM
      return rta;
  }

  async findOne(id) {
    const Jornal = await models.Jornal.findByPk(id);  //buscamos el id y luego le aplicamos los cambios
    if (!Jornal){
      throw boom.notFound("Product Not Found");
    }
    return Jornal ;
  }

  async update(id, changes) {
    const Jornal = await models.Jornal.findByPk(id);  //buscamos el id y luego le aplicamos los cambios
    if (!Jornal){
      throw boom.notFound("Product Not Found");
    }
    const rta = await Jornal.update(changes);

    return  rta;
  }

  async delete(id) {
    const Jornal = await models.Jornal.findByPk(id);  //buscamos el id y luego lo borramos
    if (!Jornal){
      throw boom.notFound("Product Not Found");
    }
    await Jornal.destroy();
    return { id }};
  }


module.exports = JornalService;
