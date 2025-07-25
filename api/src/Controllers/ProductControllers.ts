import { Request, Response } from "express";
import ProductModel from "../Models/ProductModel";

class ProductControllers {
  //criar produtos
  async ProductCreate(req: Request, res: Response): Promise<void> {
    try {
      const createProduct = await ProductModel.create(req.body);
      res.status(201).json(createProduct);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to create Product", error: error.message });
    }
  }

  //listar produtos
  async ProductList(req: Request, res: Response): Promise<void> {
    try {
      const listproduct = await ProductModel.find();
      res.status(200).json(listproduct);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to list Products", error: error.message });
    }
  }

  //listar produtos por ID
  async ProductListId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await ProductModel.findById(id);

      if (!product) {
        res.status(404).json({ message: "Product does not exist" });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to list product", error: error.message });
    }
  }

  //atualizar produtos
  async ProductUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

      if (!updatedProduct) {
        res.status(404).json({ message: "Product does not exist" });
        return;
      }

      res
        .status(200)
        .json({ message: "Product update success", product: updatedProduct });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed Product update", error: error.message });
    }
  }

  //deletar produtos
  async ProductDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        res.status(404).json({ message: "Product does not exist" });
        return;
      }
      res.status(200).json({ message: "Product delete success" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to delete", error: error.message });
    }
  }
}

export default new ProductControllers();
