const Wishlist = require('../Models/WishlistModel');

//Adiciona um produto à wishlist do usuário
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    // Busca a wishlist existente ou cria uma nova
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      // Evita produtos duplicados com $addToSet
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      } else {
        return res.status(400).json({ message: 'Produto já está na sua lista de desejos.' });
      }
    }

    await wishlist.save();
    res.status(200).json({ message: 'Produto adicionado à wishlist!', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar à wishlist.', error: error.message });
  }
};

//Remove um produto da wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );

    res.status(200).json({ message: 'Produto removido da wishlist!', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover da wishlist.', error: error.message });
  }
};

//Retorna a lista de desejos do usuário
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      return res.status(200).json({ message: 'Wishlist vazia.', products: [] });
    }

    res.status(200).json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar wishlist.', error: error.message });
  }
};
