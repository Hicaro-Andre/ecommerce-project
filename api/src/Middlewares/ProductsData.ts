import { Request, Response, NextFunction } from 'express';

const productsData = (req: Request, res: Response, next: NextFunction): void => {
  const { productName } = req.body;

  if (!productName || productName.length < 3) {
    res.status(400).json({ message: "Product is required and must have at least 3 characters." });
    return;
  }

  next();
};

export default productsData;
