import Student from '../models/Student';
import Image from '../models/Image';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [
          ['id', 'DESC'],
          [Image, 'id', 'DESC'],
        ],
        include: {
          model: Image,
          attributes: ['url', 'filename', 'originalname'],
        },
      });
      return res.status(200).json({ lengthStudents: students.length, dataStudents: students });
    } catch (erro) {
      return res.status(500).json({ error: ['Erro ao listar todos Students'] });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['ID não enviado'] });
      const student = await Student.findByPk(req.params.id, {
        order: [[Image, 'id', 'DESC']],
        include: [
          {
            model: Image,
          },
        ],
      });
      if (!student) return res.status(404).json({ errors: ['Student não existe'] });
      const {
        id, nome, sobrenome, email, idade, altura,
      } = student;
      return res.json({
        id,
        nome,
        sobrenome,
        email,
        idade,
        altura,
        images: student.Images.map((image) => ({
          url: image.url,
          filename: image.filename,
          originalname: image.originalname,
        })),
      });
    } catch (erro) {
      return res.status(500).json({ error: ['Erro ao encontrar o Student'] });
    }
  }

  async store(req, res) {
    try {
        const novoStudent = await Student.create(req.body);
        const { id, nome, sobrenome, email, idade, altura, peso } = novoStudent;
        return res.json({ id, nome, sobrenome, email, idade, altura, peso });
    } catch (erro) {
        if (erro.name === 'SequelizeValidationError' || erro.name === 'SequelizeUniqueConstraintError') {
            const messages = erro.errors.map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        console.error(erro);
        return res.status(500).json({ errors: ['Erro interno no servidor'] });
    }
}


async update(req, res) {
  try {
      if (!req.params.id) {
          return res.status(400).json({ errors: ['ID não enviado'] });
      }

      const student = await Student.findByPk(req.params.id);
      if (!student) {
          return res.status(404).json({ errors: ['Student não encontrado.'] });
      }

      const novosDados = await student.update(req.body);
      const { id, nome, sobrenome, email, idade, altura, peso } = novosDados;
      return res.json({ id, nome, sobrenome, email, idade, altura, peso });
  } catch (erro) {
      if (erro.name === 'SequelizeValidationError' || erro.name === 'SequelizeUniqueConstraintError') {
          const messages = erro.errors.map(err => err.message);
          return res.status(400).json({ errors: messages });
      }
      console.error(erro);
      return res.status(500).json({ errors: ['Erro interno no servidor'] });
  }
}


  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['ID não enviado'] });
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ errors: ['Student não encotrado.'] });
      await student.destroy();
      return res.status(204).json({ message: 'Student deletado' });
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao excluir o Student'] });
    }
  }
}

export default new StudentController();
