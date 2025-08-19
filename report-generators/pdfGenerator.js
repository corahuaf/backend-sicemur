const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = async (parametros) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      // Configurar documento
      doc.fontSize(16).text(parametros.titulo || 'Reporte', { align: 'center' });
      doc.moveDown();
      
      // Generar contenido basado en parámetros
      if (parametros.tablas) {
        for (const tabla of parametros.tablas) {
          doc.fontSize(14).text(tabla.titulo);
          doc.moveDown(0.5);
          
          // Cabeceras de tabla
          let x = 50;
          for (const header of tabla.columnas) {
            doc.font('Helvetica-Bold').text(header.nombre, x);
            x += 100;
          }
          doc.moveDown();
          
          // Filas de datos
          for (const fila of tabla.datos) {
            x = 50;
            for (const columna of tabla.columnas) {
              doc.font('Helvetica').text(fila[columna.campo] || '', x);
              x += 100;
            }
            doc.moveDown();
          }
          
          doc.moveDown();
        }
      }
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};