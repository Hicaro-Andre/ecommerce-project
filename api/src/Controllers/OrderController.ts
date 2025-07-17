import { Request, Response } from 'express';
import OrderModel from '../Models/OrderModel';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  };
}

class OrderController {
  // Criar um novo pedido
  async create(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentResult, // opcional
      } = req.body;

      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "O pedido está vazio." });
      }

      if (!req.user?.id) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const newOrder = await OrderModel.create({
        user: req.user.id,
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      return res.status(201).json(newOrder);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar o pedido", error: err.message });
    }
  }

  // Buscar todos os pedidos do usuário logado
  async getMyOrders(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const orders = await OrderModel.find({ user: req.user.id });
      return res.status(200).json(orders);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao buscar seus pedidos", error: err.message });
    }
  }

  // Buscar todos os pedidos (admin)
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await OrderModel.find().populate("user", "name email");
      return res.status(200).json(orders);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao buscar todos os pedidos", error: err.message });
    }
  }

  // Atualizar status de pagamento manualmente
  async markAsPaid(req: Request, res: Response): Promise<Response> {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

      order.isPaid = true;
      order.paidAt = new Date();
      order.status = "processando";
      order.paymentResult = req.body.paymentResult || {};

      const updatedOrder = await order.save();
      return res.status(200).json(updatedOrder);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao marcar como pago", error: err.message });
    }
  }

// Atualizar
