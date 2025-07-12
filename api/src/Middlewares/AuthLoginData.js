const jwt = require('jsonwebtoken');

// Middleware para verificar se o token JWT é válido
function AuthLoginData(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado corretamente no header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Token não fornecido ou mal formatado (use Bearer)' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta');

    // Adiciona os dados do usuário (id, email, role) na requisição
    req.user = decoded;

    next(); // Libera o acesso
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

module.exports = AuthLoginData;
