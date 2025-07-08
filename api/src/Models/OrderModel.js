const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  //ID do usuário que fez o pedido.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  //Lista de produtos comprados, com quantidade, nome, preço e imagem.
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: String,
      quantity: Number,
      price: Number,
      image: String
    }
  ],
  //Endereço completo para entrega.
  shippingAddress: {
    address: { type: String, required: true },
    number: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  //Ex: "pix", "boleto", "cartão", "paypal"
  paymentMethod: {
    type: String,
    required: true
  },
  //Informações retornadas da API de pagamento.
  paymentResult: {  
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  //Soma do preço de todos os itens
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  //Valor do frete
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  //Imposto aplicado.
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  //Soma total = itens + frete + imposto.
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  //Se o pedido foi pago
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  //Data de pagamento
  paidAt: {
    type: Date
  },
  //Se o pedido foi entregue
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  //Data de entrega
  deliveredAt: {
    type: Date
  },
  //Situação do pedido: pendente, processando, enviado, entregue ou cancelado
  status: {
    type: String,
    enum: ["pendente", "processando", "enviado", "entregue", "cancelado"],
    default: "pendente"
  },
  //Criado/em atualização automático
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);