const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface) => {
    // Inserindo os alunos usando o método bulkInsert
    await queryInterface.bulkInsert('users', [
      {
        nome: 'admin1',
        email: 'admin1@example.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_At: new Date(),
        updated_At: new Date(),
      },
      {
        nome: 'admin2',
        email: 'admin2@example.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_At: new Date(),
        updated_At: new Date(),
      },
      {
        nome: 'admin3',
        email: 'admin3@example.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_At: new Date(),
        updated_At: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    // Removendo todos os users da tabela
    await queryInterface.bulkDelete('users', null, {});
  },
};
