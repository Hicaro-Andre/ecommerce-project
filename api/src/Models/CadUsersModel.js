const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Middleware que roda antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // só aplica hash se a senha mudou
  try {
    const salt = await bcrypt.genSalt(10); // mais seguro com salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const CadUsersModel = mongoose.model("CadUsers", UserSchema);
module.exports = CadUsersModel;
