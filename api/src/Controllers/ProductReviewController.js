const ProductReview = require('../Models/ProductReviewModel');

// 📌 Cria uma nova avaliação para um produto
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Garante que o usuário logado está enviando (pega do token via middleware)
    const userId = req.user._id;

    // Evita avaliações duplicadas para o mesmo produto por um mesmo usuário
    const existingReview = await ProductReview.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: 'Você já avaliou este produto.' });
    }

    const review = await ProductReview.create({
      userId,
      productId,
      rating,
      comment,
      verifiedPurchase: true // você pode adicionar lógica para verificar se ele comprou de verdade
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar avaliação.', error: error.message });
  }
};

// 📌 Lista todas as avaliações de um produto
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId })
      .populate('userId', 'name'); // Exibe o nome do usuário

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar avaliações.', error: error.message });
  }
};
