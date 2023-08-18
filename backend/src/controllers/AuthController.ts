import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Array para armazenar os tokens revogados
const tokenBlacklist: string[] = [];

export default {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await prisma.usuario.findFirst({
        where: {
          nomeUsuario: username,
        },
      });

      if (!user || !user.senhaUsuario) {
        return res.json({ error: true, message: 'Usuário não encontrado' });
      }

      if (password === user.senhaUsuario) {
        const accessToken = jwt.sign({ username: user.nomeUsuario, id: user.idUsuario }, 'secret_key'); // Use uma chave secreta mais segura
        res.json({ error: false, accessToken });
      } else {
        res.json({ error: true, message: 'Senha incorreta' });
      }
    } catch (error) {
      res.json({ error: true, message: error });
    }
  },

  async logout(req: Request, res: Response) {
    const { token } = req.body;

    if (token) {
      tokenBlacklist.push(token);
      res.json({ error: false, message: 'Token adicionado à lista negra com sucesso' });
    } else {
      res.json({ error: true, message: 'Token não fornecido' });

    }
  },

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.json({ error: true, message: 'Token não fornecido' });

    }

    if (tokenBlacklist.includes(token)) {
      return res.json({ error: true, message: 'Token inválido' });
    }

    try {
      jwt.verify(token, 'secret_key');
      next();
    } catch (error) {
      return res.json({ error: true, message: 'Token inválido' });

    }
  },
};