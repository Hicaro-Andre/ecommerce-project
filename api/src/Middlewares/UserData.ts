import { Request, Response, NextFunction } from 'express';

const UserData = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password, cpf } = req.body;

  // Validação do Nome
  if (!name || name.length < 3) {
    res.status(400).json({ message: "Name is required and must have at least 3 characters." });
    return;
  }

  // Validação do Email (formato simples)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ message: "A valid email is required." });
    return;
  }

  // Validação da Senha (mínimo 1 caractere especial)
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!password || !specialCharRegex.test(password)) {
    res.status(400).json({ message: "Password must contain at least one special character." });
    return;
  }

  // Validação do CPF (11 dígitos numéricos)
  const cpfRegex = /^\d{11}$/;
  if (!cpf || !cpfRegex.test(cpf)) {
    res.status(400).json({ message: "CPF must contain exactly 11 numeric digits." });
    return;
  }

  next();
};

export default UserData;
