import { Request, Response } from "express";
import Cart from "../Models/CartModel";
import Product from "../Models/ProductModel";
import { Types } from "mongoose";

const CartController = {
  async addItem(req: Request, res: Response): Promise<void> {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity || quantity <= 0) {
        res.status(400).json({ message: "Dados inválidos" });
        return;
      }

      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      let cart = await Cart.findOne({ userId });

      if (cart) {
        const existingItem = cart.itens.find(
          (item) => item.productID.toString() === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.itens.push({
            productID: new Types.ObjectId(productId),
            quantity,
            priceAtPurchase: product.price,
          });
        }

        await cart.save();
      } else {
        cart = await Cart.create({
          userId,
          itens: [
            {
              productID: productId,
              quantity,
              priceAtPurchase: product.price,
            },
          ],
        });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },
};

export default CartController;
