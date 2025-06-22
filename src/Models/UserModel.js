const mongoose = require ("mongoose")

const Schema = mongoose.Schema;


const UserSchema = new Schema({

  cpf:{
    type: String,
    required: true,
    unique: true //CPF deve ser único
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true //Email também deve ser único
  },
  password:{
    type: String,
    required: true
  }
}, {timestamps: true});

const UserModel = mongoose.model("users" , UserSchema);
module.exports = UserModel;