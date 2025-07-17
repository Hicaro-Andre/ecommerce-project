import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | string;
  orderItems: any[];
  shippingAddress: any;
  paymentMethod: string;
  paymentResult?: any;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  status: "pendente" | "pago" | "processando" | "enviado" | "entregue" | "cancelado";
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  shippedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "CadUsers" },
    orderItems: [{ type: Object, required: true }],
    shippingAddress: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: { type: Object, default: {} },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendente", "pago", "processando", "enviado", "entregue", "cancelado"],
      default: "pendente",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    shippedAt: { type: Date },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
export default OrderModel;
