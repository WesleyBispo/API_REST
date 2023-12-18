module.exports = {
  up: async (queryInterface) => {
    // Inserindo os alunos usando o método bulkInsert
    await queryInterface.bulkInsert('alunos', [
      {
        nome: 'João da Silva',
        sobrenome: 'Santos',
        email: 'joao.silva@example.com',
        idade: 20,
        peso: 75.0,
        altura: 1.75,
        created_At: new Date(),
        updated_At: new Date(),
      },
      {
        nome: 'Maria de Souza',
        sobrenome: 'Oliveira',
        email: 'maria.souza@example.com',
        idade: 25,
        peso: 60.0,
        altura: 1.68,
        created_At: new Date(),
        updated_At: new Date(),
      },
      {
        nome: 'Pedro Santos',
        sobrenome: 'Costa',
        email: 'pedro.costa@example.com',
        idade: 30,
        peso: 80.0,
        altura: 1.82,
        created_At: new Date(),
        updated_At: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    // Removendo todos os alunos da tabela
    await queryInterface.bulkDelete('alunos', null, {});
  },
};
