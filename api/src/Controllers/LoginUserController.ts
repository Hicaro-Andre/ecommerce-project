import { Request, Response } from 'express';
import UserModel from '../Models/CadUsersModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "chave-secreta";

class LoginUserController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Senha incorreta." });
        return;
      }

      const { password: _, ...userData } = user.toObject();

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        SECRET,
        { expiresIn: "2h" }
      );

      res.status(200).json({
        message: "Login realizado com sucesso.",
        user: userData,
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro ao fazer login." });
    }
  }

}

export default new LoginUserController();