/**
 * ASCII Art Generator
 * 
 * Este script convierte imágenes y texto en arte ASCII utilizando diferentes conjuntos de caracteres.
 * Permite ajustar el ancho, contraste y otros parámetros para personalizar la salida.
 * 
 * @author 686f6c61
 * @version 1.1.0
 * @license MIT
 */

// Elementos DOM
const imageInput = document.getElementById('imageInput');
const widthRange = document.getElementById('widthRange');
const contrastRange = document.getElementById('contrastRange');
const invertColors = document.getElementById('invertColors');
const charSetSelect = document.getElementById('charSet');
const downloadBtn = document.getElementById('downloadBtn');
const widthValue = document.getElementById('widthValue');
const contrastValue = document.getElementById('contrastValue');
const output = document.getElementById('ascii-output');
const textInput = document.getElementById('textInput');

// Elementos de las tabs
const imageTab = document.getElementById('imageTab');
const textTab = document.getElementById('textTab');
const imageSection = document.getElementById('imageSection');
const textSection = document.getElementById('textSection');

// Diccionario de letras en ASCII art (5x5)
const asciiLetters = {
    'A': [
        ' *** ',
        '*   *',
        '*****',
        '*   *',
        '*   *'
    ],
    'B': [
        '**** ',
        '*   *',
        '**** ',
        '*   *',
        '**** '
    ],
    'C': [
        ' ****',
        '*    ',
        '*    ',
        '*    ',
        ' ****'
    ],
    'D': [
        '**** ',
        '*   *',
        '*   *',
        '*   *',
        '**** '
    ],
    'E': [
        '*****',
        '*    ',
        '**** ',
        '*    ',
        '*****'
    ],
    'F': [
        '*****',
        '*    ',
        '**** ',
        '*    ',
        '*    '
    ],
    'G': [
        ' ****',
        '*    ',
        '*  **',
        '*   *',
        ' ****'
    ],
    'H': [
        '*   *',
        '*   *',
        '*****',
        '*   *',
        '*   *'
    ],
    'I': [
        '*****',
        '  *  ',
        '  *  ',
        '  *  ',
        '*****'
    ],
    'J': [
        '*****',
        '   * ',
        '   * ',
        '*  * ',
        ' **  '
    ],
    'K': [
        '*   *',
        '*  * ',
        '***  ',
        '*  * ',
        '*   *'
    ],
    'L': [
        '*    ',
        '*    ',
        '*    ',
        '*    ',
        '*****'
    ],
    'M': [
        '*   *',
        '** **',
        '* * *',
        '*   *',
        '*   *'
    ],
    'N': [
        '*   *',
        '**  *',
        '* * *',
        '*  **',
        '*   *'
    ],
    'Ñ': [
        ' *** ',
        '*   *',
        '**  *',
        '* * *',
        '*  **'
    ],
    'O': [
        ' *** ',
        '*   *',
        '*   *',
        '*   *',
        ' *** '
    ],
    'P': [
        '**** ',
        '*   *',
        '**** ',
        '*    ',
        '*    '
    ],
    'Q': [
        ' *** ',
        '*   *',
        '*   *',
        '*  * ',
        ' ** *'
    ],
    'R': [
        '**** ',
        '*   *',
        '**** ',
        '*  * ',
        '*   *'
    ],
    'S': [
        ' ****',
        '*    ',
        ' *** ',
        '    *',
        '**** '
    ],
    'T': [
        '*****',
        '  *  ',
        '  *  ',
        '  *  ',
        '  *  '
    ],
    'U': [
        '*   *',
        '*   *',
        '*   *',
        '*   *',
        ' *** '
    ],
    'V': [
        '*   *',
        '*   *',
        '*   *',
        ' * * ',
        '  *  '
    ],
    'W': [
        '*   *',
        '*   *',
        '* * *',
        '** **',
        '*   *'
    ],
    'X': [
        '*   *',
        ' * * ',
        '  *  ',
        ' * * ',
        '*   *'
    ],
    'Y': [
        '*   *',
        ' * * ',
        '  *  ',
        '  *  ',
        '  *  '
    ],
    'Z': [
        '*****',
        '   * ',
        '  *  ',
        ' *   ',
        '*****'
    ],
    ' ': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     '
    ],
    '0': [
        ' *** ',
        '*   *',
        '*   *',
        '*   *',
        ' *** '
    ],
    '1': [
        '  *  ',
        ' **  ',
        '  *  ',
        '  *  ',
        ' *** '
    ],
    '2': [
        ' *** ',
        '*   *',
        '  ** ',
        ' *   ',
        '*****'
    ],
    '3': [
        '**** ',
        '    *',
        ' *** ',
        '    *',
        '**** '
    ],
    '4': [
        '*   *',
        '*   *',
        '*****',
        '    *',
        '    *'
    ],
    '5': [
        '*****',
        '*    ',
        '**** ',
        '    *',
        '**** '
    ],
    '6': [
        ' ****',
        '*    ',
        '**** ',
        '*   *',
        ' *** '
    ],
    '7': [
        '*****',
        '   * ',
        '  *  ',
        ' *   ',
        '*    '
    ],
    '8': [
        ' *** ',
        '*   *',
        ' *** ',
        '*   *',
        ' *** '
    ],
    '9': [
        ' *** ',
        '*   *',
        ' ****',
        '    *',
        ' *** '
    ],
    '.': [
        '     ',
        '     ',
        '     ',
        '  *  ',
        '     '
    ],
    ',': [
        '     ',
        '     ',
        '     ',
        '  *  ',
        ' *   '
    ],
    '!': [
        '  *  ',
        '  *  ',
        '  *  ',
        '     ',
        '  *  '
    ],
    '?': [
        ' *** ',
        '*  * ',
        '  *  ',
        '     ',
        '  *  '
    ],
    '@': [
        ' *** ',
        '* * *',
        '* ***',
        '*    ',
        ' *** '
    ],
    '¿': [
        '  *  ',
        '     ',
        ' *** ',
        '*  * ',
        ' *** '
    ],
    '(': [
        '  *  ',
        ' *   ',
        ' *   ',
        ' *   ',
        '  *  '
    ],
    ')': [
        '  *  ',
        '   * ',
        '   * ',
        '   * ',
        '  *  '
    ],
    '/': [
        '    *',
        '   * ',
        '  *  ',
        ' *   ',
        '*    '
    ],
    '\\': [
        '*    ',
        ' *   ',
        '  *  ',
        '   * ',
        '    *'
    ],
    '&': [
        ' **  ',
        '*  * ',
        ' **  ',
        '*  * ',
        ' ** *'
    ],
    '%': [
        '*   *',
        '   * ',
        '  *  ',
        ' *   ',
        '*   *'
    ],
    '$': [
        ' ****',
        '* *  ',
        ' *** ',
        '  * *',
        '**** '
    ],
    '·': [
        '     ',
        '  *  ',
        '     ',
        '     ',
        '     '
    ],
    '#': [
        ' * * ',
        '*****',
        ' * * ',
        '*****',
        ' * * '
    ],
    '"': [
        '* *  ',
        '* *  ',
        '     ',
        '     ',
        '     '
    ],
    "'": [
        '  *  ',
        '  *  ',
        '     ',
        '     ',
        '     '
    ],
    '=': [
        '     ',
        '*****',
        '     ',
        '*****',
        '     '
    ],
    '¡': [
        '  *  ',
        '     ',
        '  *  ',
        '  *  ',
        '  *  '
    ]
};

