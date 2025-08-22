const verificarPermiso = (permisoRequerido) => {
  return (req, res, next) => {
    const usuario = req.user;

    if (!usuario || !usuario.permisos || !Array.isArray(usuario.permisos)) {
      return res.status(403).json({ mensaje: 'Acceso denegado. Permisos no encontrados.' });
    }

    if (!usuario.permisos.includes(permisoRequerido)) {
      return res.status(403).json({ mensaje: `Acceso denegado. Se requiere permiso: ${permisoRequerido}` });
    }

    next();
  };
};

module.exports = {
  verificarPermiso,
};