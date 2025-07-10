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

// Novos Controllers
const ProductReviewController = require("../Controllers/ProductReviewController.js");
const WishlistController = require("../Controllers/WishlistController.js");


// 📦 Rotas de Cadastro de Usuários
routes.post("/users", UserData, CadUserControllers.CadUserCreate);
routes.get("/users", CadUserControllers.CadUserList);
routes.get("/users/:id", CadUserControllers.CadUserListId);
routes.put("/users/:id", UserData, CadUserControllers.CadUserUpdate);
routes.delete("/users/:id", CadUserControllers.CadUserDelete);

// 🔐 Rotas de Login
routes.post("/users/login", LoginUserController.login);

// 🛍️ Rotas de Produtos
routes.post("/products", AuthLoginData, ProductData, ProductControllers.ProductCreate);
routes.get("/products", ProductControllers.ProductList);
routes.get("/products/:id", ProductControllers.ProductListId);
routes.put("/products/:id", ProductControllers.ProductUpdate);
routes.delete("/products/:id", ProductControllers.ProductDelete);

// 📊 Painel ADM (temporário)
routes.get("/dashboard", (req, res) => {
  res.send("Este é o Painel de ADM");
});

// 🛒 Rotas do Carrinho
routes.post("/cart", CartController.addItem);

// 📦 Rotas de Pedidos (Order)
routes.post("/orders", OrderController.create);
routes.get("/orders", OrderController.getAll);
routes.get("/orders/:id", OrderController.getById);
routes.put("/orders/:id/pay", OrderController.markAsPaid);
routes.put("/orders/:id/deliver", OrderController.markAsDelivered);

// ⭐ Rotas de Avaliações de Produtos
routes.post("/reviews", AuthLoginData, ProductReviewController.createReview);
routes.get("/reviews/:productId", ProductReviewController.getReviewsByProduct);

// 💖 Rotas de Lista de Desejos (Wishlist)
routes.post("/wishlist", AuthLoginData, WishlistController.addToWishlist);
routes.delete("/wishlist/:productId", AuthLoginData, WishlistController.removeFromWishlist);
routes.get("/wishlist", AuthLoginData, WishlistController.getWishlist);

module.exports = routes;
