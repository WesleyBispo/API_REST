import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({ attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'] });
      return res.status(200).json(students);
    } catch (erro) {
      console.log(typeof erro);
      return res.status(500).json({ error: ['Erro ao listar todos Students'] });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['ID não enviado'] });
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ errors: ['Student não existe'] });
      const {
        id, nome, sobrenome, email, idade, altura,
      } = student;
      return res.json({
        id, nome, sobrenome, email, idade, altura,
      });
    } catch (erro) {
      return res.status(500).json({ error: ['Erro ao encontrar o Student'] });
    }
  }

  async store(req, res) {
    try {
      const novoStudent = await Student.create(req.body);
      const {
        id, nome, sobrenome, email, idade, altura,
      } = novoStudent;
      return res.json({
        id, nome, sobrenome, email, idade, altura,
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({ errors: ['Erro ao criar o Student', erro.errors.map((err) => err.message)] });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['ID não enviado'] });
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ errors: ['Student não encotrado.'] });
      const novosDados = await student.update(req.body);
      const {
        id, nome, sobrenome, email, idade, altura,
      } = novosDados;
      return res.json({
        id, nome, sobrenome, email, idade, altura,
      });
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao atualizar o usuário', erro.errors.map((err) => err.message)] });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['ID não enviado'] });
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ errors: ['Student não encotrado.'] });
      await student.destroy();
      return res.status(204).json({ message: 'Student do deletado' });
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao excluir o Student'] });
    }
  }
}

export default new StudentController();
