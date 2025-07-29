import { Router } from "express";

import CadUserControllers from "../Controllers/CadUsersControllers";
import UserData from "../Middlewares/UserData";
import AuthorizeRoles from "../Middlewares/AuthorizeRoles";
import ProductControllers from "../Controllers/ProductControllers";
import ProductData from "../Middlewares/ProductsData";
import LoginUserController from "../Controllers/LoginUserController";
import AuthLoginData from "../Middlewares/AuthLoginData";
import CartController from "../Controllers/CartController";
import OrderController from "../Controllers/OrderController";
import * as ProductReviewController from "../Controllers/ProductReviewController";
import * as WishlistController from "../Controllers/WishlistController";


const routes = Router();

//todo: routes test
routes.get('/test', (req, res) => {
  res.json({ message: 'Conexão front + back funcionando 🎉' });
});

// Dashboard
routes.get("/dashboard", AuthLoginData, AuthorizeRoles('admin'), (req, res) => {
  res.send("Este é o Painel de ADM");
});

// Cadastro de Usuários
routes.post("/users", UserData, CadUserControllers.CadUserCreate); // público
routes.get('/users', AuthLoginData, CadUserControllers.CadUserList);
routes.get("/users/:id", AuthLoginData, CadUserControllers.CadUserListId);
routes.put("/users/:id", UserData, AuthLoginData, CadUserControllers.CadUserUpdate);
routes.delete("/users/:id", AuthLoginData, AuthorizeRoles('admin'), CadUserControllers.CadUserDelete);


// Autenticação de Login/Logout (users)
routes.post("/users/login", LoginUserController.login); // público
routes.post("/users/logout", AuthLoginData, (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso.' });
});


// Cadastro de Admin
routes.post("/admin", AuthLoginData, AuthorizeRoles('admin'), CadUserControllers.CadAdminCreate);

// Autenticação de Login/Logout (admin)
routes.post("/admin/login", LoginUserController.login);
routes.post("/admin/logout", AuthLoginData, (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso.' });
});


// Produtos
routes.post("/products", ProductData, AuthLoginData, AuthorizeRoles('admin'), ProductControllers.ProductCreate);
routes.get("/products", ProductControllers.ProductList); // público
routes.get("/products/:id", ProductControllers.ProductListId); // público
routes.put("/products/:id", AuthLoginData, AuthorizeRoles('admin'), ProductControllers.ProductUpdate);
routes.delete("/products/:id", AuthLoginData, AuthorizeRoles('admin'), ProductControllers.ProductDelete);


// Cart
routes.post("/cart", CartController.addItem); // público

// Pedidos (Order)
routes.post("/orders", AuthLoginData, OrderController.create);
routes.get("/orders", AuthLoginData, OrderController.getAll);
routes.get("/orders/:id", AuthLoginData, OrderController.getById);
routes.put("/orders/:id/pay", AuthLoginData, OrderController.markAsPaid);
routes.put("/orders/:id/deliver", AuthLoginData, OrderController.markAsDelivered);

// Avaliações de Produtos
routes.post("/reviews", AuthLoginData, ProductReviewController.createReview);
routes.get("/reviews/:productId", ProductReviewController.getReviewsByProduct); // público

// Lista de Desejos (Wishlist)
routes.post("/wishlist", AuthLoginData, WishlistController.addToWishlist);
routes.get("/wishlist", AuthLoginData, WishlistController.getWishlist);
routes.delete("/wishlist/:productId", AuthLoginData, WishlistController.removeFromWishlist);


export default routes;
