const jwt = require('jsonwebtoken');
const db = require('../models'); // asegurate de que la ruta sea correcta

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'Se requiere token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await db.Usuario.findByPk(decoded.id, {
      include: [
        {
          model: db.RolUsuario,
          as: 'rol_usuario',
          attributes: ['nombre', 'permisos']
        }
      ]
    });

    if (!usuario) {
      return res.status(401).send({ message: 'Usuario no encontrado' });
    }

    req.user = {
      id: usuario.id_usuario,
      rol: usuario.rol_usuario.nombre,
      permisos: usuario.rol_usuario.permisos || []
    };

    next();
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido' });
  }
};

// (isAdmin puede quedar igual o eliminarlo si ya no se usa)
const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.rol === 'ADMIN') {
      return next();
    }
    res.status(403).send({ message: 'Requiere rol de administrador' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { verifyToken, isAdmin };