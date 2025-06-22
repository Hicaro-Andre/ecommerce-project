const UserModel = require("../Models/UserModel");

class UserController {
  
  // 👉 Criar usuário
  async userCreate(req, res) {
    try {
      const createUser = await UserModel.create(req.body);
      return res.status(201).json(createUser);
    } catch (error) {
      res.status(404).json({ message: "Failed create user" });
    }
  }

  // 👉 Listar todos os usuários
  async userList(req, res) {
    try {
      const listuser = await UserModel.find();
      return res.status(200).json(listuser);
    } catch (error) {
      return res.status(404).json({ message: "Failed to list users" });
    }
  }

  // 👉 Listar usuário por ID
  async userListId(req, res) {
    try {
      const { id } = req.params;

      const usersId = await UserModel.findById(id);

      if (!usersId) {
        return res.status(404).json({ message: "Users does no exists" });
      }
      return res.status(200).json(usersId);
    } catch (error) {
      return res.status(404).json({ message: "Failed to list users" });
    }
  }

  // 👉 Atualizar usuário por ID
  async userUpdate(req, res) {
    try {
      const { id } = req.params;

      await UserModel.findByIdAndUpdate(id, req.body);
      return res.status(200).json({ message: "User update sucess" });
    } catch (error) {
      return res.status(404).json({ message: "Failed user update" });
    }
  }

  // 👉 Deletar usuário por ID
  async userDelete(req, res) {
    try {
      const { id } = req.params;

      const userDelete = await UserModel.findByIdAndDelete(id);

      if (!userDelete) {
        return res.status(404).json({ message: "User does not exists" });
      }
      return res.status(200).json({ message: "User delete sucess" });
    } catch (error) {
      return res.status(404).json({ message: "Failed to delete" });
    }
  }
}

module.exports = new UserController();
