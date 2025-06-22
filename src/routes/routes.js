const { Router } = require ("express")

const UserController = require ("../Controllers/UserController");
const validateUserData = require('../Middlewares/validateUserData');


const ProductController = require("../Controllers/ProductController")
const CategoryController = require("../Controllers/CategoryController");

const routes = Router();

routes.get("/index" , (req , res) => {
  return res.status(200).json({message: "Server is on..."})
});


// 🔥 User Routes
routes.post("/users" ,validateUserData, UserController.userCreate );
routes.get("/users" , UserController.userList);
routes.get("/users/:id" , UserController.userListId);
routes.put("/users/:id" , UserController.userUpdate);
routes.delete("/users/:id" , UserController.userDelete);


routes.post("/products" , ProductController.productCreate);
routes.get("/products" , ProductController.productList);
routes.get("/products/:id" , ProductController.productListId);
routes.put("/products/:id" , ProductController.productUpdate);
routes.delete("/products/:id" , ProductController.productDelete);

routes.post("/category" , CategoryController.categoryCreate);
routes.get("/category" , CategoryController.categoryList);
routes.get("/category/:id" , CategoryController.categoryListId);
routes.put("/category/:id" , CategoryController.categoryUpdate);
routes.delete("/category/:id" , CategoryController.categoryDelete);


module.exports = routes;