import { Request, Response } from 'express';
import ProductReview from '../Models/ProductReviewModel';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    [key: string]: any;
  };
}

// Cria uma nova avaliação para um produto
export const createReview = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { productId, rating, comment } = req.body;

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Evita avaliações duplicadas para o mesmo produto pelo mesmo usuário
    const existingReview = await ProductReview.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: 'Você já avaliou este produto.' });
    }

    const review = await ProductReview.create({
      userId,
      productId,
      rating,
      comment,
      verifiedPurchase: true, // aqui você pode implementar lógica real para validar compra
    });

    return res.status(201).json(review);
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao criar avaliação.', error: error.message });
  }
};

// Lista todas as avaliações de um produto
export const getReviewsByProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId })
      .populate('userId', 'name'); // traz o nome do usuário

    return res.json(reviews);
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao buscar avaliações.', error: error.message });
  }
};
