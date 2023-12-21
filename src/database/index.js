import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Student from '../models/Student';
import User from '../models/User';
import Image from '../models/Image';

const models = [Student, User, Image];

const connection = new Sequelize(databaseConfig);

const checkConnection = async () => {
  try {
    await connection.authenticate();
    console.log('Conexão estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

checkConnection();
