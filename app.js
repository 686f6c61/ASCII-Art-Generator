/**
 * ASCII Art Generator
 * 
 * Generador de ASCII art mejorado con múltiples funcionalidades:
 * - Conversión de imagen a ASCII con personalización avanzada
 * - Conversión de texto a ASCII art
 * - Dibujo a mano para crear ASCII art
 * - Tema oscuro/claro
 * - Historial de conversiones
 * - Múltiples conjuntos de caracteres
 * - Opciones de compartir
 * 
 * @author 686f6c61
 * @version 2.1.0
 * @license MIT
 */

// =============================================================================
// DICCIONARIOS Y CONSTANTES
// =============================================================================

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
        '*****'
    ],
    '2': [
        ' *** ',
        '*   *',
        '  ** ',
        ' *   ',
        '*****'
    ],
    '3': [
        '*****',
        '    *',
        '  ***',
        '    *',
        '*****'
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
        ' *** ',
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
    '¿': [
        '  *  ',
        '     ',
        '  *  ',
        ' *   ',
        '  ***'
    ],
    '?': [
        ' *** ',
        '*   *',
        '   * ',
        '     ',
        '  *  '
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
        '     ',
        '  *  ',
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
        '* * *',
        '* * *',
        '     ',
        '     ',
        '     '
    ],
    '!': [
        '  *  ',
        '  *  ',
        '  *  ',
        '     ',
        '  *  '
    ],
    '¡': [
        '  *  ',
        '     ',
        '  *  ',
        '  *  ',
        '  *  '
    ],
    '\'': [
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
    '@': [
        ' *** ',
        '*   *',
        '* * *',
        '* ***',
        ' *** '
    ],
    '.': [
        '     ',
        '     ',
        '     ',
        '     ',
        '  *  '
    ],
    ',': [
        '     ',
        '     ',
        '     ',
        '  *  ',
        ' *   '
    ],
    ' ': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     '
    ]
};

/**
 * Conjuntos de caracteres disponibles para la conversión ASCII.
 * Ordenados de mayor a menor intensidad (oscuro a claro).
 */
const charSets = {
    standard: {
        name: 'Estándar',
        chars: '@#B8&o:*. '
    },
    simple: {
        name: 'Simple',
        chars: '#. '
    },
    detailed: {
        name: 'Detallado',
        chars: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'
    },
    blocks: {
        name: 'Bloques Unicode',
        chars: '█▓▒░ '
    },
    minimal: {
        name: 'Minimal Blocks',
        chars: '█▉▊▋▌▍▎▏ '
    },
    matrix: {
        name: 'Estilo Matrix',
        chars: '01 '
    },
    braille: {
        name: 'Braille Unicode',
        chars: '⣿⣷⣯⣟⣿⣻⣽⣾ '
    },
    custom: {
        name: 'Personalizado',
        chars: '' // Se configurará dinámicamente
    }
};

// =============================================================================
// ELEMENTOS DOM
// =============================================================================
let imageInput, widthRange, contrastRange, invertColors, charSetSelect, downloadBtn;
let widthValue, contrastValue, output, textInput, brightnessRange, brightnessValue;
let imageTab, textTab, drawTab, imageSection, textSection, drawSection;
let dropZone, imageUrl, loadUrlImage, coloredOutput, customCharSet, customCharSetContainer;
let fontSizeOutput, shareBtn, copyBtn, themeToggle, historyBtn;
let outputContainer, drawCanvas, clearCanvas, undoCanvas, convertDrawing;
let textSize, convertTextBtn, historyModal, shareModal, closeHistoryBtn, closeShareBtn;
let historyItems, emptyHistory, clearHistoryBtn, shareBtns;

// Estado global de la aplicación
const appState = {
    currentTab: 'image',
    currentImage: null,
    lastAsciiArt: '',
    isDrawing: false,
    canvas: {
        context: null,
        paths: [],
        currentPath: [],
        isDrawing: false
    },
    theme: localStorage.getItem('theme') || 'light',
    history: JSON.parse(localStorage.getItem('asciiHistory')) || [],
    config: {
        width: 100,
        contrast: 1,
        brightness: 0,
        invert: false,
        colored: false,
        charSet: 'standard',
        fontSize: 'text-xs',
        textSize: 'medium'
    }
};

// =============================================================================
// FUNCIONES DE CONVERSIÓN DE TEXTO
// =============================================================================

