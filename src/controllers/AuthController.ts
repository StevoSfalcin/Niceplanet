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
        return res.status(400).send('Usuário não encontrado');
      }

      if (password === user.senhaUsuario) {
        const accessToken = jwt.sign({ username: user.nomeUsuario, id: user.idUsuario }, 'secret_key'); // Use uma chave secreta mais segura
        res.json({ accessToken });
      } else {
        res.status(401).send('Senha incorreta');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  async logout(req: Request, res: Response) {
    const { token } = req.body;

    if (token) {
      tokenBlacklist.push(token);
      res.status(200).send('Token adicionado à lista negra com sucesso');
    } else {
      res.status(400).send('Token não fornecido');
    }
  },

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send('Token não fornecido');
    }

    if (tokenBlacklist.includes(token)) {
      return res.status(401).send('Token inválido');
    }

    try {
      jwt.verify(token, 'secret_key');
      next();
    } catch (error) {
      res.status(401).send('Token inválido');
    }
  },
};