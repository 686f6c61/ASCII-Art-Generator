/**
 * ASCII Art Generator - Controlador de UI
 * 
 * Este módulo maneja las interacciones del usuario con la interfaz,
 * incluyendo cambios de pestañas y actualizaciones de parámetros.
 */

/**
 * Inicializa el controlador de UI
 * @param {Object} elements - Referencias a elementos DOM
 * @param {Function} onParamChange - Callback que se ejecuta cuando cambian los parámetros
 * @param {Function} onTabChange - Callback que se ejecuta cuando cambia la pestaña
 */
export function initUIController(elements, onParamChange, onTabChange) {
    const {
        imageTab,
        textTab,
        imageSection,
        textSection,
        widthRange,
        widthValue,
        contrastRange,
        contrastValue,
        invertColors,
        charSetSelect
    } = elements;
    
    // Configurar listeners para cambio de pestañas
    imageTab.addEventListener('click', () => switchTab('image', elements, onTabChange));
    textTab.addEventListener('click', () => switchTab('text', elements, onTabChange));
    
    // Configurar listeners para cambios en parámetros
    widthRange.addEventListener('input', () => {
        widthValue.textContent = widthRange.value;
        onParamChange && onParamChange('width', widthRange.value);
    });
    
    contrastRange.addEventListener('input', () => {
        contrastValue.textContent = contrastRange.value;
        onParamChange && onParamChange('contrast', contrastRange.value);
    });
    
    invertColors.addEventListener('change', () => {
        onParamChange && onParamChange('invert', invertColors.checked);
    });
    
    charSetSelect.addEventListener('change', () => {
        onParamChange && onParamChange('charSet', charSetSelect.value);
    });
}

/**
 * Cambia entre las pestañas de imagen y texto
 * @param {string} tab - 'image' o 'text'
 * @param {Object} elements - Referencias a elementos DOM
 * @param {Function} onTabChange - Callback que se ejecuta cuando cambia la pestaña
 */
export function switchTab(tab, elements, onTabChange) {
    const { imageTab, textTab, imageSection, textSection } = elements;
    
    // Configurar clases CSS y visibilidad
    if (tab === 'image') {
        imageTab.classList.add('active-tab');
        textTab.classList.remove('active-tab');
        imageSection.classList.remove('hidden');
        textSection.classList.add('hidden');
    } else {
        imageTab.classList.remove('active-tab');
        textTab.classList.add('active-tab');
        imageSection.classList.add('hidden');
        textSection.classList.remove('hidden');
    }
    
    // Notificar el cambio de pestaña
    onTabChange && onTabChange(tab);
}

/**
 * Actualiza la visualización del resultado ASCII
 * @param {string} asciiArt - Arte ASCII a mostrar
 * @param {HTMLElement} outputElement - Elemento donde mostrar el resultado
 */
export function updateOutput(asciiArt, outputElement) {
    outputElement.textContent = asciiArt;
}

/**
 * Obtiene los valores actuales de los parámetros de la UI
 * @param {Object} elements - Referencias a elementos DOM
 * @returns {Object} - Configuración actual
 */
export function getCurrentConfig(elements) {
    const { widthRange, contrastRange, invertColors, charSetSelect } = elements;
    
    return {
        width: parseInt(widthRange.value, 10),
        contrast: parseFloat(contrastRange.value),
        invert: invertColors.checked,
        charSet: charSetSelect.value
    };
}
