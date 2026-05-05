/**
 * Comprime una imagen redimensionándola
 * @param {File} file - Archivo de imagen original
 * @param {number} maxDimension - Dimensión máxima (ancho o alto)
 * @param {number} quality - Calidad de compresión (0-1)
 * @returns {Promise<File>} - Imagen comprimida
 */
export const compressImage = async (
  file: File,
  maxDimension = 1024,
  quality = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        reject(new Error('No se pudo leer la imagen'));
        return;
      }

      const img = new Image();
      img.src = result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Redimensionar si es necesario
        if (width > height) {
          if (width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob: Blob | null) => {
            if (!blob) {
              reject(new Error('No se pudo comprimir la imagen'));
              return;
            }
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

/**
 * Valida si una imagen cumple con los requisitos
 */
export const validateImage = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png'];

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Solo se permiten archivos JPG o PNG' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'La imagen no puede superar los 5MB' };
  }

  return { valid: true, error: null };
};