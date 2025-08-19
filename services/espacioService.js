const db = require('../models');
const { Op } = require('sequelize');

exports.crearEspacio = async (espacioData) => {
  // Generar código único si no se proporciona
  if (!espacioData.codigo) {
    espacioData.codigo = generarCodigoUnico(espacioData.tipo);
  }

  // Verificar código único
  const espacioExistente = await db.EspacioFunerario.findOne({ 
    where: { codigo: espacioData.codigo } 
  });
  
  if (espacioExistente) {
    throw new Error('El código del espacio ya está en uso');
  }

  return await db.EspacioFunerario.create(espacioData);
};

function generarCodigoUnico(tipo) {
  const prefix = tipo.substring(0, 3).toUpperCase();
  const timestamp = Date.now();
  return `${prefix}-${timestamp}`;
}

exports.obtenerTodosEspacios = async (page = 1, limit = 10, tipo, estado) => {
  const offset = (page - 1) * limit;
  const where = {};
  
  if (tipo) where.tipo = tipo;
  if (estado) where.estado = estado;

  const { count, rows } = await db.EspacioFunerario.findAndCountAll({
    where,
    offset,
    limit,
    order: [['codigo', 'ASC']]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    espacios: rows
  };
};

exports.obtenerEspacioPorId = async (id) => {
  return await db.EspacioFunerario.findByPk(id, {
    include: [
      {
        model: db.Ocupacion,
        as: 'ocupaciones',
        include: [{
          model: db.Difunto,
          as: 'difunto'
        }]
      },
      {
        model: db.EspacioFunerario,
        as: 'contenido',
        through: { attributes: [] } // Omitir tabla intermedia
      }
    ]
  });
};

exports.actualizarEspacio = async (id, espacioData) => {
  const espacio = await db.EspacioFunerario.findByPk(id);
  if (!espacio) return null;

  // Verificar código único si se cambia
  if (espacioData.codigo && espacioData.codigo !== espacio.codigo) {
    const existe = await db.EspacioFunerario.findOne({ 
      where: { codigo: espacioData.codigo } 
    });
    if (existe) {
      throw new Error('El código del espacio ya está en uso');
    }
  }

  return await espacio.update(espacioData);
};

exports.eliminarEspacio = async (id) => {
  const espacio = await db.EspacioFunerario.findByPk(id);
  if (!espacio) return false;

  // Verificar si tiene contenido
  const contenido = await db.ContenidoEspacial.count({ 
    where: { contenedor_id: id } 
  });
  if (contenido > 0) {
    throw new Error('No se puede eliminar el espacio porque contiene otros espacios');
  }

  // Verificar si tiene ocupantes
  const ocupantes = await db.Ocupacion.count({ 
    where: { espacio_id: id } 
  });
  if (ocupantes > 0) {
    throw new Error('No se puede eliminar el espacio porque tiene ocupantes');
  }

  await espacio.destroy();
  return true;
};

exports.obtenerAtributos = async (espacioId, tipo) => {
  let modelo;
  switch (tipo) {
    case 'LOTE':
      modelo = db.AtributosLote;
      break;
    case 'MAUSOLEO':
      modelo = db.AtributosMausoleo;
      break;
    case 'PABELLON':
      modelo = db.AtributosPabellon;
      break;
    case 'NICHO':
      modelo = db.AtributosNicho;
      break;
    case 'TUMBA':
      modelo = db.AtributosTumba;
      break;
    default:
      throw new Error('Tipo de espacio no válido');
  }

  return await modelo.findOne({ 
    where: { espacio_id: espacioId } 
  });
};

exports.agregarContenido = async (contenedorId, contenidoId) => {
  // Verificar que no exista ya la relación
  const existe = await db.ContenidoEspacial.findOne({
    where: { contenedor_id: contenedorId, contenido_id: contenidoId }
  });
  
  if (existe) {
    throw new Error('El contenido ya está asociado a este contenedor');
  }

  // Verificar que el contenido no sea el mismo contenedor
  if (contenedorId === contenidoId) {
    throw new Error('Un espacio no puede contenerse a sí mismo');
  }

  await db.ContenidoEspacial.create({
    contenedor_id: contenedorId,
    contenido_id: contenidoId
  });
};

exports.eliminarContenido = async (contenedorId, contenidoId) => {
  const resultado = await db.ContenidoEspacial.destroy({
    where: { contenedor_id: contenedorId, contenido_id: contenidoId }
  });
  
  if (resultado === 0) {
    throw new Error('Relación de contenido no encontrada');
  }
};

exports.obtenerContenido = async (contenedorId) => {
  return await db.ContenidoEspacial.findAll({
    where: { contenedor_id: contenedorId },
    include: [{
      model: db.EspacioFunerario,
      as: 'contenido'
    }]
  });
};

exports.obtenerOcupantes = async (espacioId) => {
  return await db.Ocupacion.findAll({
    where: { espacio_id: espacioId },
    include: [{
      model: db.Difunto,
      as: 'difunto'
    }]
  });
};

exports.buscarEspacios = async (codigo, tipo, estado) => {
  const where = {};
  
  if (codigo) where.codigo = { [Op.iLike]: `%${codigo}%` };
  if (tipo) where.tipo = tipo;
  if (estado) where.estado = estado;

  return await db.EspacioFunerario.findAll({ 
    where,
    limit: 50,
    order: [['codigo', 'ASC']]
  });
};

exports.cambiarEstadoEspacio = async (id, estado) => {
  const espacio = await db.EspacioFunerario.findByPk(id);
  if (!espacio) return null;

  // Validar transiciones de estado
  const estadosValidos = ['DISPONIBLE', 'OCUPADO', 'RESERVADO', 'MANTENIMIENTO'];
  if (!estadosValidos.includes(estado)) {
    throw new Error('Estado no válido');
  }

  // Validar cambio de estado
  if (espacio.estado === 'OCUPADO' && estado !== 'OCUPADO') {
    const ocupantes = await this.obtenerOcupantes(id);
    if (ocupantes.length > 0) {
      throw new Error('No se puede cambiar el estado de un espacio ocupado');
    }
  }

  return await espacio.update({ estado });
};