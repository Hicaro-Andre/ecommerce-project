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
  },
  role:{
    type: String,
    enum: ["user" , "admin"],
    default: "user"
  }
}, { timestamps: true });


//TODO => Middleware no model (pre save)
//É executado antes do documento ser salvo no banco de dados 
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  try {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const CadUsersModel = mongoose.model("CadUsers", UserSchema);
module.exports = CadUsersModel;
