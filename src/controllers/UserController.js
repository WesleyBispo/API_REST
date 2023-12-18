import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.status(201).json(novoUser);
    } catch (erro) {
      if (erro.errors) {
        return res.status(400).json({ errors: erro.errors.map((err) => err.message) });
      }
      return res.status(500).json({ errors: ['Erro interno'] });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao listar todos os usuários'] });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }
      return res.status(200).json(user);
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao buscar o usuário'] });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }
      const novosDados = await user.update(req.body);
      return res.status(200).json(novosDados);
    } catch (erro) {
      if (erro.errors) {
        return res.status(400).json({ errors: erro.errors.map((err) => err.message) });
      }
      return res.status(500).json({ errors: ['Erro ao atualizar o usuário'] });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }
      await user.destroy();
      return res.status(204).json();
    } catch (erro) {
      return res.status(500).json({ errors: ['Erro ao excluir o usuário'] });
    }
  }
}

export default new UserController();
