/**
 * ASCII Art Generator - Utilidades de procesamiento de imágenes
 * 
 * Este módulo contiene funciones para pre-procesamiento y optimización
 * de imágenes antes de la conversión a ASCII.
 */

/**
 * Aplica optimizaciones a la imagen cargada
 * @param {HTMLImageElement} image - Imagen original
 * @param {Object} options - Opciones de optimización
 * @param {number} options.maxWidth - Ancho máximo de la imagen
 * @param {number} options.quality - Calidad de la imagen (0-1)
 * @returns {Promise<HTMLImageElement>} - Promesa con la imagen optimizada
 */
export function optimizeImage(image, options = {}) {
    const maxWidth = options.maxWidth || 1200;
    const quality = options.quality || 0.85;
    
    return new Promise((resolve) => {
        // Si la imagen ya es pequeña, la devolvemos sin procesar
        if (image.width <= maxWidth) {
            resolve(image);
            return;
        }
        
        // Crear canvas para redimensionar
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calcular nuevas dimensiones
        const ratio = image.height / image.width;
        const newWidth = maxWidth;
        const newHeight = Math.floor(newWidth * ratio);
        
        // Configurar canvas
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Dibujar imagen redimensionada
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        
        // Crear nueva imagen desde canvas
        const optimizedImage = new Image();
        optimizedImage.onload = () => {
            resolve(optimizedImage);
        };
        
        // Convertir canvas a data URL con compresión
        optimizedImage.src = canvas.toDataURL('image/jpeg', quality);
    });
}

/**
 * Aplica filtros a una imagen (contraste, brillo, etc.)
 * @param {HTMLImageElement} image - Imagen original
 * @param {Object} filters - Filtros a aplicar
 * @param {number} filters.contrast - Valor de contraste (1 = normal)
 * @param {number} filters.brightness - Valor de brillo (1 = normal)
 * @returns {Promise<HTMLImageElement>} - Promesa con la imagen filtrada
 */
export function applyImageFilters(image, filters = {}) {
    const contrast = filters.contrast !== undefined ? filters.contrast : 1;
    const brightness = filters.brightness !== undefined ? filters.brightness : 1;
    
    return new Promise((resolve) => {
        // Crear canvas para aplicar filtros
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Configurar canvas con dimensiones de la imagen
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Dibujar imagen en el canvas
        ctx.drawImage(image, 0, 0);
        
        // Obtener datos de la imagen
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Aplicar filtros a cada píxel
        for (let i = 0; i < data.length; i += 4) {
            // Aplicar brillo
            data[i] = data[i] * brightness;     // R
            data[i + 1] = data[i + 1] * brightness; // G
            data[i + 2] = data[i + 2] * brightness; // B
            
            // Aplicar contraste
            // Fórmula: (valor - 128) * contraste + 128
            data[i] = (data[i] - 128) * contrast + 128;     // R
            data[i + 1] = (data[i + 1] - 128) * contrast + 128; // G
            data[i + 2] = (data[i + 2] - 128) * contrast + 128; // B
            
            // Asegurar valores en rango 0-255
            data[i] = Math.max(0, Math.min(255, data[i]));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
        }
        
        // Poner datos modificados en el canvas
        ctx.putImageData(imageData, 0, 0);
        
        // Crear nueva imagen desde canvas
        const filteredImage = new Image();
        filteredImage.onload = () => {
            resolve(filteredImage);
        };
        
        // Convertir canvas a data URL
        filteredImage.src = canvas.toDataURL();
    });
}