/**
 * Convierte texto normal en arte ASCII
 */
function convertTextToAscii() {
    const text = textInput.value.trim();
    
    if (!text) {
        createNotification('Por favor, ingresa algún texto', 'info');
        return;
    }
    
    // Convertir el texto a mayúsculas (el diccionario solo tiene mayúsculas)
    const upperText = text.toUpperCase();
    
    // Matriz para almacenar las 5 líneas del arte ASCII
    const asciiLines = ['', '', '', '', ''];
    
    // Procesar cada carácter del texto
    for (let char of upperText) {
        // Verificar si el carácter está en el diccionario
        if (asciiLetters[char]) {
            // Agregar cada línea del patrón del carácter a la línea correspondiente
            for (let i = 0; i < 5; i++) {
                asciiLines[i] += asciiLetters[char][i];
            }
        } else {
            // Para caracteres no soportados, agregar espacios
            for (let i = 0; i < 5; i++) {
                asciiLines[i] += '     ';
            }
        }
    }
    
    // Unir las líneas con saltos de línea
    const asciiArt = asciiLines.join('\n');
    
    // Guardar el arte ASCII generado
    appState.lastAsciiArt = asciiArt;
    
    // Actualizar salida
    output.textContent = asciiArt;
}

// =============================================================================
// FUNCIONES DE CONVERSIÓN DE IMAGEN
// =============================================================================

/**
 * Convierte una imagen en arte ASCII
 * @param {HTMLImageElement} img - Imagen a convertir
 */
function convertToAscii(img) {
    // Obtener la configuración
    const width = parseInt(widthRange.value, 10);
    const contrast = parseFloat(contrastRange.value);
    const invert = invertColors.checked;
    const selectedCharSet = charSetSelect.value;
    
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
    const chars = charSets[selectedCharSet].chars;
    
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
        asciiImage += '\n';
    }
    
    // Mostrar resultado
    output.textContent = asciiImage;
    
    // Guardar el arte ASCII generado
    appState.lastAsciiArt = asciiImage;
}

/**
 * Procesa la carga de una nueva imagen
 * @param {Event} e - Evento de cambio del input de archivo
 */
