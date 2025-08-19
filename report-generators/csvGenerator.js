const { stringify } = require('csv-stringify/sync');

module.exports = async (parametros) => {
  let csvContent = '';
  
  if (parametros.tablas) {
    for (const tabla of parametros.tablas) {
      // Cabeceras
      const headers = tabla.columnas.map(col => col.nombre);
      csvContent += headers.join(',') + '\n';
      
      // Datos
      for (const fila of tabla.datos) {
        const rowData = tabla.columnas.map(col => `"${fila[col.campo] || ''}"`);
        csvContent += rowData.join(',') + '\n';
      }
      
      // Separador entre tablas
      csvContent += '\n';
    }
  }
  
  return csvContent;
};