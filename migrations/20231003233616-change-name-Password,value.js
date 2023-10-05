'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('Users', 'Nombre_completo', 'Full_name'),
      queryInterface.renameColumn('Users', 'Nombre_de_usuario', 'Username'),
      queryInterface.renameColumn('Users', 'email', 'Email'),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('Users', 'Full_name', 'Nombre_completo'),
      queryInterface.renameColumn('Users', 'Username', 'Nombre_de_usuario'),
      queryInterface.renameColumn('Users', 'Email', 'email'),
    ]);  }
};