function handleImageUpload(e) {
    const file = e.target.files[0];
    
    if (!file || !file.type.startsWith('image/')) {
        createNotification('El archivo seleccionado no es una imagen válida', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
        const img = new Image();
        
        img.onload = () => {
            // Guardar la imagen para uso futuro
            appState.currentImage = img;
            
            // Convertir y mostrar
            convertToAscii(img);
            
            createNotification('Imagen cargada correctamente', 'success');
        };
        
        img.onerror = () => {
            createNotification('Error al cargar la imagen', 'error');
        };
        
        img.src = event.target.result;
    };
    
    reader.onerror = () => {
        createNotification('Error al leer el archivo', 'error');
    };
    
    reader.readAsDataURL(file);
}

// =============================================================================
// FUNCIONES DE UI
// =============================================================================

/**
 * Cambia entre las pestañas de imagen, texto y dibujo
 * @param {string} tab - 'image', 'text' o 'draw'
 */
function switchTab(tab) {
    // Eliminar clase activa de todas las pestañas
    imageTab.classList.remove('active-tab');
    textTab.classList.remove('active-tab');
    drawTab.classList.remove('active-tab');
    
    // Ocultar todas las secciones
    imageSection.classList.add('hidden');
    textSection.classList.add('hidden');
    drawSection.classList.add('hidden');
    
    // Activar la pestaña y sección seleccionada
    if (tab === 'image') {
        imageTab.classList.add('active-tab');
        imageSection.classList.remove('hidden');
    } else if (tab === 'text') {
        textTab.classList.add('active-tab');
        textSection.classList.remove('hidden');
    } else if (tab === 'draw') {
        drawTab.classList.add('active-tab');
        drawSection.classList.remove('hidden');
        initCanvas(); // Inicializa el canvas si se selecciona la pestaña de dibujo
    }
    
    // Limpiar salida cuando se cambia de pestaña
    output.textContent = '';
    appState.lastAsciiArt = '';
    appState.currentTab = tab;
}

/**
 * Inicializa el canvas para dibujo
 */
function initCanvas() {
    if (!appState.canvas.context) {
        const ctx = drawCanvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        
        // Guardar el contexto
        appState.canvas.context = ctx;
        
        // Limpiar canvas
        clearCanvasDrawing();
    }
}

/**
 * Maneja el inicio del dibujo en el canvas
 * @param {Event} e - Evento del mouse o táctil
 */
function startDrawing(e) {
    e.preventDefault();
    appState.canvas.isDrawing = true;
    
    // Posición inicial del trazo
    const { x, y } = getCanvasCoordinates(e);
    appState.canvas.currentPath = [{ x, y }];
    
    // Dibujar primer punto
    const ctx = appState.canvas.context;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
}

/**
 * Maneja el dibujo en el canvas
 * @param {Event} e - Evento del mouse o táctil
 */
function draw(e) {
    if (!appState.canvas.isDrawing) return;
    e.preventDefault();
    
    // Obtener coordenadas actuales
    const { x, y } = getCanvasCoordinates(e);
    
    // Guardar coordenadas en el trazo actual
    appState.canvas.currentPath.push({ x, y });
    
    // Dibujar línea
    const ctx = appState.canvas.context;
    ctx.lineTo(x, y);
    ctx.stroke();
}

/**
 * Maneja el fin del dibujo en el canvas
 */
function endDrawing() {
    if (!appState.canvas.isDrawing) return;
    
    appState.canvas.isDrawing = false;
    
    // Si el trazo tiene puntos, añadirlo al historial de trazos
    if (appState.canvas.currentPath.length > 0) {
        appState.canvas.paths.push([...appState.canvas.currentPath]);
        appState.canvas.currentPath = [];
    }
}

/**
 * Obtiene las coordenadas del canvas a partir del evento
 * @param {Event} e - Evento de mouse o táctil
 * @returns {Object} - Coordenadas { x, y }
 */
function getCanvasCoordinates(e) {
    const rect = drawCanvas.getBoundingClientRect();
    let x, y;
    
    // Comprobar tipo de evento (mouse o táctil)
    if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    
    // Ajustar a escala del canvas
    x = x * (drawCanvas.width / rect.width);
    y = y * (drawCanvas.height / rect.height);
    
    return { x, y };
}

/**
 * Limpia el dibujo del canvas
 */
function clearCanvasDrawing() {
    if (!appState.canvas.context) return;
    
    const ctx = appState.canvas.context;
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    
    // Limpiar historial de trazos
    appState.canvas.paths = [];
    appState.canvas.currentPath = [];
}

/**
 * Deshace el último trazo dibujado
 */
function undoCanvasDrawing() {
    if (!appState.canvas.context || appState.canvas.paths.length === 0) return;
    
    // Eliminar último trazo
    appState.canvas.paths.pop();
    
    // Redibujar canvas
    const ctx = appState.canvas.context;
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    
    // Dibujar todos los trazos restantes
    for (const path of appState.canvas.paths) {
        if (path.length > 0) {
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo(path[i].x, path[i].y);
            }
            
            ctx.stroke();
        }
    }
}

/**
 * Convierte el dibujo del canvas a ASCII art
 */
function convertDrawingToAscii() {
    if (!appState.canvas.context) return;
    
    // Usar el canvas como fuente para la conversión
    const img = new Image();
    img.onload = function() {
        appState.currentImage = img;
        convertToAscii(img);
    };
    
    // Convertir canvas a imagen
    img.src = drawCanvas.toDataURL('image/png');
}

/**
 * Actualiza el ancho del arte ASCII y regenera la imagen
 */
function updateWidth() {
    widthValue.textContent = widthRange.value;
    if (appState.currentImage) {
        convertToAscii(appState.currentImage);
    }
}

/**
 * Actualiza el contraste y regenera la imagen
 */
function updateContrast() {
    contrastValue.textContent = contrastRange.value;
    if (appState.currentImage) {
        convertToAscii(appState.currentImage);
    }
}

/**
 * Descarga el arte ASCII actual como archivo de texto
 */
function downloadAsciiArt() {
    if (!appState.lastAsciiArt) {
        createNotification('Nada que descargar. Genera primero un arte ASCII.', 'info');
        return;
    }
    
    // Prefijo del archivo según el tipo de conversión
    const prefix = appState.currentTab === 'image' ? 'image-ascii' : 
                 appState.currentTab === 'text' ? 'text-ascii' : 'drawing-ascii';
    
    // Crear un elemento <a> para la descarga
    const link = document.createElement('a');
    
    // Crear un Blob con el contenido ASCII
    const blob = new Blob([appState.lastAsciiArt], { type: 'text/plain' });
    
    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);
    
    // Configurar el enlace de descarga
    link.href = url;
    
    // Obtener fecha actual formateada
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    
    link.download = `${prefix}-${dateStr}.txt`;
    
    // Añadir temporalmente al documento, simular clic y eliminar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Liberar la URL del objeto
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    // Añadir al historial si no está ya
    addToHistory();
    
    createNotification('ASCII Art descargado correctamente', 'success');
}

