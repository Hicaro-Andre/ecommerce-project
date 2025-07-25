import { Request, Response, NextFunction } from "express";
import CadUsersModel from "../Models/CadUsersModel";

export const CheckResetToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Token não fornecido" });
    return;
  }

  const user = await CadUsersModel.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    res.status(400).json({ message: "Token inválido ou expirado" });
    return;
  }

  req.body.user = user;
  next();
};

export default CheckResetToken;
