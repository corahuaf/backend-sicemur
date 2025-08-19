const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;

// Función para crear directorio si no existe (ahora local)
const createDirectoryIfNotExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw error;
    }
  }
};

// Crear directorio si no existe
exports.guardarArchivo = async (archivo, subdirectorio) => {
  try {
    // Crear directorio si no existe
    const uploadDir = path.join(__dirname, `../../uploads/${subdirectorio}`);
    await createDirectoryIfNotExists(uploadDir);

    // Resto del código igual...
    const extension = path.extname(archivo.originalname);
    const nombreArchivo = `${uuid()}${extension}`;
    const rutaCompleta = path.join(uploadDir, nombreArchivo);

    await fs.writeFile(rutaCompleta, archivo.buffer);

    return rutaCompleta;
  } catch (error) {
    throw new Error(`Error al guardar el archivo: ${error.message}`);
  }
};

// Resto de tus funciones exportadas...
exports.eliminarArchivo = async (rutaArchivo) => {
  try {
    await fs.unlink(rutaArchivo);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(`Error al eliminar el archivo: ${error.message}`);
    }
  }
};

exports.descargarArchivo = (rutaArchivo, res) => {
  return new Promise((resolve, reject) => {
    res.download(rutaArchivo, (err) => {
      if (err) {
        reject(new Error('Error al descargar el archivo'));
      } else {
        resolve();
      }
    });
  });
};