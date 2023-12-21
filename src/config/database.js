require('dotenv').config();
module.exports = {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST || 'my_mysql',
  port: process.env.DATABASE_PORT || '3306',
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'escola',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
