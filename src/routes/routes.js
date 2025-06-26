
const express = require ("express")
const routes = express.Router();

//
const CadUserControllers = require ("../Controllers/CadUsersControllers");
const CadUserData = require('../Middlewares/CadUsersData');
//
const ProductControllers = require("../Controllers/ProductControllers");



// Rotas de Cadastros de Usuários
routes.post("/users" , CadUserData , CadUserControllers.CadUserCreate);
routes.get("/users" , CadUserControllers.CadUserList);
routes.get("/users/:id" , CadUserControllers.CadUserListId);
routes.put("/users/:id" , CadUserControllers.CadUserUpdate);
routes.delete("/users/:id" , CadUserControllers.CadUserDelete);

// Rotas de Cadastros de Produtos
routes.post("/products" , ProductControllers.ProductCreate)



module.exports = routes;