const { Router } = require ("express")

const CadUserControllers = require ("../Controllers/CadUsersControllers");
const CadUserData = require('../Middlewares/CadUsersData');



const routes = Router();

routes.get("/index" , (req , res) => {
  return res.status(200).json({message: "Server is on..."})
});


// 🔥 Rotas de Cadastros de Usuários
routes.post("/users" , CadUserData , CadUserControllers.CadUserCreate);
routes.get("/users" , CadUserControllers.CadUserList);
routes.get("/users/:id" , CadUserControllers.CadUserListId);
routes.put("/users/:id" , CadUserControllers.CadUserUpdate);
routes.delete("/users/:id" , CadUserControllers.CadUserDelete);





module.exports = routes;