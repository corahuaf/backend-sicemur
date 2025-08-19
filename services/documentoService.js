const db = require('../models');
const fileHandler = require('../utils/fileHandler');
const path = require('path');

exports.crearDocumento = async (documentoData, usuarioId) => {
  // Verificar tipo de documento
  const tipoDocumento = await db.TipoDocumento.findByPk(documentoData.tipo_id);
  if (!tipoDocumento) {
    throw new Error('Tipo de documento no encontrado');
  }

  return await db.Documento.create({
    ...documentoData,
    creado_por: usuarioId
  });
};

exports.obtenerDocumentoPorId = async (id) => {
  return await db.Documento.findByPk(id, {
    include: [
      {
        model: db.TipoDocumento,
        as: 'tipo'
      },
      {
        model: db.Usuario,
        as: 'creador',
        attributes: ['id_usuario', 'nombre_usuario']
      },
      {
        model: db.Usuario,
        as: 'modificador',
        attributes: ['id_usuario', 'nombre_usuario']
      }
    ]
  });
};

exports.actualizarDocumento = async (id, documentoData, usuarioId) => {
  const documento = await db.Documento.findByPk(id);
  if (!documento) return null;

  // Solo permitir actualizar ciertos campos
  const camposPermitidos = ['nombre', 'descripcion'];
  const actualizacion = {};
  
  camposPermitidos.forEach(campo => {
    if (documentoData[campo] !== undefined) {
      actualizacion[campo] = documentoData[campo];
    }
  });
  
  actualizacion.modificado_por = usuarioId;
  actualizacion.fecha_modificacion = new Date();
  
  return await documento.update(actualizacion);
};

exports.eliminarDocumento = async (id) => {
  const documento = await db.Documento.findByPk(id);
  if (!documento) return false;

  // Eliminar archivo físico si existe
  if (documento.ruta_archivo) {
    await fileHandler.eliminarArchivo(documento.ruta_archivo);
  }

  // Eliminar asociaciones de propiedad
  await db.Documento_Propiedad.destroy({ 
    where: { documento_id: id } 
  });

  // Eliminar documento
  await documento.destroy();
  return true;
};

exports.obtenerDocumentosPorTipo = async (tipoId) => {
  return await db.Documento.findAll({
    where: { tipo_id: tipoId },
    include: [{
      model: db.TipoDocumento,
      as: 'tipo'
    }],
    order: [['fecha_emision', 'DESC']]
  });
};

exports.subirArchivo = async (documentoId, archivo) => {
  const documento = await db.Documento.findByPk(documentoId);
  if (!documento) {
    throw new Error('Documento no encontrado');
  }

  // Eliminar archivo anterior si existe
  if (documento.ruta_archivo) {
    await fileHandler.eliminarArchivo(documento.ruta_archivo);
  }

  // Guardar nuevo archivo
  const rutaArchivo = await fileHandler.guardarArchivo(archivo, 'documentos');
  
  // Actualizar documento
  return await documento.update({
    ruta_archivo: rutaArchivo,
    nombre_archivo: archivo.originalname
  });
};

exports.descargarArchivo = async (documentoId) => {
  const documento = await db.Documento.findByPk(documentoId);
  if (!documento) {
    throw new Error('Documento no encontrado');
  }

  if (!documento.ruta_archivo) {
    throw new Error('El documento no tiene un archivo asociado');
  }

  return {
    rutaArchivo: documento.ruta_archivo,
    nombreArchivo: documento.nombre_archivo || `documento_${documentoId}.pdf`
  };
};