/**
 * Conjuntos de caracteres disponibles para la conversión ASCII.
 * Ordenados de mayor a menor intensidad (oscuro a claro).
 */
const charSets = {
    standard: ['@', '#', 'B', '8', '&', 'o', ':', '*', '.', ' '],
    simple: ['#', '.', ' '],
    detailed: ['$', '@', 'B', '%', '8', '&', 'W', 'M', '#', '*', 'o', 'a', 'h', 'k', 'b', 'd', 'p', 'q', 'w', 'm', 'Z', 'O', '0', 'Q', 'L', 'C', 'J', 'U', 'Y', 'X', 'z', 'c', 'v', 'u', 'n', 'x', 'r', 'j', 'f', 't', '/', '\\', '|', '(', ')', '1', '{', '}', '[', ']', '?', '-', '_', '+', '~', '<', '>', 'i', '!', 'l', 'I', ';', ':', ',', '"', '^', '`', '\'', '.', ' '],
    blocks: ['█', '▀', '▄', '▌', '▐', '░', '▒', '▓', '│', '┤', '╡', '╢', '╖', '╕', '╣', '║', '╗', '╝', '╜', '╛', '┐', '└', '┴', '┬', '├', '─', '┼', '╞', '╟', '╚', '╔', '╩', '╦', '╠', '═', '╬', '╧', '╨', '╤', '╥', '╙', '╘', '╒', '╓', '╫', '╪', '┘', '┌', ' '],
    minimal: ['█', '▓', '▒', '░', ' ']
};

// Variable global para almacenar la imagen actual
let currentImage = null;

/**
 * Cambia entre las pestañas de imagen y texto
 * @param {string} tab - 'image' o 'text'
 */
