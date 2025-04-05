/**
 * ASCII Art Generator - Administrador de Historial
 * 
 * Gestiona el almacenamiento y recuperación del historial de conversiones.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para el administrador de historial
window.AsciiApp = window.AsciiApp || {};
AsciiApp.historyManager = {};

/**
 * Agrega una nueva entrada al historial
 * @param {Object} item - Item de historial con id, tipo, contenido, config y timestamp
 */
AsciiApp.historyManager.addToHistory = function(item) {
    // Obtener historial actual o iniciar uno nuevo
    const history = AsciiApp.state.history || [];
    
    // Agregar nuevo item al inicio
    history.unshift(item);
    
    // Limitar a un número máximo de items (evitar sobrecarga de localStorage)
    if (history.length > AsciiApp.config.maxHistoryItems) {
        history.pop();
    }
    
    // Actualizar estado global
    AsciiApp.state.history = history;
    
    // Guardar en localStorage
    localStorage.setItem('asciiHistory', JSON.stringify(history));
};

/**
 * Restaura una entrada del historial
 * @param {string} id - ID del item a restaurar
 */
AsciiApp.historyManager.restoreFromHistory = function(id) {
    // Buscar el item por su ID
    const item = AsciiApp.state.history.find(h => h.id === id);
    
    if (!item) {
        AsciiApp.utils.createNotification('No se encontró el item en el historial', 'error');
        return;
    }
    
    // Restaurar la configuración
    if (item.config) {
        AsciiApp.state.config = { ...item.config };
        
        // Actualizar controles de la interfaz
        if (AsciiApp.elements.widthRange) {
            AsciiApp.elements.widthRange.value = item.config.width;
            AsciiApp.elements.widthValue.textContent = item.config.width;
        }
        
        if (AsciiApp.elements.contrastRange) {
            AsciiApp.elements.contrastRange.value = item.config.contrast;
            AsciiApp.elements.contrastValue.textContent = item.config.contrast;
        }
        
        if (AsciiApp.elements.brightnessRange && item.config.brightness !== undefined) {
            AsciiApp.elements.brightnessRange.value = item.config.brightness;
            AsciiApp.elements.brightnessValue.textContent = item.config.brightness;
        }
        
        if (AsciiApp.elements.invertColors) {
            AsciiApp.elements.invertColors.checked = item.config.invert;
        }
        
        if (AsciiApp.elements.coloredOutput) {
            AsciiApp.elements.coloredOutput.checked = item.config.colored;
        }
        
        if (AsciiApp.elements.charSetSelect) {
            AsciiApp.elements.charSetSelect.value = item.config.charSet;
        }
    }
    
    // Restaurar el contenido
    AsciiApp.elements.output.textContent = item.content;
    AsciiApp.state.lastAsciiArt = item.content;
    
    // Cerrar el modal de historial
    AsciiApp.historyManager.closeHistoryModal();
    
    AsciiApp.utils.createNotification('Conversión restaurada del historial', 'success');
};

/**
 * Limpia todo el historial
 */
AsciiApp.historyManager.clearHistory = function() {
    // Limpiar historial
    AsciiApp.state.history = [];
    
    // Guardar en localStorage
    localStorage.removeItem('asciiHistory');
    
    // Actualizar la visualización del historial
    AsciiApp.historyManager.renderHistoryList();
    
    AsciiApp.utils.createNotification('Historial borrado', 'info');
};

/**
 * Muestra el modal de historial
 */
AsciiApp.historyManager.showHistoryModal = function() {
    if (!AsciiApp.elements.historyModal) return;
    
    // Renderizar la lista de historial
    AsciiApp.historyManager.renderHistoryList();
    
    // Mostrar el modal
    AsciiApp.elements.historyModal.classList.remove('hidden');
};

/**
 * Cierra el modal de historial
 */
AsciiApp.historyManager.closeHistoryModal = function() {
    if (!AsciiApp.elements.historyModal) return;
    
    // Ocultar el modal
    AsciiApp.elements.historyModal.classList.add('hidden');
};

/**
 * Renderiza la lista de items del historial
 */
AsciiApp.historyManager.renderHistoryList = function() {
    const historyItems = AsciiApp.elements.historyItems;
    const emptyHistory = AsciiApp.elements.emptyHistory;
    
    if (!historyItems || !emptyHistory) return;
    
    // Limpiar lista actual
    historyItems.innerHTML = '';
    
    // Verificar si hay historial
    if (!AsciiApp.state.history || AsciiApp.state.history.length === 0) {
        // Mostrar mensaje de historial vacío
        emptyHistory.classList.remove('hidden');
        return;
    }
    
    // Ocultar mensaje de historial vacío
    emptyHistory.classList.add('hidden');
    
    // Crear elementos para cada item del historial
    AsciiApp.state.history.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'history-item p-4 border rounded mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700';
        
        // Crear fecha formateada
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleString();
        
        // Crear vista previa del contenido (primeras 2 líneas)
        const contentLines = item.content.split('\n');
        const preview = contentLines.slice(0, 2).join('\n') + (contentLines.length > 2 ? '...' : '');
        
        // Contenido del item
        itemElement.innerHTML = `
            <div class="flex justify-between">
                <span class="font-bold">${item.type === 'text' ? 'Texto' : item.type === 'image' ? 'Imagen' : 'Dibujo'}</span>
                <span class="text-sm text-gray-500">${formattedDate}</span>
            </div>
            <pre class="mt-2 text-xs overflow-hidden">${preview}</pre>
        `;
        
        // Evento para restaurar
        itemElement.addEventListener('click', () => AsciiApp.historyManager.restoreFromHistory(item.id));
        
        // Agregar a la lista
        historyItems.appendChild(itemElement);
    });
};