/**
 * Cambia entre el tema claro y oscuro
 */
function toggleTheme() {
    // Cambiar el tema
    const newTheme = appState.theme === 'light' ? 'dark' : 'light';
    appState.theme = newTheme;
    
    // Guardar preferencia
    localStorage.setItem('theme', newTheme);
    
    // Aplicar tema
    applyTheme(newTheme);
}

/**
 * Aplica el tema seleccionado (claro u oscuro)
 * @param {string} theme - 'light' o 'dark'
 */
function applyTheme(theme) {
    const body = document.getElementById('appBody');
    const themeIcon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        // Aplicar tema oscuro
        body.classList.add('bg-dark-bg');
        body.classList.add('text-dark-text');
        body.classList.remove('bg-gray-50');
        
        // Cambiar icono
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
        // Aplicar clases oscuras a elementos
        document.querySelectorAll('.bg-white').forEach(el => {
            el.classList.add('bg-dark-secondary');
            el.classList.remove('bg-white');
        });
        
        document.querySelectorAll('.text-gray-700').forEach(el => {
            el.classList.add('text-gray-300');
            el.classList.remove('text-gray-700');
        });
        
        document.querySelectorAll('.border-gray-100, .border-gray-200, .border-gray-300').forEach(el => {
            el.classList.add('border-gray-700');
            el.classList.remove('border-gray-100');
            el.classList.remove('border-gray-200');
            el.classList.remove('border-gray-300');
        });
        
        document.querySelectorAll('.bg-gray-50, .bg-gray-100, .bg-gray-200').forEach(el => {
            el.classList.add('bg-dark-primary');
            el.classList.remove('bg-gray-50');
            el.classList.remove('bg-gray-100');
            el.classList.remove('bg-gray-200');
        });
    } else {
        // Aplicar tema claro
        body.classList.remove('bg-dark-bg');
        body.classList.remove('text-dark-text');
        body.classList.add('bg-gray-50');
        
        // Cambiar icono
        themeIcon.classList.add('fa-moon');
        themeIcon.classList.remove('fa-sun');
        
        // Revertir clases oscuras
        document.querySelectorAll('.bg-dark-secondary').forEach(el => {
            el.classList.remove('bg-dark-secondary');
            el.classList.add('bg-white');
        });
        
        document.querySelectorAll('.text-gray-300').forEach(el => {
            el.classList.remove('text-gray-300');
            el.classList.add('text-gray-700');
        });
        
        document.querySelectorAll('.border-gray-700').forEach(el => {
            el.classList.remove('border-gray-700');
            el.classList.add('border-gray-200');
        });
        
        document.querySelectorAll('.bg-dark-primary').forEach(el => {
            el.classList.remove('bg-dark-primary');
            el.classList.add('bg-gray-50');
        });
    }
}

/**
 * Añade la conversión actual al historial
 */
function addToHistory() {
    if (!appState.lastAsciiArt) return;
    
    // Crear un elemento para el historial
    const historyItem = {
        id: Date.now(),
        type: appState.currentTab,
        content: appState.lastAsciiArt,
        timestamp: new Date().toISOString(),
        config: { ...appState.config }
    };
    
    // No añadir si ya existe un elemento idéntico
    const exists = appState.history.some(item => 
        item.content === historyItem.content && item.type === historyItem.type
    );
    
    if (!exists) {
        // Añadir al principio para que los más recientes aparezcan primero
        appState.history.unshift(historyItem);
        
        // Limitar el historial a 10 elementos para no ocupar demasiado espacio
        if (appState.history.length > 10) {
            appState.history.pop();
        }
        
        // Guardar en localStorage
        localStorage.setItem('asciiHistory', JSON.stringify(appState.history));
    }
}

/**
 * Muestra el modal de historial con las conversiones guardadas
 */
function showHistoryModal() {
    historyModal.classList.remove('hidden');
    renderHistoryItems();
}

