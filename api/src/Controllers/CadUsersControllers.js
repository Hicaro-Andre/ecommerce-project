const UserModel = require("../Models/CadUsersModel");

class CadUserControllers {
  // Criar usuário (público) - role forçado para "user"
  async CadUserCreate(req, res) {
    try {
      const { cpf, name, email, password } = req.body; // Use os mesmos nomes do Model

      // Validação dos campos obrigatórios
      if (!cpf || !name || !email || !password) {
        return res.status(400).json({
          message:
            "Todos os campos (cpf, name, email, password) são obrigatórios",
        });
      }

      // Verifica se CPF ou email já existem
      const userExists = await UserModel.findOne({ $or: [{ cpf }, { email }] });
      if (userExists) {
        return res.status(409).json({
          message:
            userExists.cpf === cpf
              ? "CPF já cadastrado"
              : "Email já cadastrado",
        });
      }

      // O hash da senha já é feito automaticamente pelo pre('save') no Model
      const createUser = await UserModel.create({
        cpf,
        name,
        email,
        password, // Será automaticamente hasheado pelo Mongoose middleware
        role: "user", // Garante o valor padrão
      });

      // Remove a senha do objeto retornado por segurança
      const userWithoutPassword = createUser.toObject();
      delete userWithoutPassword.password;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário" });
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

      // Segurança: não permitir atualização do campo "role"
      const { nome, email, senha } = req.body;

      await UserModel.findByIdAndUpdate(id, { nome, email, senha });
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso." });
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
