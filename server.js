require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes'); 
const difuntoRoutes = require('./routes/difuntoRoutes'); 
const espacioRoutes = require('./routes/espacioRoutes'); 
const ocupacionRoutes = require('./routes/ocupacionRoutes');
const responsableRoutes = require('./routes/responsableRoutes'); 
const tipoDocumentoRoutes = require('./routes/tipoDocumentoRoutes');
const documentoRoutes = require('./routes/documentoRoutes');
const documentoPropiedadRoutes = require('./routes/documentoPropiedadRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const plantillaReporteRoutes = require('./routes/plantillaReporteRoutes');
const faqCategoriaRoutes = require('./routes/faqCategoriaRoutes');
const faqRoutes = require('./routes/faqRoutes');

// Configurar multer para manejar archivos
app.use(express.urlencoded({ extended: true }));

// Usar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes); 
app.use('/api/ubicaciones', ubicacionRoutes); 
app.use('/api/difuntos', difuntoRoutes);
app.use('/api/espacios', espacioRoutes);
app.use('/api/ocupaciones', ocupacionRoutes);
app.use('/api/responsables', responsableRoutes);
app.use('/api/tipos-documento', tipoDocumentoRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/api/documentos-propiedad', documentoPropiedadRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/plantillas-reporte', plantillaReporteRoutes);
app.use('/api/faqs/categorias', faqCategoriaRoutes);
app.use('/api/faqs', faqRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Cementerio AlfaNum');
});

// Sincronizar DB y arrancar servidor
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});