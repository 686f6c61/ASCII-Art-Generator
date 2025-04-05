/**
 * ASCII Art Generator - Convertidor de Imágenes
 * 
 * Implementa algoritmos avanzados para transformar imágenes en representaciones ASCII.
 * Procesa datos de píxeles para mapearlos a caracteres con diferentes niveles de densidad
 * visual, permitiendo ajustes de contraste, brillo y otros parámetros para optimizar
 * la conversión de imágenes a arte ASCII.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para el convertidor de imágenes
window.AsciiApp = window.AsciiApp || {};
AsciiApp.imageConverter = {};

/**
 * Convierte una imagen a arte ASCII
 * @param {HTMLImageElement} img - Elemento de imagen a convertir
 */
AsciiApp.imageConverter.convertImageToAscii = function(img) {
    const { width, contrast, brightness, invert, colored, charSet } = AsciiApp.state.config;
    const charSetChars = AsciiApp.charSets[charSet]?.chars || AsciiApp.charSets.standard.chars;
    
    // Crear un canvas temporal para procesar la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calcular dimensiones manteniendo el aspecto
    const imgRatio = img.width / img.height;
    const asciiWidth = width;
    const asciiHeight = Math.floor(width / imgRatio / 2);
    
    // Ajustar el canvas a las dimensiones calculadas
    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    
    // Dibujar imagen en el canvas con las dimensiones ajustadas
    ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight);
    
    // Obtener datos de pixels
    const imageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
    const pixels = imageData.data;
    
    // Almacenar líneas y píxeles originales para output coloreado
    const originalPixels = [];
    
    // Generar ASCII art
    let asciiImage = '';
    let index = 0;
    
    for (let y = 0; y < asciiHeight; y++) {
        const pixelRow = [];
        
        for (let x = 0; x < asciiWidth; x++) {
            // Índice del pixel en el array de datos
            const pixelIndex = (y * asciiWidth + x) * 4;
            
            // Obtener valores RGB del pixel
            const red = pixels[pixelIndex];
            const green = pixels[pixelIndex + 1];
            const blue = pixels[pixelIndex + 2];
            
            // Calcular la intensidad del gris
            let gray = Math.round((red + green + blue) / 3);
            
            // Aplicar ajustes de brillo y contraste
            gray = gray * contrast + brightness;
            
            // Asegurar que esté dentro del rango 0-255
            gray = Math.max(0, Math.min(255, gray));
            
            // Invertir si es necesario
            const adjustedGray = invert ? 255 - gray : gray;
            
            // Guardar color original para output coloreado
            pixelRow.push({
                char: '',
                color: `rgb(${red}, ${green}, ${blue})`
            });
            
            // Mapear la intensidad del gris a un carácter
            const charIndex = Math.floor(adjustedGray / 255 * (charSetChars.length - 1));
            const char = charSetChars[charIndex];
            
            // Guardar el carácter asignado
            pixelRow[pixelRow.length - 1].char = char;
            
            // Agregar carácter a la imagen ASCII
            asciiImage += char;
            index++;
        }
        
        originalPixels.push(pixelRow);
        asciiImage += '\n';
    }
    
    // Generar HTML para salida con colores si es necesario
    if (colored) {
        let coloredHtml = '';
        
        for (let y = 0; y < originalPixels.length; y++) {
            for (let x = 0; x < originalPixels[y].length; x++) {
                const pixel = originalPixels[y][x];
                coloredHtml += `<span style="color: ${pixel.color}">${pixel.char}</span>`;
            }
            coloredHtml += '<br>';
        }
        
        // Mostrar salida coloreada
        AsciiApp.uiManager.displayAsciiOutput(coloredHtml, true);
    } else {
        // Mostrar salida de texto plano con saltos de línea preservados
        AsciiApp.uiManager.displayAsciiOutput(asciiImage);
    }
    
    // Actualizar estado global con el último arte ASCII generado
    AsciiApp.state.lastAsciiArt = asciiImage;
    
    // Guardar en historial
    AsciiApp.historyManager.addToHistory({
        id: AsciiApp.utils.generateUniqueId(),
        type: 'image',
        content: asciiImage,
        config: { ...AsciiApp.state.config },
        timestamp: Date.now()
    });
    
    return asciiImage;
};
