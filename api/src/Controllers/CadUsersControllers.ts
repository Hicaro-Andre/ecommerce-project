
import { Request, Response } from 'express';
import UserModel from '../Models/CadUsersModel';

class CadUserControllers {

  //todo: create user
  static async CadUserCreate(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, name, email, password } = req.body;

      if (!cpf || !name || !email || !password) {
        res.status(400).json({
          message: "Todos os campos (cpf, name, email, password) são obrigatórios",
        });
        return;
      }

      const userExists = await UserModel.findOne({ $or: [{ cpf }, { email }] });
      if (userExists) {
        res.status(409).json({
          message: userExists.cpf === cpf ? "CPF já cadastrado" : "Email já cadastrado",
        });
        return;
      }

      const createUser = await UserModel.create({
        cpf,
        name,
        email,
        password,
        role: "user",
      });

      const { password: _, ...userWithoutPassword } = createUser.toObject();

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  //todo: create admin
  static async CadAdminCreate(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, name, email, password } = req.body;

      if (!cpf || !name || !email || !password) {
        res.status(400).json({ message: "Campos obrigatórios faltando" });
        return;
      }

      const existingUser = await UserModel.findOne({ $or: [{ cpf }, { email }] });
      if (existingUser) {
        res.status(400).json({
          message: existingUser.cpf === cpf ? "CPF já cadastrado" : "Email já cadastrado",
        });
        return;
      }

      const adminUser = await UserModel.create({
        cpf,
        name,
        email,
        password,
        role: "admin",
      });

      const { password: _, ...userWithoutPassword } = adminUser.toObject();

      res.status(201).json({
        message: "Admin cadastrado com sucesso",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Erro ao cadastrar admin:", error);
      res.status(500).json({ message: "Erro ao cadastrar admin" });
    }
  }


  //todo: list all users
  static async CadUserList(req: Request, res: Response): Promise<void> {
    try {
      const listuser = await UserModel.find().select('-password');
      res.status(200).json(listuser);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ message: "Erro ao listar usuários" });
    }
  }

  //todo: list user by ID
  static async CadUserListId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id).select('-password');

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ message: "Erro ao buscar usuário." });
    }
  }

  //todo: update user
  static async CadUserUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await UserModel.findById(id);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;

      await user.save();

      const { password: _, ...userWithoutPassword } = user.toObject();

      res.status(200).json({
        message: "Usuário atualizado com sucesso.",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
  }

  //todo: delete users
  static async CadUserDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userDelete = await UserModel.findByIdAndDelete(id);

      if (!userDelete) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ message: "Erro ao deletar usuário." });
    }
  }

}

export default CadUserControllers;
