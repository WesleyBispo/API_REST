require('dotenv').config();
import jwt from 'jsonwebtoken';

class AuthenticationMiddleware {
  authenticate(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ errors: ['Faça o Login'] });
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ errors: ['Token não enviado'] });
    }

    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      if (payload.exp < Date.now() / 1000) {
        return res.status(401).json({ errors: ['Token expirado'] });
      }

      req.user = payload;
      return next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ errors: ['Token expirado'] });
      } if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ errors: ['Token inválido'] });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

export default new AuthenticationMiddleware();
