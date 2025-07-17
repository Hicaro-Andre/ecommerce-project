const express = require("express");
const routes = express.Router();

const CadUserControllers = require("../Controllers/CadUsersControllers");
const UserData = require("../Middlewares/UserData.js");
const AuthorizeRoles = require ("../Middlewares/AuthorizeRoles.js")
const ProductControllers = require("../Controllers/ProductControllers");
const ProductData = require("../Middlewares/ProductsData.js");
const LoginUserController = require("../Controllers/LoginUserController.js");
const AuthLoginData = require('../Middlewares/AuthLoginData.js');
const CartController = require("../Controllers/CartController.js");
const OrderController = require("../Controllers/OrderController.js");
const ProductReviewController = require("../Controllers/ProductReviewController.js");
const WishlistController = require("../Controllers/WishlistController.js");



//Cadastro de Usuários
routes.post("/users", UserData, CadUserControllers.CadUserCreate);//endpoint public
routes.get('/users', AuthLoginData, AuthorizeRoles('admin'), CadUserControllers.CadUserList);
routes.get("/users/:id", AuthLoginData, CadUserControllers.CadUserListId);
routes.put("/users/:id", UserData, AuthLoginData, CadUserControllers.CadUserUpdate);
routes.delete("/users/:id", AuthLoginData, AuthorizeRoles('admin'), CadUserControllers.CadUserDelete);

//Cadastro de Admin
routes.post("/users/admin", AuthLoginData, AuthorizeRoles('admin'), CadUserControllers.CadAdminCreate);

//Rotas de Login/Logout
routes.post("/users/login", LoginUserController.login);//endpoint public
routes.post("/users/logout" , AuthLoginData, (req, res)=> {
  res.status(200).json({ message: 'Logout realizado com sucesso.' });
})

//Produtos
routes.post("/products", ProductData, AuthLoginData, AuthorizeRoles('admin'), ProductControllers.ProductCreate);
routes.get("/products", ProductControllers.ProductList);//endpoint public
routes.get("/products/:id", ProductControllers.ProductListId);//endpoint public
routes.put("/products/:id", AuthLoginData, AuthorizeRoles('admin'), ProductControllers.ProductUpdate);
routes.delete("/products/:id", AuthLoginData, AuthorizeRoles('admin'), ProductControllers.ProductDelete);

//Dashboard
routes.get("/dashboard", AuthLoginData, AuthorizeRoles('admin'), (req, res) => {
  res.send("Este é o Painel de ADM");
});

//Cart
routes.post("/cart", CartController.addItem);//endpoint public

//Pedidos (Order)
routes.post("/orders", AuthLoginData, OrderController.create);
routes.get("/orders", AuthLoginData, OrderController.getAll);
routes.get("/orders/:id", AuthLoginData, OrderController.getById);
routes.put("/orders/:id/pay", AuthLoginData, OrderController.markAsPaid);
routes.put("/orders/:id/deliver", AuthLoginData, OrderController.markAsDelivered);

//Avaliações de Produtos
routes.post("/reviews", AuthLoginData, ProductReviewController.createReview);
routes.get("/reviews/:productId", ProductReviewController.getReviewsByProduct);//endpoint public

//Lista de Desejos (Wishlist)
routes.post("/wishlist", AuthLoginData, WishlistController.addToWishlist);
routes.delete("/wishlist/:productId", AuthLoginData, WishlistController.removeFromWishlist);
routes.get("/wishlist", AuthLoginData, WishlistController.getWishlist);

module.exports = routes;
