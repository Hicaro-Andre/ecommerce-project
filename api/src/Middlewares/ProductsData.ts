import { Request, Response, NextFunction } from 'express';

const productsData = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { productName } = req.body;

  if (!productName || productName.length < 3) {
    return res.status(400).json({ message: "Product is required and must have at least 3 characters." });
  }

  next();
};

export default productsData;
