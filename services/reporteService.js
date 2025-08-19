const db = require('../models');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const {
  generarPDF,
  generarExcel,
  generarCSV
} = require('../report-generators/generators');
const { createDirectoryIfNotExists } = require('../utils/fileUtils');

exports.generarReporte = async (reporteData, usuarioId) => {
  const { tipo, nombre, parametros } = reporteData;
  
  // Generar archivo según el tipo
  let generador;
  let extension;
  
  switch (tipo) {
    case 'PDF':
      generador = generarPDF;
      extension = '.pdf';
      break;
    case 'EXCEL':
      generador = generarExcel;
      extension = '.xlsx';
      break;
    case 'CSV':
      generador = generarCSV;
      extension = '.csv';
      break;
    default:
      throw new Error('Tipo de reporte no válido');
  }
  
  // Generar contenido del reporte
  const contenido = await generador(parametros);
  
  // Guardar archivo físicamente
  const uploadDir = path.join(__dirname, '../../uploads/reportes');
  await createDirectoryIfNotExists(uploadDir);
  
  const nombreArchivo = `${nombre.replace(/\s+/g, '_')}_${uuidv4()}${extension}`;
  const rutaArchivo = path.join(uploadDir, nombreArchivo);
  
  await fs.writeFile(rutaArchivo, contenido);
  
  // Crear registro en base de datos
  const reporte = await db.Reporte.create({
    tipo,
    nombre,
    parametros,
    generado_por: usuarioId,
    archivo_ruta: rutaArchivo
  });
  
  return reporte;
};

exports.obtenerReportePorId = async (id) => {
  return await db.Reporte.findByPk(id, {
    include: [{
      model: db.Usuario,
      as: 'generador',
      attributes: ['id_usuario', 'nombre_usuario']
    }]
  });
};

exports.obtenerRutaReporte = async (id) => {
  const reporte = await db.Reporte.findByPk(id);
  if (!reporte) {
    throw new Error('Reporte no encontrado');
  }
  
  return {
    rutaArchivo: reporte.archivo_ruta,
    nombreArchivo: `${reporte.nombre}.${reporte.tipo.toLowerCase()}`
  };
};

exports.obtenerReportesPorUsuario = async (usuarioId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const { count, rows } = await db.Reporte.findAndCountAll({
    where: { generado_por: usuarioId },
    offset,
    limit,
    order: [['fecha_generacion', 'DESC']]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    reportes: rows
  };
};

exports.eliminarReporte = async (id) => {
  const reporte = await db.Reporte.findByPk(id);
  if (!reporte) return false;

  // Eliminar archivo físico
  if (reporte.archivo_ruta) {
    try {
      await fs.unlink(reporte.archivo_ruta);
    } catch (error) {
      console.error('Error al eliminar archivo de reporte:', error);
    }
  }

  await reporte.destroy();
  return true;
};

exports.obtenerReportesRecientes = async (usuarioId) => {
  return await db.Reporte.findAll({
    where: { generado_por: usuarioId },
    order: [['fecha_generacion', 'DESC']],
    limit: 5
  });
};