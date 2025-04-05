/**
 * ASCII Art Generator - Funciones auxiliares
 * 
 * Este módulo contiene funciones de utilidad general.
 */

/**
 * Crea un elemento de mensaje para notificaciones
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje ('success', 'error', 'info')
 * @returns {HTMLElement} - Elemento DOM del mensaje
 */
export function createNotification(message, type = 'info') {
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
    
    return notification;
}

/**
 * Debounce: limita la frecuencia de ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
export function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Crea un identificador único usando timestamp + aleatorio
 * @returns {string} - Identificador único
 */
export function generateUniqueId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
