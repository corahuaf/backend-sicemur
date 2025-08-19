const db = require('../models');
const { Op } = require('sequelize');

exports.crearUbicacion = async (ubicacionData) => {
  // Verificar si ya existe una ubicación con los mismos datos
  const where = {
    sector: ubicacionData.sector,
    manzana: ubicacionData.manzana || null,
    lote: ubicacionData.lote || null
  };

  const ubicacionExistente = await db.Ubicacion.findOne({ where });
  
  if (ubicacionExistente) {
    throw new Error('Ya existe una ubicación con estos datos');
  }

  return await db.Ubicacion.create(ubicacionData);
};

exports.obtenerTodasUbicaciones = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const { count, rows } = await db.Ubicacion.findAndCountAll({
    offset,
    limit,
    order: [['sector', 'ASC'], ['manzana', 'ASC'], ['lote', 'ASC']]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    ubicaciones: rows
  };
};

exports.obtenerUbicacionPorId = async (id) => {
  return await db.Ubicacion.findByPk(id);
};

exports.actualizarUbicacion = async (id, ubicacionData) => {
  const ubicacion = await db.Ubicacion.findByPk(id);
  if (!ubicacion) return null;

  // Verificar si los nuevos datos ya existen en otra ubicación
  if (ubicacionData.sector || ubicacionData.manzana || ubicacionData.lote) {
    const where = {
      id_ubicacion: { [Op.ne]: id },
      sector: ubicacionData.sector || ubicacion.sector,
      manzana: ubicacionData.manzana || ubicacion.manzana,
      lote: ubicacionData.lote || ubicacion.lote
    };

    const ubicacionExistente = await db.Ubicacion.findOne({ where });
    if (ubicacionExistente) {
      throw new Error('Ya existe otra ubicación con estos datos');
    }
  }

  return await ubicacion.update(ubicacionData);
};

exports.eliminarUbicacion = async (id) => {
  const ubicacion = await db.Ubicacion.findByPk(id);
  if (!ubicacion) return false;

  // Verificar si la ubicación está siendo usada
  const espacios = await db.AtributosLote.count({ where: { ubicacion_id: id } });
  if (espacios > 0) {
    throw new Error('No se puede eliminar la ubicación porque está asociada a espacios funerarios');
  }

  await ubicacion.destroy();
  return true;
};

exports.buscarUbicaciones = async (sector, manzana, lote) => {
  const where = {};
  
  if (sector) where.sector = { [Op.iLike]: `%${sector}%` };
  if (manzana) where.manzana = { [Op.iLike]: `%${manzana}%` };
  if (lote) where.lote = { [Op.iLike]: `%${lote}%` };

  return await db.Ubicacion.findAll({ 
    where,
    limit: 50,
    order: [['sector', 'ASC'], ['manzana', 'ASC'], ['lote', 'ASC']]
  });
};