import { Request, Response } from 'express';
import Wishlist from '../Models/WishlistModel';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    [key: string]: any;
  };
}

// Adiciona um produto à wishlist do usuário
export const addToWishlist = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?._id;
    const { productId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    if (!productId) {
      return res.status(400).json({ message: 'ProductId é obrigatório.' });
    }

    // Busca a wishlist existente ou cria uma nova
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      // Evita produtos duplicados
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Produto já está na sua lista de desejos.' });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    return res.status(200).json({ message: 'Produto adicionado à wishlist!', wishlist });
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao adicionar à wishlist.', error: error.message });
  }
};

// Remove um produto da wishlist
export const removeFromWishlist = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    if (!productId) {
      return res.status(400).json({ message: 'ProductId é obrigatório.' });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );

    return res.status(200).json({ message: 'Produto removido da wishlist!', wishlist });
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao remover da wishlist.', error: error.message });
  }
};

// Retorna a lista de desejos do usuário
export const getWishlist = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      return res.status(200).json({ message: 'Wishlist vazia.', products: [] });
    }

    return res.status(200).json(wishlist.products);
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao buscar wishlist.', error: error.message });
  }
};
