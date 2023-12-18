import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    } catch (erro) {
      res.status(400).json({
        errors: erro.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (erro) {
      res.json({
        errors: ['Erro ao listar todos os usuários'],
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.json(user);
    } catch (erro) {
      res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({
          errors: ['ID não definido'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      res.status(200).json(novosDados);
    } catch (erro) {
      res.status(400).json({
        errors: erro.errors.map((err) => err.message),
      });
    }
  }

  // Delete

  async delete(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({ errors: ['ID não defindo'] });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      res.json(user);
    } catch (erro) {
      res.status(400).json({
        errors: erro.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
