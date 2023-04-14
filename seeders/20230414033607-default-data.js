'use strict';

const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const userId = await queryInterface.bulkInsert('Users', [{
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      await queryInterface.bulkInsert('Todos', Array.from({ length: 10 }, (element, index) => {
        return { name: `name-${index}`, userId, createdAt: new Date(), updatedAt: new Date() }
      }))
    } catch (err) {
      console.log(err)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Todos', null, {})
      await queryInterface.bulkDelete('Users', null, {})
    } catch (err) {
      console.log(err)
    }
  }
};
