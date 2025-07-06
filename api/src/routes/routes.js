const express = require ("express")
const routes = express.Router();

//
const CadUserControllers = require ("../Controllers/CadUsersControllers");
const UserData = require ("../Middlewares/UserData.js")
//
const ProductControllers = require("../Controllers/ProductControllers");
const ProductData = require ("../Middlewares/ProductsData.js");
//
const LoginUserController = require ("../Controllers/LoginUserController.js");

const AuthLoginData = require('../Middlewares/AuthLoginData.js');



//Rotas de Cadastros de Usuários
routes.post("/users" , UserData , CadUserControllers.CadUserCreate);
routes.get("/users" , CadUserControllers.CadUserList);
routes.get("/users/:id" , CadUserControllers.CadUserListId);
routes.put("/users/:id" , UserData, CadUserControllers.CadUserUpdate);
routes.delete("/users/:id" , CadUserControllers.CadUserDelete);

//Rotas de Login
routes.post("/users/login" , LoginUserController.login);

//Rotas de Cadastros de Produtos
routes.post("/products", AuthLoginData, ProductData, ProductControllers.ProductCreate);
routes.get("/products" , ProductControllers.ProductList);
routes.get("/products/:id" , ProductControllers.ProductListId);
routes.put("/products/:id" , ProductControllers.ProductUpdate);
routes.delete("/products/:id" , ProductControllers.ProductDelete );



module.exports = routes;