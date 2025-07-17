import { Request, Response } from 'express';
import ProductModel from '../Models/ProductModel';

class ProductControllers {
  // Criar Product
  async ProductCreate(req: Request, res: Response): Promise<Response> {
    try {
      const createProduct = await ProductModel.create(req.body);
      return res.status(201).json(createProduct);
    } catch (error: any) {
      return res.status(500).json({ message: "Failed to create Product", error: error.message });
    }
  }

  // Listar todos os products
  async ProductList(req: Request, res: Response): Promise<Response> {
    try {
      const listproduct = await ProductModel.find();
      return res.status(200).json(listproduct);
    } catch (error: any) {
      return res.status(500).json({ message: "Failed to list Products", error: error.message });
    }
  }

  // Listar product por ID
  async ProductListId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product does not exist" });
      }
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: "Failed to list product", error: error.message });
    }
  }

  // Atualizar produto por ID
  async ProductUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      return res.status(200).json({ message: "Product update success", product: updatedProduct });
    } catch (error: any) {
      return res.status(500).json({ message: "Failed Product update", error: error.message });
    }
  }

  // Deletar product por ID
  async ProductDelete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product does not exist" });
      }
      return res.status(200).json({ message: "Product delete success" });
    } catch (error: any) {
      return res.status(500).json({ message: "Failed to delete", error: error.message });
    }
  }
}

export default new ProductControllers();
