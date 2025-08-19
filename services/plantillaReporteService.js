const db = require('../models');

exports.crearPlantilla = async (plantillaData) => {
  // Verificar nombre único
  const existe = await db.PlantillaReporte.findOne({ 
    where: { nombre: plantillaData.nombre } 
  });
  
  if (existe) {
    throw new Error('Ya existe una plantilla con este nombre');
  }

  return await db.PlantillaReporte.create(plantillaData);
};

exports.obtenerPlantillaPorId = async (id) => {
  return await db.PlantillaReporte.findByPk(id);
};

exports.actualizarPlantilla = async (id, plantillaData) => {
  const plantilla = await db.PlantillaReporte.findByPk(id);
  if (!plantilla) return null;

  // Verificar nombre único si se cambia
  if (plantillaData.nombre && plantillaData.nombre !== plantilla.nombre) {
    const existe = await db.PlantillaReporte.findOne({ 
      where: { nombre: plantillaData.nombre } 
    });
    if (existe) {
      throw new Error('Ya existe una plantilla con este nombre');
    }
  }

  return await plantilla.update(plantillaData);
};

exports.eliminarPlantilla = async (id) => {
  const plantilla = await db.PlantillaReporte.findByPk(id);
  if (!plantilla) return false;
  
  await plantilla.destroy();
  return true;
};

exports.obtenerTodasPlantillas = async () => {
  return await db.PlantillaReporte.findAll({
    order: [['nombre', 'ASC']]
  });
};

exports.generarDesdePlantilla = async (plantillaId, parametros, usuarioId) => {
  const plantilla = await db.PlantillaReporte.findByPk(plantillaId);
  if (!plantilla) {
    throw new Error('Plantilla no encontrada');
  }
  
  // Usar el servicio de reportes para generar
  const reporteService = require('./reporteService');
  return await reporteService.generarReporte({
    tipo: plantilla.tipo,
    nombre: plantilla.nombre,
    parametros: {
      ...plantilla.definicion,
      ...parametros
    }
  }, usuarioId);
};