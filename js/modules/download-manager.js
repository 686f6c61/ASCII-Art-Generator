/**
 * ASCII Art Generator - Gestor de descargas
 * 
 * Este módulo maneja la descarga del arte ASCII generado
 * en formato de archivo de texto.
 */

/**
 * Descarga el arte ASCII actual como archivo de texto
 * @param {string} asciiArt - El arte ASCII a descargar
 * @param {string} prefix - Prefijo para el nombre del archivo
 */
export function downloadAsciiArt(asciiArt, prefix = 'ascii-art') {
    // No descargar si no hay contenido
    if (!asciiArt.trim()) {
        console.warn('No hay arte ASCII para descargar');
        return;
    }
    
    // Crear un elemento <a> para la descarga
    const link = document.createElement('a');
    
    // Crear un Blob con el contenido ASCII
    const blob = new Blob([asciiArt], { type: 'text/plain' });
    
    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);
    
    // Configurar el enlace de descarga
    link.href = url;
    link.download = `${prefix}-${getFormattedDateTime()}.txt`;
    
    // Añadir temporalmente al documento, simular clic y eliminar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Liberar la URL del objeto
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Obtiene la fecha y hora actual formateada para usar en el nombre del archivo
 * @returns {string} - Fecha y hora formateada (YYYY-MM-DD-HHmmss)
 */
function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
}

/**
 * Copia el arte ASCII al portapapeles
 * @param {string} asciiArt - El arte ASCII a copiar
 * @returns {Promise<boolean>} - Promesa que indica si se copió correctamente
 */
export function copyToClipboard(asciiArt) {
    if (!asciiArt.trim()) {
        console.warn('No hay arte ASCII para copiar');
        return Promise.resolve(false);
    }
    
    return navigator.clipboard.writeText(asciiArt)
        .then(() => true)
        .catch(err => {
            console.error('Error al copiar al portapapeles:', err);
            return false;
        });
}
