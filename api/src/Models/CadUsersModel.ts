import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  cpf: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  resetToken?: string;
  resetTokenExpires?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

//todo: Middleware for sent password with hash for database
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

const CadUsersModel = mongoose.model<IUser>("CadUsers", UserSchema);
export default CadUsersModel;
