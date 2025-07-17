const UserModel = require("../Models/CadUsersModel");

class CadUserControllers {

  //Criar usuário (user)
  async CadUserCreate(req, res) {
    try {
      const { cpf, name, email, password } = req.body;

      if (!cpf || !name || !email || !password) {
        return res.status(400).json({
          message: "Todos os campos (cpf, name, email, password) são obrigatórios",
        });
      }

      const userExists = await UserModel.findOne({ $or: [{ cpf }, { email }] });
      if (userExists) {
        return res.status(409).json({
          message: userExists.cpf === cpf ? "CPF já cadastrado" : "Email já cadastrado",
        });
      }

      const createUser = await UserModel.create({
        cpf,
        name,
        email,
        password, // 🔒 Hash feito pelo Model
        role: "user"
      });

      const userWithoutPassword = createUser.toObject();
      delete userWithoutPassword.password;

      return res.status(201).json(userWithoutPassword);

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  //Criar admin (admin)
  async CadAdminCreate(req, res) {
    try {
      const { cpf, name, email, password } = req.body;

      if (!cpf || !name || !email || !password) {
        return res.status(400).json({ message: "Campos obrigatórios faltando" });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const adminUser = await UserModel.create({
        cpf,
        name,
        email,
        password,
        role: "admin"
      });

      const userWithoutPassword = adminUser.toObject();
      delete userWithoutPassword.password;

      res.status(201).json({
        message: "Admin cadastrado com sucesso",
        user: userWithoutPassword
      });

    } catch (error) {
      console.error("Erro ao cadastrar admin:", error);
      res.status(500).json({ message: "Erro ao cadastrar admin" });
    }
  }

  //Listar todos usuários
  async CadUserList(req, res) {
    try {
      const listuser = await UserModel.find().select('-password');
      return res.status(200).json(listuser);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
  }

  //Listar usuário por ID
  async CadUserListId(req, res) {
    try {
      const { id } = req.params;
      const usersId = await UserModel.findById(id).select('-password');

      if (!usersId) return res.status(404).json({ message: "Usuário não encontrado." });

      return res.status(200).json(usersId);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ message: "Erro ao buscar usuário." });
    }
  }

  //Atualizar usuário
  async CadUserUpdate(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      await user.save();

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      return res.status(200).json({
        message: "Usuário atualizado com sucesso.",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
  }

  //Deletar usuário
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
