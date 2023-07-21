'use strict';
const { USER_TABLE, UserSchema } = require('./../models/user.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    /**   le pasamos la tabla, el campo o columna y el eschema de esa columna
     */
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
