const OrderModel = require("../Models/OrderModel");

class OrderController {
  
  // Criar um novo pedido
  async create(req, res) {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentResult // opcional, só se já tiver o resultado do pagamento
      } = req.body;

      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "O pedido está vazio." });
      }

      const newOrder = await OrderModel.create({
        user: req.user.id, // ID do usuário autenticado
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      });

      return res.status(201).json(newOrder);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar o pedido", error: err.message });
    }
  }

  // Buscar todos os pedidos do usuário logado
  async getMyOrders(req, res) {
    try {
      const orders = await OrderModel.find({ user: req.user.id });
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar seus pedidos", error: err.message });
    }
  }

  // Buscar todos os pedidos (admin)
  async getAll(req, res) {
    try {
      const orders = await OrderModel.find().populate("user", "name email");
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar todos os pedidos", error: err.message });
    }
  }

  // Atualizar status de pagamento manualmente
  async markAsPaid(req, res) {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = "processando";
      order.paymentResult = req.body.paymentResult || {};

      const updatedOrder = await order.save();
      return res.status(200).json(updatedOrder);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao marcar como pago", error: err.message });
    }
  }

  // Atualizar status de entrega manualmente
  async markAsDelivered(req, res) {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = "entregue";

      const updatedOrder = await order.save();
      return res.status(200).json(updatedOrder);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao marcar como entregue", error: err.message });
    }
  }

  // Buscar pedido por ID (com detalhes)
  async getById(req, res) {
    try {
      const order = await OrderModel.findById(req.params.id).populate("user", "name email");

      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar pedido", error: err.message });
    }
  }
}

module.exports = new OrderController();
