const ExcelJS = require('exceljs');

module.exports = async (parametros) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Sistema Cementerio';
  workbook.created = new Date();
  
  // Crear hoja principal
  const worksheet = workbook.addWorksheet('Reporte');
  
  // Generar contenido basado en parámetros
  if (parametros.tablas) {
    for (const tabla of parametros.tablas) {
      // Agregar título
      worksheet.addRow([tabla.titulo]);
      
      // Cabeceras
      const headers = tabla.columnas.map(col => col.nombre);
      worksheet.addRow(headers);
      
      // Datos
      for (const fila of tabla.datos) {
        const rowData = tabla.columnas.map(col => fila[col.campo] || '');
        worksheet.addRow(rowData);
      }
      
      // Espacio entre tablas
      worksheet.addRow([]);
      worksheet.addRow([]);
    }
  }
  
  // Generar buffer
  return await workbook.xlsx.writeBuffer();
};