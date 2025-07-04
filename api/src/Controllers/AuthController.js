const UserModel = require("../Models/CadUsersModel");
const bcrypt = require("bcrypt");

class AuthController {
  
  
  async login(req, res) {
    
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

      // Remover a senha do retorno
      const { password: _, ...userData } = user.toObject();

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        user: userData,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro ao fazer login." });
    }
  }
}

module.exports = new AuthController();
