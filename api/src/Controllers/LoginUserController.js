const UserModel = require("../Models/CadUsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "sua_chave_secreta"; // ideal colocar em variável de ambiente

class LoginUserController {
  
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

      // Remove a senha do objeto retornado
      const { password: _, ...userData } = user.toObject();

      // Gera o token JWT
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          // pode incluir outras informações como role, se desejar
        },
        SECRET,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        user: userData,
        token: token, // envia o token aqui
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro ao fazer login." });
    }
  }
}

module.exports = new LoginUserController();
