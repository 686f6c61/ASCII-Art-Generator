/**
 * ASCII Art Generator - Utilidades
 * 
 * Funciones de utilidad general utilizadas por toda la aplicación.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para utilidades
window.AsciiApp = window.AsciiApp || {};
AsciiApp.utils = {};

/**
 * Crea un elemento de notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'error', 'info')
 */
AsciiApp.utils.createNotification = function(message, type = 'info') {
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
};

/**
 * Obtiene la fecha y hora actual formateada para usar en el nombre del archivo
 * @returns {string} - Fecha y hora formateada (YYYY-MM-DD-HHmmss)
 */
AsciiApp.utils.getFormattedDateTime = function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
};

/**
 * Debounce: limita la frecuencia de ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
AsciiApp.utils.debounce = function(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Crea un identificador único usando timestamp + aleatorio
 * @returns {string} - Identificador único
 */
AsciiApp.utils.generateUniqueId = function() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
