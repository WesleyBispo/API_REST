require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'escola',
  timezone: 'America/Sao_Paulo',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_At',
    updatedAt: 'updated_At',

  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',

};