/**
 * Cierra el modal de historial
 */
function closeHistoryModal() {
    historyModal.classList.add('hidden');
}

/**
 * Renderiza los elementos del historial en el modal
 */
function renderHistoryItems() {
    // Limpiar contenedor
    historyItems.innerHTML = '';
    
    // Mostrar mensaje si no hay elementos
    if (appState.history.length === 0) {
        emptyHistory.classList.remove('hidden');
        return;
    }
    
    // Ocultar mensaje de vacío
    emptyHistory.classList.add('hidden');
    
    // Renderizar cada elemento
    appState.history.forEach(item => {
        const date = new Date(item.timestamp);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        
        // Crear elemento del historial
        const historyItemEl = document.createElement('div');
        historyItemEl.className = 'bg-gray-50 dark:bg-dark-primary rounded-lg p-3 border border-gray-200 dark:border-gray-700';
        
        // Generar vista previa truncada
        const preview = item.content.substring(0, 50) + (item.content.length > 50 ? '...' : '');
        
        // Tipo de conversión
        const typeLabel = item.type === 'image' ? 'Imagen a ASCII' : 
                         item.type === 'text' ? 'Texto a ASCII' : 'Dibujo a ASCII';
        
        // HTML del elemento
        historyItemEl.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <span class="text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded">${typeLabel}</span>
                    <span class="text-xs text-gray-500 ml-2">${formattedDate}</span>
                </div>
                <button class="text-gray-400 hover:text-gray-600 history-restore" data-id="${item.id}">
                    <i class="fas fa-arrow-rotate-left"></i>
                </button>
            </div>
            <div class="text-xs font-mono bg-gray-100 dark:bg-dark-primary p-2 rounded overflow-x-auto whitespace-pre">${preview.replace(/\n/g, '<br>')}</div>
        `;
        
        // Añadir al contenedor
        historyItems.appendChild(historyItemEl);
    });
    
    // Añadir event listeners a los botones de restaurar
    document.querySelectorAll('.history-restore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            restoreFromHistory(id);
        });
    });
}

/**
 * Restaura una conversión del historial
 * @param {number} id - ID del elemento a restaurar
 */
function restoreFromHistory(id) {
    // Buscar el elemento en el historial
    const item = appState.history.find(item => item.id === id);
    if (!item) return;
    
    // Cambiar a la pestaña correspondiente
    switchTab(item.type);
    
    // Restaurar configuración
    if (item.config) {
        // Restaurar solo la configuración aplicable
        Object.keys(item.config).forEach(key => {
            if (appState.config.hasOwnProperty(key)) {
                appState.config[key] = item.config[key];
            }
        });
        
        // Actualizar controles de UI
        updateUIFromConfig();
    }
    
    // Mostrar el contenido
    appState.lastAsciiArt = item.content;
    output.textContent = item.content;
    
    // Cerrar modal
    closeHistoryModal();
    
    createNotification('Conversión restaurada desde el historial', 'success');
}

/**
 * Actualiza los controles de UI basados en la configuración
 */
function updateUIFromConfig() {
    // Actualizar sliders y checkboxes
    widthRange.value = appState.config.width;
    widthValue.textContent = appState.config.width;
    
    contrastRange.value = appState.config.contrast;
    contrastValue.textContent = appState.config.contrast;
    
    if (brightnessRange) {
        brightnessRange.value = appState.config.brightness;
        brightnessValue.textContent = appState.config.brightness;
    }
    
    invertColors.checked = appState.config.invert;
    
    if (coloredOutput) {
        coloredOutput.checked = appState.config.colored;
    }
    
    charSetSelect.value = appState.config.charSet;
    
    // Manejar conjunto personalizado
    if (appState.config.charSet === 'custom' && customCharSet) {
        customCharSetContainer.classList.remove('hidden');
        customCharSet.value = charSets.custom.chars;
    } else if (customCharSetContainer) {
        customCharSetContainer.classList.add('hidden');
    }
    
    // Actualizar tamaño de fuente
    if (fontSizeOutput) {
        fontSizeOutput.value = appState.config.fontSize;
        output.className = `font-mono overflow-x-auto whitespace-pre ${appState.config.fontSize}`;
    }
    
    // Actualizar tamaño de texto
    if (textSize) {
        textSize.value = appState.config.textSize;
    }
}

/**
 * Limpia el historial de conversiones
 */
function clearHistory() {
    // Confirmar antes de borrar
    if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
        appState.history = [];
        localStorage.removeItem('asciiHistory');
        renderHistoryItems();
        createNotification('Historial borrado correctamente', 'success');
    }
}

/**
 * Muestra el modal para compartir
 */
function showShareModal() {
    if (!appState.lastAsciiArt) {
        createNotification('No hay nada para compartir. Genera primero un arte ASCII.', 'info');
        return;
    }
    
    shareModal.classList.remove('hidden');
}

/**
 * Cierra el modal de compartir
 */
function closeShareModal() {
    shareModal.classList.add('hidden');
}

/**
 * Comparte el ASCII art en diferentes plataformas
 * @param {string} platform - Plataforma donde compartir
 */
function shareAsciiArt(platform) {
    if (!appState.lastAsciiArt) return;
    
    // Crear un texto para compartir
    const title = 'ASCII Art creado con ASCII Art Generator';
    const url = window.location.href;
    
    // Texto a compartir (más corto para redes sociales)
    const shareText = appState.lastAsciiArt.length > 500 ? 
        appState.lastAsciiArt.substring(0, 500) + '...' : 
        appState.lastAsciiArt;
    
    // Diferentes plataformas
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'reddit') {
        window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'link') {
        // Copiar el enlace al portapapeles
        navigator.clipboard.writeText(url)
            .then(() => createNotification('Enlace copiado al portapapeles', 'success'))
            .catch(() => createNotification('Error al copiar el enlace', 'error'));
    }
    
    // Cerrar el modal
    closeShareModal();
}

// =============================================================================
// UTILIDADES
// =============================================================================

/**
 * Crea un elemento de notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'error', 'info')
 */
function createNotification(message, type = 'info') {
    // Crear contenedor del mensaje
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Agregar estilos básicos
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        borderRadius: '4px',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    });
    
    // Estilos según tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#F44336';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#2196F3';
        notification.style.color = 'white';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.style.opacity = '1', 10);
    
    // Eliminar después de un tiempo
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

/**
 * Agrega un botón de copiar al portapapeles
 */
function createCopyButton() {
    // Crear botón
    const copyBtn = document.createElement('button');
    copyBtn.className = 'w-full px-4 py-2 bg-secondary text-white text-base rounded-md hover:bg-secondary/90 transition-colors font-medium mt-2';
    copyBtn.textContent = 'Copiar ASCII Art';
    
    // Agregar evento
    copyBtn.addEventListener('click', async () => {
        if (!appState.lastAsciiArt) {
            createNotification('Nada que copiar. Genera primero un arte ASCII.', 'info');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(appState.lastAsciiArt);
            createNotification('Copiado al portapapeles', 'success');
        } catch (error) {
            console.error('Error al copiar:', error);
            createNotification('Error al copiar', 'error');
        }
    });
    
    // Encontrar el contenedor del botón de descarga y agregar el nuevo botón después
    const downloadContainer = downloadBtn.parentElement;
    downloadContainer.parentElement.appendChild(copyBtn);
}

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

/**
 * Inicializa la aplicación
 */
function initApp() {
    // Obtener referencias a elementos DOM - Elementos principales
    imageInput = document.getElementById('imageInput');
    widthRange = document.getElementById('widthRange');
    contrastRange = document.getElementById('contrastRange');
    invertColors = document.getElementById('invertColors');
    charSetSelect = document.getElementById('charSet');
    downloadBtn = document.getElementById('downloadBtn');
    widthValue = document.getElementById('widthValue');
    contrastValue = document.getElementById('contrastValue');
    output = document.getElementById('ascii-output');
    textInput = document.getElementById('textInput');
    
    // Pestañas
    imageTab = document.getElementById('imageTab');
    textTab = document.getElementById('textTab');
    drawTab = document.getElementById('drawTab');
    imageSection = document.getElementById('imageSection');
    textSection = document.getElementById('textSection');
    drawSection = document.getElementById('drawSection');
    
    // Elementos nuevos - Controles de imagen
    dropZone = document.getElementById('dropZone');
    imageUrl = document.getElementById('imageUrl');
    loadUrlImage = document.getElementById('loadUrlImage');
    coloredOutput = document.getElementById('coloredOutput');
    brightnessRange = document.getElementById('brightnessRange');
    brightnessValue = document.getElementById('brightnessValue');
    
    // Elementos de personalización
    customCharSet = document.getElementById('customCharSet');
    customCharSetContainer = document.getElementById('customCharSetContainer');
    fontSizeOutput = document.getElementById('fontSizeOutput');
    outputContainer = document.getElementById('outputContainer');
    shareBtn = document.getElementById('shareBtn');
    copyBtn = document.getElementById('copyBtn');
    
    // Elementos de tema e historial
    themeToggle = document.getElementById('themeToggle');
    historyBtn = document.getElementById('historyBtn');
    
    // Canvas y controles de dibujo
    drawCanvas = document.getElementById('drawCanvas');
    clearCanvas = document.getElementById('clearCanvas');
    undoCanvas = document.getElementById('undoCanvas');
    convertDrawing = document.getElementById('convertDrawing');
    
    // Elementos de la sección de texto
    textSize = document.getElementById('textSize');
    convertTextBtn = document.getElementById('convertTextBtn');
    
    // Modales
    historyModal = document.getElementById('historyModal');
    shareModal = document.getElementById('shareModal');
    closeHistoryBtn = document.getElementById('closeHistoryBtn');
    closeShareBtn = document.getElementById('closeShareBtn');
    historyItems = document.getElementById('historyItems');
    emptyHistory = document.getElementById('emptyHistory');
    clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    // Botones de compartir
    shareBtns = document.querySelectorAll('.share-btn');
    
    // ---------------------------------------------------------------
    // Configurar event listeners - Eventos principales
    // ---------------------------------------------------------------
    
    // Pestañas
    imageTab.addEventListener('click', () => switchTab('image'));
    textTab.addEventListener('click', () => switchTab('text'));
    drawTab.addEventListener('click', () => switchTab('draw'));
    
    // Controles básicos
    widthRange.addEventListener('input', () => {
        widthValue.textContent = widthRange.value;
        appState.config.width = parseInt(widthRange.value);
        if (appState.currentImage) convertToAscii(appState.currentImage);
    });
    
    contrastRange.addEventListener('input', () => {
        contrastValue.textContent = contrastRange.value;
        appState.config.contrast = parseFloat(contrastRange.value);
        if (appState.currentImage) convertToAscii(appState.currentImage);
    });
    
    if (brightnessRange) {
        brightnessRange.addEventListener('input', () => {
            brightnessValue.textContent = brightnessRange.value;
            appState.config.brightness = parseInt(brightnessRange.value);
            if (appState.currentImage) convertToAscii(appState.currentImage);
        });
    }
    
    invertColors.addEventListener('change', () => {
        appState.config.invert = invertColors.checked;
        if (appState.currentImage) convertToAscii(appState.currentImage);
    });
    
    if (coloredOutput) {
        coloredOutput.addEventListener('change', () => {
            appState.config.colored = coloredOutput.checked;
            if (appState.currentImage) convertToAscii(appState.currentImage);
        });
    }
    
    charSetSelect.addEventListener('change', () => {
        appState.config.charSet = charSetSelect.value;
        
        // Mostrar/ocultar configuración personalizada
        if (charSetSelect.value === 'custom' && customCharSetContainer) {
            customCharSetContainer.classList.remove('hidden');
        } else if (customCharSetContainer) {
            customCharSetContainer.classList.add('hidden');
        }
        
        if (appState.currentImage) convertToAscii(appState.currentImage);
    });
    
    if (customCharSet) {
        customCharSet.addEventListener('input', () => {
            charSets.custom.chars = customCharSet.value;
            if (appState.currentImage) convertToAscii(appState.currentImage);
        });
    }
    
    if (fontSizeOutput) {
        fontSizeOutput.addEventListener('change', () => {
            appState.config.fontSize = fontSizeOutput.value;
            output.className = `font-mono overflow-x-auto whitespace-pre ${appState.config.fontSize}`;
        });
    }
    
    // ---------------------------------------------------------------
    // Zona de arrastrar y subir imágenes
    // ---------------------------------------------------------------
    
    // Manejo de la subida normal de archivo
    imageInput.addEventListener('change', handleImageUpload);
    
    // DropZone - arrastrar y soltar
    if (dropZone) {
        // Evento de clic para abrir el selector de archivos
        dropZone.addEventListener('click', () => {
            imageInput.click();
        });
        
        // Eventos para arrastrar y soltar
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-accent');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-accent');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-accent');
            
            if (e.dataTransfer.files.length) {
                imageInput.files = e.dataTransfer.files;
                handleImageUpload({ target: { files: e.dataTransfer.files } });
            }
        });
    }
    
    // Cargar imagen desde URL
    if (loadUrlImage && imageUrl) {
        loadUrlImage.addEventListener('click', () => {
            const url = imageUrl.value.trim();
            if (!url) {
                createNotification('Por favor, introduce una URL válida', 'info');
                return;
            }
            
            // Cargar imagen desde URL
            const img = new Image();
            img.crossOrigin = 'Anonymous';  // Permitir CORS
            img.onload = () => {
                appState.currentImage = img;
                convertToAscii(img);
                createNotification('Imagen cargada correctamente', 'success');
            };
            img.onerror = () => {
                createNotification('Error al cargar la imagen desde la URL', 'error');
            };
            img.src = url;
        });
    }
    
    // ---------------------------------------------------------------
    // Eventos para controles de texto a ASCII
    // ---------------------------------------------------------------
    
    if (convertTextBtn) {
        convertTextBtn.addEventListener('click', convertTextToAscii);
    }
    
    if (textSize) {
        textSize.addEventListener('change', () => {
            appState.config.textSize = textSize.value;
            if (textInput.value.trim()) {
                convertTextToAscii();
            }
        });
    }
    
    // Conversión en tiempo real para texto
    if (textInput) {
        textInput.addEventListener('input', () => {
            // Debounce para no saturar con cada tecla
            clearTimeout(textInput.timer);
            textInput.timer = setTimeout(() => {
                if (textInput.value.trim()) {
                    convertTextToAscii();
                }
            }, 300);
        });
    }
    
    // ---------------------------------------------------------------
    // Eventos para dibujo
    // ---------------------------------------------------------------
    
    if (drawCanvas) {
        // Eventos de dibujo con mouse
        drawCanvas.addEventListener('mousedown', startDrawing);
        drawCanvas.addEventListener('mousemove', draw);
        drawCanvas.addEventListener('mouseup', endDrawing);
        drawCanvas.addEventListener('mouseout', endDrawing);
        
        // Eventos de dibujo táctil
        drawCanvas.addEventListener('touchstart', startDrawing);
        drawCanvas.addEventListener('touchmove', draw);
        drawCanvas.addEventListener('touchend', endDrawing);
        drawCanvas.addEventListener('touchcancel', endDrawing);
    }
    
    if (clearCanvas) {
        clearCanvas.addEventListener('click', clearCanvasDrawing);
    }
    
    if (undoCanvas) {
        undoCanvas.addEventListener('click', undoCanvasDrawing);
    }
    
    if (convertDrawing) {
        convertDrawing.addEventListener('click', convertDrawingToAscii);
    }
    
    // ---------------------------------------------------------------
    // Eventos para acciones de descarga, copiar y compartir
    // ---------------------------------------------------------------
    
    downloadBtn.addEventListener('click', downloadAsciiArt);
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!appState.lastAsciiArt) {
                createNotification('No hay nada que copiar. Genera primero un arte ASCII.', 'info');
                return;
            }
            
            try {
                await navigator.clipboard.writeText(appState.lastAsciiArt);
                createNotification('Copiado al portapapeles', 'success');
            } catch (error) {
                console.error('Error al copiar:', error);
                createNotification('Error al copiar', 'error');
            }
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', showShareModal);
    }
    
    // Botones de compartir en el modal
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.dataset.share;
            shareAsciiArt(platform);
        });
    });
    
    // ---------------------------------------------------------------
    // Eventos para tema e historial
    // ---------------------------------------------------------------
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (historyBtn) {
        historyBtn.addEventListener('click', showHistoryModal);
    }
    
    if (closeHistoryBtn) {
        closeHistoryBtn.addEventListener('click', closeHistoryModal);
    }
    
    if (closeShareBtn) {
        closeShareBtn.addEventListener('click', closeShareModal);
    }
    
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
    
    // ---------------------------------------------------------------
    // Inicializaciones finales
    // ---------------------------------------------------------------
    
    // Aplicar tema desde localStorage
    applyTheme(appState.theme);
    
    // Inicializar contenedor personalizado oculto por defecto
    if (customCharSetContainer) {
        customCharSetContainer.classList.add('hidden');
    }
    
    console.log('ASCII Art Generator v2.1 inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
