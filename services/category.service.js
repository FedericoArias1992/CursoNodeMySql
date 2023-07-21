const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll({  //favor fijarse que ahora la consulta la hacemos con OOP y sin la sintaxis SQL, esta viene del ORM
      include:['products']
    });
    return rta;
  }

  async findOne(id) {
    const rta = await models.Category.findByPk(id,{  //favor fijarse que ahora la consulta la hacemos con OOP y sin la sintaxis SQL, esta viene del ORM
      include:['products']
    });
    if (!rta){
      throw boom.notFound("Category Not Found");
    }
    return rta;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
