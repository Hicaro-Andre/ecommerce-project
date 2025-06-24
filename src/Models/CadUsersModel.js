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

const CadUsersModel = mongoose.model("CadUsers" , UserSchema);
module.exports = CadUsersModel;