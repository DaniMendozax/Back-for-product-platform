'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'type_of_person', {
      type: Sequelize.ENUM('Administrador', 'Cliente'),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'type_of_person');
  }
};
