const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
	constructor() {
	}

	async create(data) {
		const newOrder = await models.Order.create(data);
		return newOrder;
	}

	async find() {
		return [];
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{                   //esto es lo + significativo der clase, podemos en el mismo endpoint mostrar la orden de compra
					association: 'customer',  //el usuario y el customer
					include: ['user'],
				},
        'items',
			],
		});
    if (!order) {
      throw boom.notFound('Order not found');
    }
		return order;
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

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
		return newItem;
  }
}

module.exports = OrderService;
