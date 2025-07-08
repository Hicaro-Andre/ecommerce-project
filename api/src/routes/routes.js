const express = require("express");
const routes = express.Router();

// Controllers e Middlewares
const CadUserControllers = require("../Controllers/CadUsersControllers");
const UserData = require("../Middlewares/UserData.js");

const ProductControllers = require("../Controllers/ProductControllers");
const ProductData = require("../Middlewares/ProductsData.js");

const LoginUserController = require("../Controllers/LoginUserController.js");
const AuthLoginData = require('../Middlewares/AuthLoginData.js');

const CartController = require("../Controllers/CartController.js");

const OrderController = require("../Controllers/OrderController.js");

//Rotas de Cadastros de Usuários
routes.post("/users", UserData, CadUserControllers.CadUserCreate);
routes.get("/users", CadUserControllers.CadUserList);
routes.get("/users/:id", CadUserControllers.CadUserListId);
routes.put("/users/:id", UserData, CadUserControllers.CadUserUpdate);
routes.delete("/users/:id", CadUserControllers.CadUserDelete);

//Rotas de Login
routes.post("/users/login", LoginUserController.login);

//Rotas de Produtos
routes.post("/products", AuthLoginData, ProductData, ProductControllers.ProductCreate);
routes.get("/products", ProductControllers.ProductList);
routes.get("/products/:id", ProductControllers.ProductListId);
routes.put("/products/:id", ProductControllers.ProductUpdate);
routes.delete("/products/:id", ProductControllers.ProductDelete);

//Rota de Painel ADM (temporária)
routes.get("/dashboard", (req, res) => {
  res.send("Este é o Painel de ADM");
});

//Rotas do Carrinho
routes.post("/cart", CartController.addItem);

//Rotas de Pedidos (Order)
routes.post("/orders", OrderController.create); // Criar pedido
routes.get("/orders", OrderController.getAll); // Listar todos
routes.get("/orders/:id", OrderController.getById); // Buscar por ID
routes.put("/orders/:id/pay", OrderController.markAsPaid); // Marcar como pago
routes.put("/orders/:id/deliver", OrderController.markAsDelivered); // Marcar como entregue

module.exports = routes;
