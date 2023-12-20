import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
require('dotenv').config();

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não cadastrado.'],
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({
          errors: ['Senha incorreta. Tente novamente.'],
        });
      }

      // Implementar a lógica de geração do token aqui
      const { id } = user;
      const payload = {
        id,
        email,
      };
      const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.json({
        token,
        msg: 'Token gerado com sucesso',
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        errors: ['Ocorreu um erro durante a autenticação. Tente novamente mais tarde.'],
      });
    }
  }
}

export default new TokenController();
