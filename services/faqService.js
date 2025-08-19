const db = require('../models');
const { Op } = require('sequelize');

exports.crearFAQ = async (faqData, usuarioId) => {
  // Verificar categoría
  const categoria = await db.FAQCategoria.findByPk(faqData.categoria_id);
  if (!categoria) {
    throw new Error('Categoría no encontrada');
  }

  // Si no se proporciona orden, asignar el último + 1
  if (faqData.orden === undefined) {
    const maxOrden = await db.FAQ.max('orden', { 
      where: { categoria_id: faqData.categoria_id } 
    });
    faqData.orden = maxOrden ? maxOrden + 1 : 1;
  }

  return await db.FAQ.create({
    ...faqData,
    actualizado_por: usuarioId
  });
};

exports.obtenerFAQPorId = async (id) => {
  return await db.FAQ.findByPk(id, {
    include: [
      {
        model: db.FAQCategoria,
        as: 'categoria'
      },
      {
        model: db.Usuario,
        as: 'actualizador',
        attributes: ['id_usuario', 'nombre_usuario']
      }
    ]
  });
};

exports.incrementarVisitas = async (id) => {
  const faq = await db.FAQ.findByPk(id);
  if (faq) {
    faq.veces_vista += 1;
    await faq.save();
  }
};

exports.actualizarFAQ = async (id, faqData, usuarioId) => {
  const faq = await db.FAQ.findByPk(id);
  if (!faq) return null;

  // Actualizar campos permitidos
  const camposPermitidos = ['pregunta', 'respuesta', 'categoria_id', 'orden'];
  const actualizacion = {};
  
  camposPermitidos.forEach(campo => {
    if (faqData[campo] !== undefined) {
      actualizacion[campo] = faqData[campo];
    }
  });
  
  actualizacion.actualizado_por = usuarioId;
  actualizacion.ultima_actualizacion = new Date();
  
  return await faq.update(actualizacion);
};

exports.eliminarFAQ = async (id) => {
  const faq = await db.FAQ.findByPk(id);
  if (!faq) return false;
  
  await faq.destroy();
  return true;
};

exports.obtenerFAQsPorCategoria = async (categoriaId) => {
  return await db.FAQ.findAll({
    where: { categoria_id: categoriaId },
    order: [['orden', 'ASC']],
    include: [{
      model: db.FAQCategoria,
      as: 'categoria'
    }]
  });
};

exports.obtenerFAQsPopulares = async () => {
  return await db.FAQ.findAll({
    order: [['veces_vista', 'DESC']],
    limit: 10,
    include: [{
      model: db.FAQCategoria,
      as: 'categoria'
    }]
  });
};

exports.buscarFAQs = async (termino) => {
  if (!termino || termino.trim() === '') {
    return [];
  }

  return await db.FAQ.findAll({
    where: {
      [Op.or]: [
        { pregunta: { [Op.iLike]: `%${termino}%` } },
        { respuesta: { [Op.iLike]: `%${termino}%` } }
      ]
    },
    include: [{
      model: db.FAQCategoria,
      as: 'categoria'
    }]
  });
};