import { Request, Response } from 'express';
import ProductReview from '../Models/ProductReviewModel';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extendendo a interface Request para incluir o usuário autenticado
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const createReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { productId, rating, comment } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Usuário não autenticado.' });
      return;
    }

    // Evita avaliações duplicadas
    const existingReview = await ProductReview.findOne({ userId, productId });
    if (existingReview) {
      res.status(400).json({ message: 'Você já avaliou este produto.' });
      return;
    }

    const review = await ProductReview.create({
      userId,
      productId,
      rating,
      comment,
      verifiedPurchase: true,
    });

    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao criar avaliação.',
      error: error.message,
    });
  }
};

// Lista todas as avaliações de um produto
export const getReviewsByProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId }).populate('userId', 'name');

    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao buscar avaliações.',
      error: error.message,
    });
  }
};

