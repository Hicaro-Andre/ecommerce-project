import { Request, Response } from 'express';
import UserModel from '../Models/CadUsersModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

class LoginUserController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      // Remove a senha do objeto retornado
      const userData = user.toObject();
      delete userData.password;

      // Gera o token JWT
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        SECRET,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        user: userData,
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro ao fazer login." });
    }
  }
}

export default new LoginUserController();
