const db = require('../models');

exports.asociarDocumentoPropiedad = async (asociacionData) => {
  // Verificar documento
  const documento = await db.Documento.findByPk(asociacionData.documento_id);
  if (!documento) {
    throw new Error('Documento no encontrado');
  }

  // Verificar espacio
  if (asociacionData.espacio_id) {
    const espacio = await db.EspacioFunerario.findByPk(asociacionData.espacio_id);
    if (!espacio) {
      throw new Error('Espacio no encontrado');
    }
  }

  // Verificar responsable
  if (asociacionData.responsable_id) {
    const responsable = await db.Responsable.findByPk(asociacionData.responsable_id);
    if (!responsable) {
      throw new Error('Responsable no encontrado');
    }
  }

  return await db.Documento_Propiedad.create(asociacionData);
};

exports.obtenerDocumentosPropiedadPorEspacio = async (espacioId) => {
  return await db.Documento_Propiedad.findAll({
    where: { espacio_id: espacioId },
    include: [
      {
        model: db.Documento,
        as: 'documento'
      },
      {
        model: db.Responsable,
        as: 'responsable'
      }
    ]
  });
};

exports.obtenerDocumentosPropiedadPorResponsable = async (responsableId) => {
  return await db.Documento_Propiedad.findAll({
    where: { responsable_id: responsableId },
    include: [
      {
        model: db.Documento,
        as: 'documento'
      },
      {
        model: db.EspacioFunerario,
        as: 'espacio'
      }
    ]
  });
};

exports.eliminarAsociacionDocumentoPropiedad = async (id) => {
  const resultado = await db.Documento_Propiedad.destroy({
    where: { id_documento_propiedad: id }
  });
  
  if (resultado === 0) {
    throw new Error('Asociación no encontrada');
  }
  return true;
};