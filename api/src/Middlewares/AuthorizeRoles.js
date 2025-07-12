// Middleware para verificar se o usuário tem uma role permitida
function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    // Garante que o token foi decodificado e role está presente
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado: permissão insuficiente' });
    }

    next(); // Libera o acesso
  };
}

module.exports = authorizeRoles;
