const db = require('../models');
const { Op } = require('sequelize');

exports.crearResponsable = async (responsableData) => {
  // Verificar DNI único
  const existeDNI = await db.Responsable.findOne({ 
    where: { dni: responsableData.dni } 
  });
  
  if (existeDNI) {
    throw new Error('Ya existe un responsable con este DNI');
  }

  return await db.Responsable.create(responsableData);
};

exports.obtenerTodosResponsables = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const { count, rows } = await db.Responsable.findAndCountAll({
    offset,
    limit,
    order: [['ape_paterno', 'ASC'], ['nombres', 'ASC']]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    responsables: rows
  };
};

exports.obtenerResponsablePorId = async (id) => {
  return await db.Responsable.findByPk(id, {
    include: [{
      model: db.Alquiler,
      as: 'alquileres',
      include: [{
        model: db.EspacioFunerario,
        as: 'espacio'
      }]
    }]
  });
};

exports.actualizarResponsable = async (id, responsableData) => {
  const responsable = await db.Responsable.findByPk(id);
  if (!responsable) return null;

  // Verificar DNI único si se cambia
  if (responsableData.dni && responsableData.dni !== responsable.dni) {
    const existe = await db.Responsable.findOne({ 
      where: { dni: responsableData.dni } 
    });
    if (existe) {
      throw new Error('Ya existe un responsable con este DNI');
    }
  }

  return await responsable.update(responsableData);
};

exports.eliminarResponsable = async (id) => {
  const responsable = await db.Responsable.findByPk(id);
  if (!responsable) return false;

  // Verificar si tiene alquileres asociados
  const alquileres = await db.Alquiler.count({ 
    where: { responsable_id: id } 
  });
  if (alquileres > 0) {
    throw new Error('No se puede eliminar el responsable porque tiene alquileres asociados');
  }

  await responsable.destroy();
  return true;
};

exports.buscarResponsables = async (dni, nombre, apellido) => {
  const where = {};
  
  if (dni) where.dni = { [Op.iLike]: `%${dni}%` };
  
  if (nombre) {
    where.nombres = { [Op.iLike]: `%${nombre}%` };
  }
  
  if (apellido) {
    where[Op.or] = [
      { ape_paterno: { [Op.iLike]: `%${apellido}%` } },
      { ape_materno: { [Op.iLike]: `%${apellido}%` } }
    ];
  }

  return await db.Responsable.findAll({ 
    where,
    limit: 50,
    order: [['ape_paterno', 'ASC'], ['nombres', 'ASC']]
  });
};

exports.obtenerAlquileresPorResponsable = async (responsableId) => {
  return await db.Alquiler.findAll({
    where: { responsable_id: responsableId },
    include: [{
      model: db.EspacioFunerario,
      as: 'espacio'
    }],
    order: [['fecha_inicio', 'DESC']]
  });
};

exports.obtenerDocumentosPorResponsable = async (responsableId) => {
  return await db.Documento_Propiedad.findAll({
    where: { responsable_id: responsableId },
    include: [{
      model: db.Documento,
      as: 'documento'
    }],
    order: [['fecha_creacion', 'DESC']]
  });
};