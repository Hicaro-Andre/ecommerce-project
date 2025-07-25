import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import CadUsersModel from "../Models/CadUsersModel";

class AuthController {
  // Envia link para redefinir a senha
  async forgotPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    try {
      const user = await CadUsersModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

      user.resetToken = token;
      user.resetTokenExpires = expires;
      await user.save();

      const link = `http://localhost:5173/reset-password?token=${token}`;
      console.log(`Link de redefinição enviado para ${user.email}: ${link}`);

      return res.json({ message: "Link de redefinição enviado para o e-mail." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao processar requisição." });
    }
  }

  // Redefine a senha
  async resetPassword(req: Request, res: Response): Promise<Response> {
    const { token, newPassword } = req.body;

    try {
      const user = await CadUsersModel.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: new Date() },
      });

      if (!user) {
        return res.status(400).json({ message: "Token inválido ou expirado." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;

      await user.save();

      return res.json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao redefinir a senha." });
    }
  }
}

export default new AuthController();
