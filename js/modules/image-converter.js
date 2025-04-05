/**
 * ASCII Art Generator - Conversor de imágenes
 * 
 * Este módulo maneja la conversión de imágenes a arte ASCII
 * con ajustes de ancho, contraste y conjunto de caracteres.
 */

import { charSets } from './ascii-dictionaries.js';

/**
 * Convierte una imagen en arte ASCII
 * @param {HTMLImageElement} img - Imagen a convertir
 * @param {Object} config - Configuración de la conversión
 * @param {number} config.width - Ancho en caracteres
 * @param {number} config.contrast - Valor de contraste (0.5-2.0)
 * @param {boolean} config.invert - Invertir colores
 * @param {string} config.charSet - Tipo de conjunto de caracteres
 * @returns {string} - Texto ASCII generado
 */
export function convertImageToAscii(img, config) {
    const { width, contrast, invert, charSet } = config;
    
    // Calcular altura para mantener proporción
    const height = Math.floor(width * img.height / img.width / 1.8);
    
    // Crear canvas para procesar la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    // Dibujar imagen en el canvas
    ctx.drawImage(img, 0, 0, width, height);
    
    // Obtener datos de la imagen
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    // Obtener conjunto de caracteres seleccionado
    const chars = charSets[charSet].chars;
    
    let asciiImage = '';
    
    // Procesar píxeles
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Obtener posición en el array de píxeles (4 valores: R,G,B,A)
            const pos = (y * width + x) * 4;
            
            // Calcular brillo (promedio RGB simple)
            const r = pixels[pos];
            const g = pixels[pos + 1];
            const b = pixels[pos + 2];
            
            // Fórmula de luminancia ponderada (percepción humana)
            let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Aplicar ajuste de contraste
            brightness = Math.pow((brightness - 0.5) * contrast + 0.5, 1.5);
            
            // Asegurar que esté en el rango 0-1
            brightness = Math.max(0, Math.min(brightness, 1));
            
            // Invertir si es necesario
            if (invert) {
                brightness = 1 - brightness;
            }
            
            // Mapear brillo a índice en el conjunto de caracteres
            const charIndex = Math.floor(brightness * (chars.length - 1));
            const asciiChar = chars[charIndex];
            
            // Añadir carácter ASCII
            asciiImage += asciiChar;
        }
        // Nueva línea al final de cada fila
        asciiImage += '\\n';
    }
    
    return asciiImage;
}

/**
 * Procesa una imagen cargada por el usuario
 * @param {File} file - Archivo de imagen subido
 * @returns {Promise<HTMLImageElement>} - Promesa con el elemento de imagen cargado
 */
export function processImageFile(file) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            reject('El archivo no es una imagen válida');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (event) => {
            const img = new Image();
            
            img.onload = () => {
                resolve(img);
            };
            
            img.onerror = () => {
                reject('Error al cargar la imagen');
            };
            
            img.src = event.target.result;
        };
        
        reader.onerror = () => {
            reject('Error al leer el archivo');
        };
        
        reader.readAsDataURL(file);
    });
}
