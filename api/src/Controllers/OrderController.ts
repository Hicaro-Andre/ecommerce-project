import { Request, Response } from "express";
import OrderModel from "../Models/OrderModel";

class OrderController {
  // Criar um novo pedido
  async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentResult,
      } = req.body;

      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Usuário não autenticado." });
        return;
      }

      if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ message: "O pedido está vazio." });
        return;
      }

      const newOrder = await OrderModel.create({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      res.status(201).json(newOrder);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Erro ao criar o pedido", error: err.message });
    }
  }

  // Buscar pedidos do usuário logado
  async getMyOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Usuário não autenticado." });
        return;
      }

      const orders = await OrderModel.find({ user: userId });
      res.status(200).json(orders);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Erro ao buscar pedidos", error: err.message });
    }
  }

  // Buscar todos os pedidos (admin)
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await OrderModel.find().populate("user", "name email");
      res.status(200).json(orders);
    } catch (err: any) {
      res
        .status(500)
        .json({
          message: "Erro ao buscar todos os pedidos",
          error: err.message,
        });
    }
  }

  // Marcar pedido como pago
  async markAsPaid(req: Request, res: Response): Promise<void> {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }

      order.isPaid = true;
      order.paidAt = new Date();
      order.status = "processando";
      order.paymentResult = req.body.paymentResult || {};

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Erro ao marcar como pago", error: err.message });
    }
  }

  // Marcar pedido como entregue
  async markAsDelivered(req: Request, res: Response): Promise<void> {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }

      order.isDelivered = true;
      order.deliveredAt = new Date();
      order.status = "entregue";

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Erro ao marcar como entregue", error: err.message });
    }
  }
  // Buscar pedido por ID (com detalhes)
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const order = await OrderModel.findById(id).populate(
        "user",
        "name email"
      );

      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
        return;
      }

      res.status(200).json(order);
    } catch (err: any) {
      res.status(500).json({
        message: "Erro ao buscar pedido",
        error: err.message,
      });
    }
  }
}

export default new OrderController();
