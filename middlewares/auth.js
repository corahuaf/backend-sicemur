const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).send({ message: 'Se requiere token de autenticación' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await db.Usuario.findByPk(req.userId, {
      include: [{
        model: db.RolUsuario,
        as: 'rol_usuario'
      }]
    });
    
    if (user.rol_usuario.nombre === 'ADMIN') {
      return next();
    }
    
    res.status(403).send({ message: 'Requiere rol de administrador' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { verifyToken, isAdmin };