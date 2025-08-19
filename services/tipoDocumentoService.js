const db = require('../models');

exports.crearTipoDocumento = async (tipoDocumentoData) => {
  // Verificar nombre único
  const existe = await db.TipoDocumento.findOne({ 
    where: { nombre: tipoDocumentoData.nombre } 
  });
  
  if (existe) {
    throw new Error('Ya existe un tipo de documento con este nombre');
  }

  return await db.TipoDocumento.create(tipoDocumentoData);
};

exports.obtenerTodosTiposDocumento = async () => {
  return await db.TipoDocumento.findAll({
    order: [['nombre', 'ASC']]
  });
};

exports.obtenerTipoDocumentoPorId = async (id) => {
  return await db.TipoDocumento.findByPk(id);
};

exports.actualizarTipoDocumento = async (id, tipoDocumentoData) => {
  const tipoDocumento = await db.TipoDocumento.findByPk(id);
  if (!tipoDocumento) return null;

  // Verificar nombre único si se cambia
  if (tipoDocumentoData.nombre && tipoDocumentoData.nombre !== tipoDocumento.nombre) {
    const existe = await db.TipoDocumento.findOne({ 
      where: { nombre: tipoDocumentoData.nombre } 
    });
    if (existe) {
      throw new Error('Ya existe un tipo de documento con este nombre');
    }
  }

  return await tipoDocumento.update(tipoDocumentoData);
};

exports.eliminarTipoDocumento = async (id) => {
  const tipoDocumento = await db.TipoDocumento.findByPk(id);
  if (!tipoDocumento) return false;

  // Verificar si hay documentos asociados
  const documentos = await db.Documento.count({ 
    where: { tipo_id: id } 
  });
  if (documentos > 0) {
    throw new Error('No se puede eliminar el tipo de documento porque tiene documentos asociados');
  }

  await tipoDocumento.destroy();
  return true;
};