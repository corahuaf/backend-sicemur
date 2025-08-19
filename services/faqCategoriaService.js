const db = require('../models');

exports.crearCategoria = async (categoriaData) => {
  // Verificar nombre único
  const existe = await db.FAQCategoria.findOne({ 
    where: { nombre: categoriaData.nombre } 
  });
  
  if (existe) {
    throw new Error('Ya existe una categoría con este nombre');
  }

  // Si no se proporciona orden, asignar el último + 1
  if (categoriaData.orden === undefined) {
    const maxOrden = await db.FAQCategoria.max('orden');
    categoriaData.orden = maxOrden ? maxOrden + 1 : 1;
  }

  return await db.FAQCategoria.create(categoriaData);
};

exports.obtenerTodasCategorias = async () => {
  return await db.FAQCategoria.findAll({
    order: [['orden', 'ASC']]
  });
};

exports.obtenerCategoriaPorId = async (id) => {
  return await db.FAQCategoria.findByPk(id, {
    include: [{
      model: db.FAQ,
      as: 'faqs',
      order: [['orden', 'ASC']]
    }]
  });
};

exports.actualizarCategoria = async (id, categoriaData) => {
  const categoria = await db.FAQCategoria.findByPk(id);
  if (!categoria) return null;

  // Verificar nombre único si se cambia
  if (categoriaData.nombre && categoriaData.nombre !== categoria.nombre) {
    const existe = await db.FAQCategoria.findOne({ 
      where: { nombre: categoriaData.nombre } 
    });
    if (existe) {
      throw new Error('Ya existe una categoría con este nombre');
    }
  }

  return await categoria.update(categoriaData);
};

exports.eliminarCategoria = async (id) => {
  const categoria = await db.FAQCategoria.findByPk(id);
  if (!categoria) return false;

  // Verificar si tiene FAQs asociadas
  const faqs = await db.FAQ.count({ 
    where: { categoria_id: id } 
  });
  if (faqs > 0) {
    throw new Error('No se puede eliminar la categoría porque tiene FAQs asociadas');
  }

  await categoria.destroy();
  return true;
};

exports.actualizarOrdenCategorias = async (nuevasOrdenaciones) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    for (const ordenacion of nuevasOrdenaciones) {
      await db.FAQCategoria.update(
        { orden: ordenacion.orden },
        { where: { id_categoria: ordenacion.id }, transaction }
      );
    }
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};