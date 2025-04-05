/**
 * ASCII Art Generator - Archivo Principal
 * 
 * Coordina la inicialización y funcionamiento de la aplicación.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la aplicación
    initApp();
});

/**
 * Inicializa la aplicación
 */
function initApp() {
    console.log('Inicializando ASCII Art Generator v2.1.0...');
    
    // Inicialización de referencias a elementos DOM
    initDOMReferences();
    
    // Configuración de event listeners
    setupEventListeners();
    
    // Inicializaciones finales
    finalSetup();
    
    console.log('ASCII Art Generator v2.1.0 inicializado correctamente');
}

/**
 * Inicializa todas las referencias a elementos DOM
 */
function initDOMReferences() {
    // Elementos principales
    AsciiApp.elements = {
        // Pestañas
        imageTab: document.getElementById('imageTab'),
        textTab: document.getElementById('textTab'),
        drawTab: document.getElementById('drawTab'),
        imageSection: document.getElementById('imageSection'),
        textSection: document.getElementById('textSection'),
        drawSection: document.getElementById('drawSection'),
        
        // Input y controles de imagen
        imageInput: document.getElementById('imageInput'),
        widthRange: document.getElementById('widthRange'),
        contrastRange: document.getElementById('contrastRange'),
        brightnessRange: document.getElementById('brightnessRange'),
        invertColors: document.getElementById('invertColors'),
        coloredOutput: document.getElementById('coloredOutput'),
        charSetSelect: document.getElementById('charSet'),
        widthValue: document.getElementById('widthValue'),
        contrastValue: document.getElementById('contrastValue'),
        brightnessValue: document.getElementById('brightnessValue'),
        
        // Elementos relacionados con dibujo
        drawCanvas: document.getElementById('drawCanvas'),
        clearCanvas: document.getElementById('clearCanvas'),
        undoCanvas: document.getElementById('undoCanvas'),
        convertDrawing: document.getElementById('convertDrawing'),
        
        // Elementos de subida de imagen
        dropZone: document.getElementById('dropZone'),
        imageUrl: document.getElementById('imageUrl'),
        loadUrlImage: document.getElementById('loadUrlImage'),
        
        // Input y controles de texto
        textInput: document.getElementById('textInput'),
        textSize: document.getElementById('textSize'),
        convertTextBtn: document.getElementById('convertTextBtn'),
        
        // Salida y personalización
        output: document.getElementById('ascii-output'),
        outputContainer: document.getElementById('outputContainer'),
        customCharSet: document.getElementById('customCharSet'),
        customCharSetContainer: document.getElementById('customCharSetContainer'),
        fontSizeOutput: document.getElementById('fontSizeOutput'),
        
        // Acciones
        downloadBtn: document.getElementById('downloadBtn'),
        downloadImageBtn: document.getElementById('downloadImageBtn'),
        copyBtn: document.getElementById('copyBtn'),

        
        // Tema e historial
        themeToggle: document.getElementById('themeToggle'),
        historyBtn: document.getElementById('historyBtn'),
        
        // Modales
        historyModal: document.getElementById('historyModal'),

        closeHistoryBtn: document.getElementById('closeHistoryBtn'),

        historyItems: document.getElementById('historyItems'),
        emptyHistory: document.getElementById('emptyHistory'),
        clearHistoryBtn: document.getElementById('clearHistoryBtn'),
        
        // Compartir

    };
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // Referencias cortas para facilitar acceso
    const el = AsciiApp.elements;
    
    // ---------------------------------------------------------------
    // Configurar event listeners - Eventos principales
    // ---------------------------------------------------------------
    
    // Pestañas
    if (el.imageTab) el.imageTab.addEventListener('click', () => AsciiApp.uiManager.switchTab('image'));
    if (el.textTab) el.textTab.addEventListener('click', () => AsciiApp.uiManager.switchTab('text'));
    if (el.drawTab) el.drawTab.addEventListener('click', () => AsciiApp.uiManager.switchTab('draw'));
    
    // Controles básicos para la conversión de imágenes
    if (el.widthRange) {
        el.widthRange.addEventListener('input', () => {
            el.widthValue.textContent = el.widthRange.value;
            AsciiApp.state.config.width = parseInt(el.widthRange.value);
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    if (el.contrastRange) {
        el.contrastRange.addEventListener('input', () => {
            el.contrastValue.textContent = el.contrastRange.value;
            AsciiApp.state.config.contrast = parseFloat(el.contrastRange.value);
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    if (el.brightnessRange) {
        el.brightnessRange.addEventListener('input', () => {
            el.brightnessValue.textContent = el.brightnessRange.value;
            AsciiApp.state.config.brightness = parseInt(el.brightnessRange.value);
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    if (el.invertColors) {
        el.invertColors.addEventListener('change', () => {
            AsciiApp.state.config.invert = el.invertColors.checked;
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    if (el.coloredOutput) {
        el.coloredOutput.addEventListener('change', () => {
            AsciiApp.state.config.colored = el.coloredOutput.checked;
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    if (el.charSetSelect) {
        el.charSetSelect.addEventListener('change', () => {
            AsciiApp.state.config.charSet = el.charSetSelect.value;
            
            // Mostrar/ocultar configuración personalizada
            if (el.charSetSelect.value === 'custom' && el.customCharSetContainer) {
                el.customCharSetContainer.classList.remove('hidden');
            } else if (el.customCharSetContainer) {
                el.customCharSetContainer.classList.add('hidden');
            }
            
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    // Configuración personalizada
    if (el.customCharSet) {
        el.customCharSet.addEventListener('input', () => {
            AsciiApp.charSets.custom.chars = el.customCharSet.value;
            if (AsciiApp.state.currentImage) {
                AsciiApp.imageConverter.convertImageToAscii(AsciiApp.state.currentImage);
            }
        });
    }
    
    if (el.fontSizeOutput) {
        el.fontSizeOutput.addEventListener('change', () => {
            AsciiApp.state.config.fontSize = el.fontSizeOutput.value;
            el.output.className = `font-mono overflow-x-auto whitespace-pre ${AsciiApp.state.config.fontSize}`;
        });
    }
    
    // ---------------------------------------------------------------
    // Manejo de imágenes y subida de archivos
    // ---------------------------------------------------------------
    
    // Manejo de la subida normal de archivo
    if (el.imageInput) {
        el.imageInput.addEventListener('change', handleImageUpload);
    }
    
    // Zona de arrastrar y soltar
    if (el.dropZone) {
        setupDropZone();
    }
    
    // Cargar imagen desde URL
    if (el.loadUrlImage && el.imageUrl) {
        el.loadUrlImage.addEventListener('click', () => {
            const url = el.imageUrl.value.trim();
            if (!url) {
                AsciiApp.utils.createNotification('Por favor, introduce una URL válida', 'info');
                return;
            }
            
            loadImageFromUrl(url);
        });
    }
    
    // ---------------------------------------------------------------
    // Eventos para controles de texto a ASCII
    // ---------------------------------------------------------------
    
    if (el.convertTextBtn) {
        el.convertTextBtn.addEventListener('click', convertTextToAscii);
    }
    
    if (el.textSize) {
        el.textSize.addEventListener('change', () => {
            AsciiApp.state.config.textSize = el.textSize.value;
            if (el.textInput.value.trim()) {
                convertTextToAscii();
            }
        });
    }
    
    // Agregar manejo para el selector de conjunto de caracteres para texto
    const textCharSet = document.getElementById('textCharSet');
    if (textCharSet) {
        textCharSet.addEventListener('change', () => {
            // Guardamos el valor seleccionado en una variable separada para texto
            AsciiApp.state.textCharSet = textCharSet.value;
            if (el.textInput && el.textInput.value.trim()) {
                convertTextToAscii();
            }
        });
    }
    
    // Conversión en tiempo real para texto
    if (el.textInput) {
        el.textInput.addEventListener('input', AsciiApp.utils.debounce(() => {
            if (el.textInput.value.trim()) {
                convertTextToAscii();
            }
        }, AsciiApp.config.textConversionDebounce));
    }
    
    // ---------------------------------------------------------------
    // Eventos para dibujo
    // ---------------------------------------------------------------
    
    if (el.drawCanvas) {
        setupDrawingEvents();
    }
    
    // ---------------------------------------------------------------
    // Eventos para acciones de descarga, copiar y compartir
    // ---------------------------------------------------------------
    
    if (el.downloadBtn) {
        el.downloadBtn.addEventListener('click', AsciiApp.downloadManager.downloadAsciiArt);
    }
    
    if (el.downloadImageBtn) {
        el.downloadImageBtn.addEventListener('click', AsciiApp.downloadManager.downloadAsImage);
    }
    
    if (el.copyBtn) {
        el.copyBtn.addEventListener('click', AsciiApp.downloadManager.copyToClipboard);
    }
    

    
    // ---------------------------------------------------------------
    // Eventos para tema e historial
    // ---------------------------------------------------------------
    
    if (el.themeToggle) {
        el.themeToggle.addEventListener('click', AsciiApp.uiManager.toggleTheme);
    }
    
    if (el.historyBtn) {
        el.historyBtn.addEventListener('click', AsciiApp.historyManager.showHistoryModal);
    }
    
    if (el.closeHistoryBtn) {
        el.closeHistoryBtn.addEventListener('click', AsciiApp.historyManager.closeHistoryModal);
    }
    

    
    if (el.clearHistoryBtn) {
        el.clearHistoryBtn.addEventListener('click', AsciiApp.historyManager.clearHistory);
    }
}

/**
 * Configuración final y ajustes iniciales
 */
function finalSetup() {
    // Aplicar tema desde localStorage
    AsciiApp.uiManager.applyTheme(AsciiApp.state.theme);
    
    // Inicializar contenedor personalizado oculto por defecto
    if (AsciiApp.elements.customCharSetContainer) {
        AsciiApp.elements.customCharSetContainer.classList.add('hidden');
    }
    
    // Establece la pestaña inicial
    AsciiApp.uiManager.switchTab(AsciiApp.state.currentTab);
}

/**
 * Configura la zona de arrastrar y soltar para imágenes
 */
function setupDropZone() {
    const el = AsciiApp.elements;
    
    // Evento de clic para abrir el selector de archivos
    el.dropZone.addEventListener('click', () => {
        el.imageInput.click();
    });
    
    // Eventos para arrastrar y soltar
    el.dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        el.dropZone.classList.add('border-accent');
    });
    
    el.dropZone.addEventListener('dragleave', () => {
        el.dropZone.classList.remove('border-accent');
    });
    
    el.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        el.dropZone.classList.remove('border-accent');
        
        if (e.dataTransfer.files.length) {
            el.imageInput.files = e.dataTransfer.files;
            handleImageUpload({ target: { files: e.dataTransfer.files } });
        }
    });
}

/**
 * Configura los eventos para el canvas de dibujo
 */
function setupDrawingEvents() {
    const el = AsciiApp.elements;
    
    // Eventos de dibujo con mouse
    el.drawCanvas.addEventListener('mousedown', AsciiApp.drawingManager.startDrawing);
    el.drawCanvas.addEventListener('mousemove', AsciiApp.drawingManager.draw);
    el.drawCanvas.addEventListener('mouseup', AsciiApp.drawingManager.endDrawing);
    el.drawCanvas.addEventListener('mouseout', AsciiApp.drawingManager.endDrawing);
    
    // Eventos de dibujo táctil
    el.drawCanvas.addEventListener('touchstart', AsciiApp.drawingManager.startDrawing);
    el.drawCanvas.addEventListener('touchmove', AsciiApp.drawingManager.draw);
    el.drawCanvas.addEventListener('touchend', AsciiApp.drawingManager.endDrawing);
    el.drawCanvas.addEventListener('touchcancel', AsciiApp.drawingManager.endDrawing);
    
    // Eventos para botones de control de dibujo
    if (el.clearCanvas) {
        el.clearCanvas.addEventListener('click', AsciiApp.drawingManager.clearCanvas);
    }
    
    if (el.undoCanvas) {
        el.undoCanvas.addEventListener('click', AsciiApp.drawingManager.undoLastPath);
    }
    
    if (el.convertDrawing) {
        el.convertDrawing.addEventListener('click', AsciiApp.drawingManager.convertDrawingToAscii);
    }
}

/**
 * Maneja la subida de una imagen
 * @param {Event} event - Evento de cambio del input de archivo
 */
function handleImageUpload(event) {
    const files = event.target.files;
    
    if (!files || files.length === 0) {
        return;
    }
    
    const file = files[0];
    
    // Verificar que sea una imagen
    if (!file.type.match('image.*')) {
        AsciiApp.utils.createNotification('Por favor, selecciona un archivo de imagen válido', 'error');
        return;
    }
    
    // Leer el archivo como una URL de datos
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Guardar la imagen en el estado global
            AsciiApp.state.currentImage = img;
            
            // Convertir a ASCII
            AsciiApp.imageConverter.convertImageToAscii(img);
            
            AsciiApp.utils.createNotification('Imagen convertida a ASCII', 'success');
        };
        img.src = e.target.result;
    };
    
    reader.onerror = function() {
        AsciiApp.utils.createNotification('Error al leer el archivo', 'error');
    };
    
    reader.readAsDataURL(file);
}

/**
 * Carga y procesa una imagen desde URL
 * @param {string} url - URL de la imagen a cargar
 */
function loadImageFromUrl(url) {
    // Cargar imagen desde URL
    const img = new Image();
    img.crossOrigin = 'Anonymous';  // Permitir CORS
    
    img.onload = () => {
        // Guardar la imagen en el estado global
        AsciiApp.state.currentImage = img;
        
        // Convertir a ASCII
        AsciiApp.imageConverter.convertImageToAscii(img);
        
        AsciiApp.utils.createNotification('Imagen cargada correctamente', 'success');
    };
    
    img.onerror = () => {
        AsciiApp.utils.createNotification('Error al cargar la imagen desde la URL', 'error');
    };
    
    img.src = url;
}

/**
 * Convierte texto a ASCII Art
 */
function convertTextToAscii() {
    const el = AsciiApp.elements;
    const text = el.textInput.value.trim();
    
    if (!text) {
        AsciiApp.utils.createNotification('Por favor, introduce texto para convertir', 'info');
        return;
    }
    
    // Obtener tamaño de texto seleccionado
    const size = AsciiApp.state.config.textSize;
    
    // Obtener el conjunto de caracteres seleccionado para texto
    const textCharSet = AsciiApp.state.textCharSet || 'font';
    
    // Convertir texto a ASCII con el conjunto de caracteres seleccionado
    const asciiArt = AsciiApp.textConverter.convertTextToAscii(text, size, textCharSet);
    
    // Mostrar el resultado usando el método que preserva saltos de línea
    AsciiApp.uiManager.displayAsciiOutput(asciiArt);
    
    // El estado se actualiza dentro de displayAsciiOutput
    
    // Guardar en historial
    AsciiApp.historyManager.addToHistory({
        id: AsciiApp.utils.generateUniqueId(),
        type: 'text',
        content: asciiArt,
        config: { textSize: size },
        timestamp: Date.now()
    });
    
    AsciiApp.utils.createNotification('Texto convertido a ASCII', 'success');
}
