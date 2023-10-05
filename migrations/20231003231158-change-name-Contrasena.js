'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'Contraseña', 'Password');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'Password', 'Contraseña');
  }
};
