const ProductModel = require("../Models/ProductModel");

class ProductControllers {
  
  //Criar Product
  async ProductCreate(req, res) {
    try {
      const createProduct = await ProductModel.create(req.body);
      return res.status(200).json(createProduct);
    } catch (error) {
      res.status(404).json({ message: "Failed create Product" });
    }
  }

  // Listar todos os products
  async ProductList(req, res) {
    try {
      const listproduct = await ProductModel.find();
      return res.status(200).json(listproduct);
    } catch (error) {
      return res.status(404).json({ message: "Failed to list Product" });
    }
  }

  // Listar usuário por ID
  async ProductListId(req, res) {
    try {
      const { id } = req.params;

      const productsId = await ProductModel.findById(id);

      if (!productsId) {
        return res.status(404).json({ message: "Products does no exits" });
      }
      res.status(200).json(productsId);
    } catch (error) {
      return res.status(404).json({ message: "Failed to list products" });
    }
  }

  // Atualizar produto por ID
  async ProductUpdate(req, res) {
    try {
      const { id } = req.params;

      await ProductModel.findByIdAndUpdate(id, req.body);
      return res.status(200).json({ message: "Product update success" });
    } catch (error) {
      return res.status(404).json({ message: "Failed Product update" });
    }
  }

  // Deletar products por ID
  async ProductDelete(req, res) {
    try {
      const { id } = req.params;

      const ProductDelete = await ProductModel.findByIdAndDelete(id);

      if (!ProductDelete) {
        return res.status(404).json({ message: "Products does not exists" });
      }
      return res.status(200).json({ message: "Product delete success" });
    } catch (error) {
      return res.status(404).json({ message: "Failed to delete" });
    }
  }
}

module.exports = new ProductControllers();
