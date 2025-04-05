/**
 * ASCII Art Generator - Configuración
 * 
 * Define las constantes y configuraciones utilizadas por la aplicación.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para la aplicación
window.AsciiApp = window.AsciiApp || {};

// Configuración global
AsciiApp.config = {
    // Versión de la aplicación
    version: '2.1.0',
    
    // Límites para controles
    limits: {
        width: { min: 50, max: 300, default: 100 },
        contrast: { min: 0.5, max: 2, default: 1 },
        brightness: { min: -50, max: 50, default: 0 }
    },
    
    // Presets para componentes
    maxHistoryItems: 10,
    textConversionDebounce: 300
};

// Estado global de la aplicación
AsciiApp.state = {
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

// Elementos DOM globales
AsciiApp.elements = {
    // Se inicializarán en la función init
};

// Conjuntos de caracteres
AsciiApp.charSets = {
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
