const Cart = require('../Models/CartModel'); // Importa o model do carrinho
const Product = require('../Models/ProductModel'); // Para pegar info do produto (ex: preço)

// Controlador do carrinho
const CartController = {

  // Adicionar um item ao carrinho
  async addItem(req, res) {
    try {
      const userId = req.body.userId;
      const productId = req.body.productId;
      const quantity = parseInt(req.body.quantity);

      // Validação básica
      if (!userId || !productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Dados inválidos' });
      }

      // Buscar o produto para pegar o preço atual
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      const priceAtPurchase = product.price;

      // Tenta encontrar um carrinho existente para o usuário
      let cart = await Cart.findOne({ userId });

      if (cart) {
        // Verifica se o produto já está no carrinho
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
          // Se já existe, soma a quantidade
          existingItem.quantity += quantity;
        } else {
          // Se não existe, adiciona novo item
          cart.items.push({
            productId,
            quantity,
            priceAtPurchase
          });
        }

        cart.updatedAt = new Date();
        await cart.save(); // Salva o carrinho atualizado
      } else {
        // Se o usuário não tem carrinho, cria um novo
        cart = new Cart({
          userId,
          items: [{
            productId,
            quantity,
            priceAtPurchase
          }]
        });

        await cart.save(); // Salva novo carrinho
      }

      return res.status(200).json(cart); // Retorna o carrinho atualizado/criado

    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

};

module.exports = CartController;
