const UserModel = require("../Models/CadUsersModel");
const bcrypt = require("bcrypt");

class CadUserControllers {
  // Criar usuário
  async CadUserCreate(req, res) {
    try {
      const createUser = await UserModel.create(req.body);
      return res.status(201).json(createUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  // Login do usuário
  async CadUserLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "E-mail e senha são obrigatórios." });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Debug temporário
      console.log("Senha enviada:", password);
      console.log("Hash no banco:", user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
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

  // Listar todos os usuários
  async CadUserList(req, res) {
    try {
      const listuser = await UserModel.find();
      return res.status(200).json(listuser);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
  }

  // Listar usuário por ID
  async CadUserListId(req, res) {
    try {
      const { id } = req.params;
      const usersId = await UserModel.findById(id);

      if (!usersId) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.status(200).json(usersId);
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      return res.status(500).json({ message: "Erro ao buscar usuário." });
    }
  }

  // Atualizar usuário por ID
  async CadUserUpdate(req, res) {
    try {
      const { id } = req.params;

      await UserModel.findByIdAndUpdate(id, req.body);
      return res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
  }

  // Deletar usuário por ID
  async CadUserDelete(req, res) {
    try {
      const { id } = req.params;

      const userDelete = await UserModel.findByIdAndDelete(id);
      if (!userDelete) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ message: "Erro ao deletar usuário." });
    }
  }
}

module.exports = new CadUserControllers();
