import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.status(201).json({ id, nome, email });
    } catch (erro) {
      if (erro.errors) {
        return res.status(400).json({ errors: ['Erro ao criar User', erro.errors.map((err) => err.message)] });
      }
      return res.status(500).json({ errors: ['Erro interno'] });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.status(200).json(users);
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao listar todos os usuários'] });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }
      const { id, nome, email } = user;
      return res.status(200).json({ id, nome, email });
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao buscar o usuário'] });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }
      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.status(200).json({ id, nome, email });
    } catch (erro) {
      if (erro.errors) {
        return res.status(400).json({ errors: erro.errors.map((err) => err.message) });
      }
      return res.status(500).json({ errors: ['Erro ao atualizar o usuário', erro.error.map((err) => err.message)] });
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }
      await user.destroy();
      return res.status(204).json({ msg: 'Usuário do deletado' });
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao excluir o usuário'] });
    }
  }
}

export default new UserController();
