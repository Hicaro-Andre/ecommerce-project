import { Request, Response, NextFunction } from 'express';

const usersData = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { name, email, password, cpf } = req.body;

  // Validação do Nome
  if (!name || name.length < 3) {
    return res.status(400).json({ message: "Name is required and must have at least 3 characters." });
  }

  // Validação do Email (formato simples)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "A valid email is required." });
  }

  // Validação da Senha (mínimo 1 caractere especial)
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!password || !specialCharRegex.test(password)) {
    return res.status(400).json({ message: "Password must contain at least one special character." });
  }

  // Validação do CPF (11 dígitos numéricos)
  const cpfRegex = /^\d{11}$/;
  if (!cpf || !cpfRegex.test(cpf)) {
    return res.status(400).json({ message: "CPF must contain exactly 11 numeric digits." });
  }

  next();
};

export default usersData;
