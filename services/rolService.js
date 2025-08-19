const db = require('../models');
const { Op } = require('sequelize');

exports.crearRol = async (rolData) => {
  return await db.RolUsuario.create(rolData);
};

exports.obtenerTodosRoles = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const { count, rows } = await db.RolUsuario.findAndCountAll({
    offset,
    limit,
    order: [['id_rol', 'ASC']]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    roles: rows
  };
};

exports.obtenerRolPorId = async (id) => {
  return await db.RolUsuario.findByPk(id);
};

exports.actualizarRol = async (id, rolData) => {
  const rol = await db.RolUsuario.findByPk(id);
  if (!rol) return null;

  // Evitar cambiar el nombre si es un rol del sistema
  if (rol.esSistema && rolData.nombre && rolData.nombre !== rol.nombre) {
    throw new Error('No se puede cambiar el nombre de un rol del sistema');
  }

  return await rol.update(rolData);
};

exports.eliminarRol = async (id) => {
  const rol = await db.RolUsuario.findByPk(id);
  
  if (!rol) return false;
  if (rol.esSistema) throw new Error('No se puede eliminar un rol del sistema');
  
  // Verificar si hay usuarios asignados a este rol
  const usuarios = await db.Usuario.count({ where: { rol: id } });
  if (usuarios > 0) {
    throw new Error('No se puede eliminar el rol porque tiene usuarios asignados');
  }

  await rol.destroy();
  return true;
};

exports.asignarPermisos = async (rolId, permisos) => {
  const rol = await db.RolUsuario.findByPk(rolId);
  if (!rol) throw new Error('Rol no encontrado');
  
  // Actualizar permisos
  rol.permisos = permisos;
  return await rol.save();
};

exports.obtenerPermisos = async (rolId) => {
  const rol = await db.RolUsuario.findByPk(rolId, {
    attributes: ['permisos']
  });
  
  if (!rol) throw new Error('Rol no encontrado');
  return rol.permisos;
};