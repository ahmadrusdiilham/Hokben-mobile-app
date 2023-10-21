"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataUser = require("../data/users.json");
    dataUser.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });
    await queryInterface.bulkInsert("Users", dataUser);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
