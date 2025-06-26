const ProductModel = require ("../Models/ProductModel")

class ProductControllers{

  // Criar usuário
  async ProductCreate(req,res){

    try {
      const createProduct = await ProductModel.create(req.body);
      return res.status(200).json(createProduct)
    } catch (error) {
      res.status(404).json({message: "Failed create Product"})
    }
  }

  async ProductList(req,res){

  }

  async ProductListId(req,res){

  }

  async ProductUpdate(req,res){

  }

  async ProductDelete(req,res){

  }
}

module.exports = new ProductControllers();