function switchTab(tab) {
    if (tab === 'image') {
        imageTab.classList.add('bg-accent', 'text-white');
        textTab.classList.remove('bg-accent', 'text-white');
        imageSection.classList.remove('hidden');
        textSection.classList.add('hidden');
    } else {
        textTab.classList.add('bg-accent', 'text-white');
        imageTab.classList.remove('bg-accent', 'text-white');
        textSection.classList.remove('hidden');
        imageSection.classList.add('hidden');
    }
}

/**
 * Convierte texto normal en arte ASCII
 */
function convertTextToAscii() {
    const text = textInput.value.toUpperCase();
    if (!text) return;

    const selectedChar = charSets[charSetSelect.value][0]; // Usamos el primer carácter del conjunto seleccionado
    let result = ['', '', '', '', '']; // 5 líneas de altura

    // Procesar cada línea del texto de entrada
    const lines = text.split('\n');
    for (let line of lines) {
        // Reiniciar las 5 líneas para esta línea de texto
        let currentLines = ['', '', '', '', ''];
        
        // Procesar cada carácter de la línea
        for (let char of line) {
            // Obtener el patrón ASCII para este carácter (o espacio si no existe)
            const pattern = asciiLetters[char] || asciiLetters[' '];
            
            // Añadir cada línea del patrón a las líneas actuales
            for (let i = 0; i < 5; i++) {
                // Reemplazar los asteriscos con el carácter seleccionado
                currentLines[i] += pattern[i].replace(/\*/g, selectedChar) + ' ';
            }
        }
        
        // Añadir las líneas actuales al resultado con un salto de línea
        for (let i = 0; i < 5; i++) {
            result[i] += currentLines[i] + '\n';
        }
    }

    // Unir todas las líneas y mostrar el resultado
    output.textContent = result.join('');
}

// Event listeners
imageInput.addEventListener('change', handleImageUpload);
widthRange.addEventListener('input', updateWidth);
contrastRange.addEventListener('input', updateContrast);
invertColors.addEventListener('change', () => {
    if (currentImage) convertToAscii(currentImage);
});
charSetSelect.addEventListener('change', () => {
    if (imageSection.classList.contains('hidden')) {
        convertTextToAscii();
    } else if (currentImage) {
        convertToAscii(currentImage);
    }
});
downloadBtn.addEventListener('click', downloadAsciiArt);

// Event listeners para las tabs
imageTab.addEventListener('click', () => switchTab('image'));
textTab.addEventListener('click', () => switchTab('text'));

// Inicializar la primera tab
switchTab('image');

// Actualizar displays de valores en tiempo real
widthRange.addEventListener('input', () => {
    widthValue.textContent = widthRange.value;
});
contrastRange.addEventListener('input', () => {
    contrastValue.textContent = contrastRange.value;
});

/**
 * Maneja la carga de una nueva imagen
 * @param {Event} e - Evento de cambio del input de archivo
 */
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                currentImage = img;
                convertToAscii(img);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Actualiza el ancho del arte ASCII y regenera la imagen
 */
function updateWidth() {
    if (currentImage) {
        convertToAscii(currentImage);
    }
}

/**
 * Actualiza el contraste y regenera la imagen
 */
function updateContrast() {
    if (currentImage) {
        convertToAscii(currentImage);
    }
}

/**
 * Convierte una imagen en arte ASCII
 * @param {HTMLImageElement} img - Imagen a convertir
 */
function convertToAscii(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const width = parseInt(widthRange.value);
    const ratio = img.height / img.width;
    const height = Math.floor(width * ratio * 0.5);
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(img, 0, 0, width, height);
    
    const contrast = parseFloat(contrastRange.value);
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        for (let j = 0; j < 3; j++) {
            let color = pixels[i + j];
            color = ((color / 255 - 0.5) * contrast + 0.5) * 255;
            pixels[i + j] = Math.max(0, Math.min(255, color));
        }
    }
    ctx.putImageData(imageData, 0, 0);
    
    const selectedChars = charSets[charSetSelect.value];
    let asciiArt = '';
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
            let charIndex = Math.floor(brightness / 255 * (selectedChars.length - 1));
            
            if (invertColors.checked) {
                charIndex = selectedChars.length - 1 - charIndex;
            }
            
            asciiArt += selectedChars[charIndex];
        }
        asciiArt += '\n';
    }
    
    const fontSize = Math.max(6, Math.min(12, Math.floor(800 / width)));
    output.style.fontSize = `${fontSize}px`;
    output.style.lineHeight = `${fontSize}px`;
    
    output.textContent = asciiArt;
}

/**
 * Descarga el arte ASCII actual como archivo de texto
 */
function downloadAsciiArt() {
    const text = output.textContent;
    if (!text) return;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-art.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
