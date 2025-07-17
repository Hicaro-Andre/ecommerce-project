import { Request, Response, NextFunction } from 'express';

// Tipagem do user (caso não tenha ainda no seu projeto)
interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extendendo o Request para incluir o user
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

const authorizeRoles = (...rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado: permissão insuficiente' });
    }

    next();
  };
};

export default authorizeRoles;
