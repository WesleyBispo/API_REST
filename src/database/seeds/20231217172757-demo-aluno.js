/** @type {import('sequelize-cli').Migration} */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('alunos', [{
    nome: 'demo',
    sobrenome: 'demo',
    email: 'demoaluno@example.com',
    idade: 18,
    peso: 60,
    altura: 1.70,
    created_at: new Date(),
    updated_at: new Date(),
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('alunos', null, {}),
};
