"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Items", "MongoId", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Items", "MongoId");
  },
};
