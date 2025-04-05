/**
 * ASCII Art Generator - Conversor de texto
 * 
 * Este módulo maneja la conversión de texto normal a arte ASCII
 * utilizando un diccionario de patrones de caracteres.
 */

import { asciiLetters } from './ascii-dictionaries.js';

/**
 * Convierte texto normal en arte ASCII
 * @param {string} text - Texto a convertir
 * @returns {string} - Arte ASCII generado
 */
export function convertTextToAscii(text) {
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
    return asciiLines.join('\\n');
}

/**
 * Obtiene la lista de caracteres soportados para la conversión de texto
 * @returns {Object} - Objeto con categorías de caracteres soportados
 */
export function getSupportedCharacters() {
    // Función auxiliar para extraer caracteres por tipo
    const getCharactersByType = (regex) => {
        return Object.keys(asciiLetters)
            .filter(char => regex.test(char))
            .join(' ');
    };
    
    return {
        // Letras (A-Z + Ñ)
        letters: getCharactersByType(/^[A-ZÑ]$/),
        
        // Números (0-9)
        numbers: getCharactersByType(/^[0-9]$/),
        
        // Símbolos (todo lo que no sea letra o número)
        symbols: getCharactersByType(/^[^A-ZÑ0-9]$/)
    };
}
