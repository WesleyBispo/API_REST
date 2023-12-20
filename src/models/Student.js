import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email já existe',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido',
            },
          },
        },
        idade: Sequelize.INTEGER,
        peso: Sequelize.FLOAT,
        altura: Sequelize.FLOAT,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Image, { foreignKey: 'student_id' });
  }
}
