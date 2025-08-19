const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = dbConfig;
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar todos los modelos
db.RolUsuario = require('./rolUsuario.model')(sequelize, Sequelize);
db.Usuario = require('./usuario.model')(sequelize, Sequelize);
db.Ubicacion = require('./ubicacion.model')(sequelize, Sequelize);
db.Difunto = require('./difunto.model')(sequelize, Sequelize);
db.EspacioFunerario = require('./espacioFunerario.model')(sequelize, Sequelize);
db.ContenidoEspacial = require('./contenidoEspacial.model')(sequelize, Sequelize);
db.AtributosLote = require('./atributosLote.model')(sequelize, Sequelize);
db.AtributosMausoleo = require('./atributosMausoleo.model')(sequelize, Sequelize);
db.AtributosPabellon = require('./atributosPabellon.model')(sequelize, Sequelize);
db.AtributosNicho = require('./atributosNicho.model')(sequelize, Sequelize);
db.AtributosTumba = require('./atributosTumba.model')(sequelize, Sequelize);
db.Ocupacion = require('./ocupacion.model')(sequelize, Sequelize);
db.Responsable = require('./responsable.model')(sequelize, Sequelize);
db.TipoDocumento = require('./tipoDocumento.model')(sequelize, Sequelize);
db.Documento = require('./documento.model')(sequelize, Sequelize);
db.Documento_Propiedad = require('./documentoPropiedad.model')(sequelize, Sequelize);
db.Reporte = require('./reporte.model')(sequelize, Sequelize);
db.PlantillaReporte = require('./plantillaReporte.model')(sequelize, Sequelize);
db.FAQCategoria = require('./faqCategoria.model')(sequelize, Sequelize);
db.FAQ = require('./faq.model')(sequelize, Sequelize);
db.Alquiler = require('./alquiler.model')(sequelize, Sequelize); // Modelo agregado

// Asociaciones
db.Usuario.belongsTo(db.RolUsuario, {
  foreignKey: 'rol',
  as: 'rol_usuario'
});

// Ubicación
db.Ubicacion.hasMany(db.AtributosLote, {
  foreignKey: 'ubicacion_id',
  as: 'atributosLotes'
});

db.AtributosLote.belongsTo(db.Ubicacion, {
  foreignKey: 'ubicacion_id',
  as: 'ubicacion'
});

// Difunto y Ocupación
db.Ocupacion.belongsTo(db.Difunto, {
  foreignKey: 'difunto_id',
  as: 'difunto'
});

// Asociaciones para EspacioFunerario
db.EspacioFunerario.belongsToMany(db.EspacioFunerario, {
  through: db.ContenidoEspacial,
  as: 'contenido',
  foreignKey: 'contenedor_id',
  otherKey: 'contenido_id'
});

db.EspacioFunerario.belongsToMany(db.EspacioFunerario, {
  through: db.ContenidoEspacial,
  as: 'contenedor',
  foreignKey: 'contenido_id',
  otherKey: 'contenedor_id'
});

// Asociaciones para atributos específicos
db.EspacioFunerario.hasOne(db.AtributosLote, {
  foreignKey: 'espacio_id',
  as: 'atributosLote'
});
db.AtributosLote.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

db.EspacioFunerario.hasOne(db.AtributosMausoleo, {
  foreignKey: 'espacio_id',
  as: 'atributosMausoleo'
});
db.AtributosMausoleo.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

db.EspacioFunerario.hasOne(db.AtributosPabellon, {
  foreignKey: 'espacio_id',
  as: 'atributosPabellon'
});
db.AtributosPabellon.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

db.EspacioFunerario.hasOne(db.AtributosNicho, {
  foreignKey: 'espacio_id',
  as: 'atributosNicho'
});
db.AtributosNicho.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

db.EspacioFunerario.hasOne(db.AtributosTumba, {
  foreignKey: 'espacio_id',
  as: 'atributosTumba'
});
db.AtributosTumba.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

// Asociaciones para Ocupacion
db.Ocupacion.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

db.EspacioFunerario.hasMany(db.Ocupacion, {
  foreignKey: 'espacio_id',
  as: 'ocupaciones'
});

db.Difunto.hasMany(db.Ocupacion, {
  foreignKey: 'difunto_id',
  as: 'ocupaciones'
});

// Asociaciones para Responsable
db.Responsable.hasMany(db.Alquiler, {
  foreignKey: 'responsable_id',
  as: 'alquileres'
});

db.Responsable.hasMany(db.Documento_Propiedad, {
  foreignKey: 'responsable_id',
  as: 'documentos_propiedad'
});

db.Alquiler.belongsTo(db.Responsable, {
  foreignKey: 'responsable_id',
  as: 'responsable_alquiler'
});

db.Documento_Propiedad.belongsTo(db.Responsable, {
  foreignKey: 'responsable_id',
  as: 'responsable_documento'
});

// Asociaciones para Documentos
db.TipoDocumento.hasMany(db.Documento, {
  foreignKey: 'tipo_id',
  as: 'documentos'
});

db.Documento.belongsTo(db.TipoDocumento, {
  foreignKey: 'tipo_id',
  as: 'tipo'
});

db.Documento.belongsTo(db.Usuario, {
  foreignKey: 'creado_por',
  as: 'creador'
});

db.Documento.belongsTo(db.Usuario, {
  foreignKey: 'modificado_por',
  as: 'modificador'
});

// Asociaciones para Documento_Propiedad
db.Documento_Propiedad.belongsTo(db.Documento, {
  foreignKey: 'documento_id',
  as: 'documento'
});

db.Documento_Propiedad.belongsTo(db.EspacioFunerario, {
  foreignKey: 'espacio_id',
  as: 'espacio'
});

db.Documento_Propiedad.belongsTo(db.Responsable, {
  foreignKey: 'responsable_id',
  as: 'propietario'
});

db.Documento.hasMany(db.Documento_Propiedad, {
  foreignKey: 'documento_id',
  as: 'propiedades'
});

db.EspacioFunerario.hasMany(db.Documento_Propiedad, {
  foreignKey: 'espacio_id',
  as: 'documentos_espacio'
});

db.Responsable.hasMany(db.Documento_Propiedad, {
  foreignKey: 'responsable_id',
  as: 'documentos_responsable'
});

// Asociaciones para Reporte
db.Reporte.belongsTo(db.Usuario, {
  foreignKey: 'generado_por',
  as: 'generador'
});

// FAQ associations
db.FAQCategoria.hasMany(db.FAQ, {
  foreignKey: 'categoria_id',
  as: 'faqs'
});

db.FAQ.belongsTo(db.FAQCategoria, {
  foreignKey: 'categoria_id',
  as: 'categoria'
});

db.FAQ.belongsTo(db.Usuario, {
  foreignKey: 'actualizado_por',
  as: 'actualizador'
});

module.exports = db;