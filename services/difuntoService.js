const db = require('../models');
const { Op } = require('sequelize');

exports.crearDifunto = async (difuntoData) => {
  return await db.Difunto.create(difuntoData);
};

exports.obtenerTodosDifuntos = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const { count, rows } = await db.Difunto.findAndCountAll({
    offset,
    limit,
    order: [
      ['ape_paterno', 'ASC'],
      ['ape_materno', 'ASC'],
      ['nombres', 'ASC']
    ]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    difuntos: rows
  };
};

exports.obtenerDifuntoPorId = async (id) => {
  return await db.Difunto.findByPk(id, {
    include: [{
      model: db.Ocupacion,
      as: 'ocupaciones',
      include: [{
        model: db.EspacioFunerario,
        as: 'espacio'
      }]
    }]
  });
};

exports.actualizarDifunto = async (id, difuntoData) => {
  const difunto = await db.Difunto.findByPk(id);
  if (!difunto) return null;
  
  // Validar fechas
  if (difuntoData.fecha_fallecimiento && difuntoData.fecha_ingreso_cementerio) {
    const fechaFallecimiento = new Date(difuntoData.fecha_fallecimiento);
    const fechaIngreso = new Date(difuntoData.fecha_ingreso_cementerio);
    
    if (fechaIngreso < fechaFallecimiento) {
      throw new Error('La fecha de ingreso no puede ser anterior a la fecha de fallecimiento');
    }
  }
  
  return await difunto.update(difuntoData);
};

exports.eliminarDifunto = async (id) => {
  const difunto = await db.Difunto.findByPk(id);
  if (!difunto) return false;

  // Verificar si el difunto está asociado a alguna ocupación
  const ocupaciones = await db.Ocupacion.count({ where: { difunto_id: id } });
  if (ocupaciones > 0) {
    throw new Error('No se puede eliminar el difunto porque está asociado a espacios funerarios');
  }

  await difunto.destroy();
  return true;
};

exports.buscarDifuntos = async (nombres, apellido) => {
  const where = {};
  
  if (nombres) {
    where.nombres = { [Op.iLike]: `%${nombres}%` };
  }
  
  if (apellido) {
    where[Op.or] = [
      { ape_paterno: { [Op.iLike]: `%${apellido}%` } },
      { ape_materno: { [Op.iLike]: `%${apellido}%` } }
    ];
  }

  return await db.Difunto.findAll({ 
    where,
    limit: 50,
    order: [
      ['ape_paterno', 'ASC'],
      ['ape_materno', 'ASC'],
      ['nombres', 'ASC']
    ]
  });
};

exports.obtenerOcupacionesPorDifunto = async (difuntoId) => {
  return await db.Ocupacion.findAll({
    where: { difunto_id: difuntoId },
    include: [
      {
        model: db.EspacioFunerario,
        as: 'espacio'
      },
      {
        model: db.Alquiler,
        as: 'alquiler',
        include: [
          {
            model: db.Responsable,
            as: 'responsable'
          }
        ]
      }
    ]
  });
};