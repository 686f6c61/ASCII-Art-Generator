/**
 * ASCII Art Generator - Aplicación principal
 * 
 * Este archivo actúa como orquestador de todos los módulos
 * y maneja la inicialización de la aplicación.
 * 
 * @author 686f6c61
 * @version 2.0.0
 * @license MIT
 */

import { convertImageToAscii, processImageFile } from './modules/image-converter.js';
import { convertTextToAscii } from './modules/text-converter.js';
import { initUIController, switchTab, updateOutput, getCurrentConfig } from './modules/ui-controller.js';
import { downloadAsciiArt, copyToClipboard } from './modules/download-manager.js';
import { createNotification, debounce } from './utils/helpers.js';
import { optimizeImage } from './utils/image-processing.js';

// Estado global de la aplicación
const appState = {
    currentTab: 'image',
    currentImage: null,
    lastAsciiArt: '',
    config: {
        width: 100,
        contrast: 1,
        invert: false,
        charSet: 'standard'
    }
};

// Referencias a elementos DOM
const elements = {
    // Elementos de entrada
    imageInput: document.getElementById('imageInput'),
    textInput: document.getElementById('textInput'),
    
    // Controles de imagen
    widthRange: document.getElementById('widthRange'),
    contrastRange: document.getElementById('contrastRange'),
    invertColors: document.getElementById('invertColors'),
    charSetSelect: document.getElementById('charSet'),
    
    // Elementos de salida
    output: document.getElementById('ascii-output'),
    downloadBtn: document.getElementById('downloadBtn'),
    
    // Elementos de tabs
    imageTab: document.getElementById('imageTab'),
    textTab: document.getElementById('textTab'),
    imageSection: document.getElementById('imageSection'),
    textSection: document.getElementById('textSection'),
    
    // Elementos de texto
    widthValue: document.getElementById('widthValue'),
    contrastValue: document.getElementById('contrastValue')
};

/**
 * Procesa la carga de una nueva imagen
 * @param {Event} e - Evento de cambio del input de archivo
 */
async function handleImageUpload(e) {
    try {
        // Obtener archivo
        const file = e.target.files[0];
        if (!file) return;
        
        // Procesar la imagen
        const img = await processImageFile(file);
        
        // Optimizar imagen si es muy grande
        const optimizedImg = await optimizeImage(img, { maxWidth: 1500 });
        
        // Guardar la imagen actual
        appState.currentImage = optimizedImg;
        
        // Convertir a ASCII y mostrar
        await regenerateAsciiArt();
        
        // Mostrar notificación
        createNotification('Imagen cargada correctamente', 'success');
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        createNotification('Error al cargar la imagen', 'error');
    }
}

/**
 * Regenera el arte ASCII cuando cambian los parámetros
 */
async function regenerateAsciiArt() {
    if (appState.currentTab === 'image' && appState.currentImage) {
        // Obtener configuración actual
        const config = getCurrentConfig(elements);
        
        // Convertir imagen a ASCII
        const asciiArt = convertImageToAscii(appState.currentImage, config);
        
        // Guardar el arte ASCII generado
        appState.lastAsciiArt = asciiArt;
        
        // Actualizar salida
        updateOutput(asciiArt, elements.output);
    }
}

/**
 * Maneja la conversión de texto a ASCII
 */
function handleTextToAscii() {
    const text = elements.textInput.value.trim();
    
    if (!text) {
        createNotification('Por favor, ingresa algún texto', 'info');
        return;
    }
    
    // Convertir texto a ASCII
    const asciiArt = convertTextToAscii(text);
    
    // Guardar el arte ASCII generado
    appState.lastAsciiArt = asciiArt;
    
    // Actualizar salida
    updateOutput(asciiArt, elements.output);
}

/**
 * Maneja el cambio de pestaña
 * @param {string} tab - Pestaña seleccionada ('image' o 'text')
 */
function handleTabChange(tab) {
    appState.currentTab = tab;
    
    // Limpiar salida cuando se cambia de pestaña
    elements.output.textContent = '';
    appState.lastAsciiArt = '';
}

/**
 * Maneja cambios en parámetros de configuración
 */
const handleConfigChange = debounce(() => {
    regenerateAsciiArt();
}, 200);

/**
 * Maneja la descarga del arte ASCII
 */
function handleDownload() {
    if (!appState.lastAsciiArt) {
        createNotification('Nada que descargar. Genera primero un arte ASCII.', 'info');
        return;
    }
    
    // Prefijo del archivo según el tipo de conversión
    const prefix = appState.currentTab === 'image' ? 'image-ascii' : 'text-ascii';
    
    // Descargar arte ASCII
    downloadAsciiArt(appState.lastAsciiArt, prefix);
}

/**
 * Inicializa la aplicación
 */
function initApp() {
    // Inicializar controlador de UI
    initUIController(elements, handleConfigChange, handleTabChange);
    
    // Configurar listeners adicionales
    elements.imageInput.addEventListener('change', handleImageUpload);
    elements.downloadBtn.addEventListener('click', handleDownload);
    
    // Botón de conversión de texto
    const convertTextBtn = document.querySelector('button[onclick="convertTextToAscii()"]');
    if (convertTextBtn) {
        // Eliminar el atributo onclick (ya que ahora usaremos listeners)
        convertTextBtn.removeAttribute('onclick');
        // Agregar nuevo listener
        convertTextBtn.addEventListener('click', handleTextToAscii);
    }
    
    // Añadir botón de copiar
    createCopyButton();
    
    console.log('ASCII Art Generator inicializado correctamente');
}

/**
 * Crea un botón para copiar al portapapeles
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
            const success = await copyToClipboard(appState.lastAsciiArt);
            if (success) {
                createNotification('Copiado al portapapeles', 'success');
            } else {
                createNotification('Error al copiar', 'error');
            }
        } catch (error) {
            console.error('Error al copiar:', error);
            createNotification('Error al copiar', 'error');
        }
    });
    
    // Encontrar el contenedor del botón de descarga y agregar el nuevo botón después
    const downloadContainer = elements.downloadBtn.parentElement;
    downloadContainer.parentElement.appendChild(copyBtn);
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);
