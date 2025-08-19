const db = require('../models');
const espacioService = require('./espacioService');

exports.asignarDifunto = async (data) => {
  const { espacio_id, difunto_id, fecha_ocupacion } = data;
  
  // Verificar que el espacio existe
  const espacio = await db.EspacioFunerario.findByPk(espacio_id);
  if (!espacio) {
    throw new Error('Espacio no encontrado');
  }
  
  // Verificar que el difunto existe
  const difunto = await db.Difunto.findByPk(difunto_id);
  if (!difunto) {
    throw new Error('Difunto no encontrado');
  }
  
  // Validar estado del espacio
  if (espacio.estado !== 'DISPONIBLE' && espacio.estado !== 'RESERVADO') {
    throw new Error('El espacio no está disponible para ocupación');
  }
  
  // Crear la ocupación
  const ocupacion = await db.Ocupacion.create({
    espacio_id,
    difunto_id,
    fecha_ocupacion: fecha_ocupacion || new Date()
  });
  
  // Cambiar estado del espacio a OCUPADO
  await espacioService.cambiarEstadoEspacio(espacio_id, 'OCUPADO');
  
  return ocupacion;
};

exports.liberarDifunto = async (espacioId, difuntoId) => {
  // Eliminar la relación de ocupación
  const resultado = await db.Ocupacion.destroy({
    where: { espacio_id: espacioId, difunto_id: difuntoId }
  });
  
  if (resultado === 0) {
    throw new Error('Ocupación no encontrada');
  }
  
  // Verificar si el espacio queda sin ocupantes
  const ocupantesRestantes = await db.Ocupacion.count({
    where: { espacio_id: espacioId }
  });
  
  // Si no hay más ocupantes, cambiar estado a DISPONIBLE
  if (ocupantesRestantes === 0) {
    await espacioService.cambiarEstadoEspacio(espacioId, 'DISPONIBLE');
  }
  
  return true;
};

exports.obtenerOcupacionesPorEspacio = async (espacioId) => {
  return await db.Ocupacion.findAll({
    where: { espacio_id: espacioId },
    include: [{
      model: db.Difunto,
      as: 'difunto'
    }],
    order: [['fecha_ocupacion', 'DESC']]
  });
};

exports.obtenerOcupacionesPorDifunto = async (difuntoId) => {
  return await db.Ocupacion.findAll({
    where: { difunto_id: difuntoId },
    include: [{
      model: db.EspacioFunerario,
      as: 'espacio'
    }],
    order: [['fecha_ocupacion', 'DESC']]
  });
};

exports.obtenerHistorialEspacio = async (espacioId) => {
  return await db.Ocupacion.findAll({
    where: { espacio_id: espacioId },
    include: [{
      model: db.Difunto,
      as: 'difunto'
    }],
    order: [['fecha_ocupacion', 'DESC']],
    paranoid: false // Incluir registros eliminados (historial completo)
  });
};

exports.transferirDifunto = async (espacioOrigenId, difuntoId, espacioDestinoId) => {
  // Verificar que el difunto está en el espacio de origen
  const ocupacionActual = await db.Ocupacion.findOne({
    where: { espacio_id: espacioOrigenId, difunto_id: difuntoId }
  });
  
  if (!ocupacionActual) {
    throw new Error('El difunto no está ocupando el espacio de origen');
  }
  
  // Verificar que el espacio destino está disponible
  const espacioDestino = await db.EspacioFunerario.findByPk(espacioDestinoId);
  if (!espacioDestino) {
    throw new Error('Espacio destino no encontrado');
  }
  
  if (espacioDestino.estado !== 'DISPONIBLE' && espacioDestino.estado !== 'RESERVADO') {
    throw new Error('El espacio destino no está disponible');
  }
  
  // Crear nueva ocupación en el espacio destino
  await db.Ocupacion.create({
    espacio_id: espacioDestinoId,
    difunto_id: difuntoId,
    fecha_ocupacion: new Date()
  });
  
  // Liberar espacio origen
  await this.liberarDifunto(espacioOrigenId, difuntoId);
  
  // Cambiar estado del espacio destino
  await espacioService.cambiarEstadoEspacio(espacioDestinoId, 'OCUPADO');
  
  return {
    message: 'Transferencia completada exitosamente',
    espacioOrigenId,
    espacioDestinoId,
    difuntoId
  };
};