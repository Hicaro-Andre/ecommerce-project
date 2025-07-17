import { Request, Response } from 'express';
import Wishlist from '../Models/WishlistModel';

// Interface do payload JWT conforme seu middleware AuthLoginData
interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Interface estendida do Request para incluir user do tipo JwtPayload
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Adiciona um produto à wishlist do usuário
export const addToWishlist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Usuário não autenticado.' });
      return;
    }

    if (!productId) {
      res.status(400).json({ message: 'ProductId é obrigatório.' });
      return;
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        res.status(400).json({ message: 'Produto já está na sua lista de desejos.' });
        return;
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: 'Produto adicionado à wishlist!', wishlist });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao adicionar à wishlist.', error: error.message });
  }
};

// Remove um produto da wishlist
export const removeFromWishlist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    if (!userId) {
      res.status(401).json({ message: 'Usuário não autenticado.' });
      return;
    }

    if (!productId) {
      res.status(400).json({ message: 'ProductId é obrigatório.' });
      return;
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );

    res.status(200).json({ message: 'Produto removido da wishlist!', wishlist });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao remover da wishlist.', error: error.message });
  }
};

// Retorna a lista de desejos do usuário
export const getWishlist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Usuário não autenticado.' });
      return;
    }

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      res.status(200).json({ message: 'Wishlist vazia.', products: [] });
      return;
    }

    res.status(200).json(wishlist.products);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao buscar wishlist.', error: error.message });
  }
};

