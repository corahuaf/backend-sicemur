const db = require('../models');

exports.verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      // Obtener el rol del usuario
      const usuario = await db.Usuario.findByPk(req.userId, {
        include: [{
          model: db.RolUsuario,
          as: 'rol_usuario',
          attributes: ['permisos']
        }]
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Si es superadmin, permitir todo
      if (usuario.rol_usuario.nombre === 'SUPERADMIN') {
        return next();
      }

      if (usuario.rol_usuario.nombre === 'ADMIN') {
        return next();
      }

      // Verificar si el rol tiene el permiso requerido
      const permisos = usuario.rol_usuario.permisos || [];

      if (permisos.includes(permisoRequerido)) {
        return next();
      }

      // Agregar un permiso especial para búsquedas públicas
      if (permisoRequerido === 'buscar_ubicaciones') {
        return next(); // Permitir a todos los usuarios autenticados
      }

      // Agregar un permiso especial para búsquedas públicas
      if (permisoRequerido === 'buscar_difuntos') {
        return next(); // Permitir a todos los usuarios autenticados
      }

      if (permisoRequerido === 'buscar_espacios') {
        return next(); // Permitir a todos los usuarios autenticados
      }

      // Agregar permiso para gestionar ocupaciones
      if (permisoRequerido === 'gestion_ocupaciones') {
        return next();
      }

      // Agregar un permiso especial para búsquedas públicas
      if (permisoRequerido === 'buscar_responsables') {
        return next(); // Permitir a todos los usuarios autenticados
      }

      // Agregar permiso para gestionar responsables
      if (permisoRequerido === 'gestion_responsables') {
        return next();
      }

      // Agregar permiso para gestionar catálogos (tipos de documento)
      if (permisoRequerido === 'gestion_catalogos') {
        return next();
      }

      // Agregar permiso para gestionar documentos
      if (permisoRequerido === 'gestion_documentos') {
        return next();
      }

      // Agregar permiso para gestionar reportes
      if (permisoRequerido === 'gestion_reportes') {
        return next();
      }

      // Agregar permiso para gestionar FAQs
      if (permisoRequerido === 'gestion_faqs') {
        return next();
      }

      res.status(403).json({ error: 'Acceso no autorizado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Función para verificar múltiples permisos
exports.verificarPermisos = (permisosRequeridos) => {
  return async (req, res, next) => {
    try {
      const usuario = await db.Usuario.findByPk(req.userId, {
        include: [{
          model: db.RolUsuario,
          as: 'rol_usuario',
          attributes: ['permisos']
        }]
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Si es superadmin, permitir todo
      if (usuario.rol_usuario.nombre === 'SUPERADMIN') {
        return next();
      }

      if (usuario.rol_usuario.nombre === 'ADMIN') {
        return next();
      }

      // Verificar si el rol tiene al menos uno de los permisos requeridos
      const permisos = usuario.rol_usuario.permisos || [];
      const tienePermiso = permisosRequeridos.some(permiso => permisos.includes(permiso));

      if (tienePermiso) {
        return next();
      }

      res.status(403).json({ error: 'Acceso no autorizado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};