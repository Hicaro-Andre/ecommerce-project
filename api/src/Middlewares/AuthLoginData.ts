import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Declare global para adicionar user no Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

const AuthLoginData = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: 'Token não fornecido ou mal formatado (use Bearer)' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta') as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
    return;
  }
};

export default AuthLoginData;
