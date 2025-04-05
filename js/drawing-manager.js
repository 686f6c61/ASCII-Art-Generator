/**
 * ASCII Art Generator - Administrador de Dibujo
 * 
 * Funcionalidad para dibujar en canvas y convertir a ASCII.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para el administrador de dibujo
window.AsciiApp = window.AsciiApp || {};
AsciiApp.drawingManager = {};

/**
 * Inicializa el canvas de dibujo
 */
AsciiApp.drawingManager.initCanvas = function() {
    const canvas = AsciiApp.elements.drawCanvas;
    const ctx = canvas.getContext('2d');
    
    // Establecer dimensiones del canvas para que sea responsive
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 400;
    
    // Configurar el contexto para dibujo
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    
    // Fondo blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Guardar el contexto y configuración en el estado global
    AsciiApp.state.canvas.context = ctx;
    AsciiApp.state.canvas.paths = [];
    AsciiApp.state.canvas.currentPath = [];
};

/**
 * Empieza a dibujar cuando se presiona el mouse
 * @param {Event} e - Evento del mouse o touch
 */
AsciiApp.drawingManager.startDrawing = function(e) {
    e.preventDefault();
    
    const canvas = AsciiApp.elements.drawCanvas;
    const ctx = AsciiApp.state.canvas.context;
    const rect = canvas.getBoundingClientRect();
    
    // Obtener coordenadas según tipo de evento (mouse o touch)
    let x, y;
    if (e.type === 'mousedown') {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    } else if (e.type === 'touchstart') {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    }
    
    // Empezar un nuevo path
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Actualizar estado
    AsciiApp.state.canvas.isDrawing = true;
    AsciiApp.state.canvas.currentPath = [{x, y}];
};

/**
 * Dibuja mientras se mueve el mouse
 * @param {Event} e - Evento del mouse o touch
 */
AsciiApp.drawingManager.draw = function(e) {
    e.preventDefault();
    
    // Si no está dibujando, salir
    if (!AsciiApp.state.canvas.isDrawing) return;
    
    const canvas = AsciiApp.elements.drawCanvas;
    const ctx = AsciiApp.state.canvas.context;
    const rect = canvas.getBoundingClientRect();
    
    // Obtener coordenadas según tipo de evento
    let x, y;
    if (e.type === 'mousemove') {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    } else if (e.type === 'touchmove') {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    }
    
    // Dibujar línea al nuevo punto
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Guardar el punto en el path actual
    AsciiApp.state.canvas.currentPath.push({x, y});
};

/**
 * Termina de dibujar cuando se suelta el mouse
 */
AsciiApp.drawingManager.endDrawing = function() {
    // Si no está dibujando, salir
    if (!AsciiApp.state.canvas.isDrawing) return;
    
    // Guardar el path actual en el historial de paths
    if (AsciiApp.state.canvas.currentPath.length > 0) {
        AsciiApp.state.canvas.paths.push([...AsciiApp.state.canvas.currentPath]);
    }
    
    // Actualizar estado
    AsciiApp.state.canvas.isDrawing = false;
    AsciiApp.state.canvas.currentPath = [];
};

/**
 * Limpia el canvas de dibujo
 */
AsciiApp.drawingManager.clearCanvas = function() {
    const canvas = AsciiApp.elements.drawCanvas;
    const ctx = AsciiApp.state.canvas.context;
    
    // Limpiar el canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reiniciar paths
    AsciiApp.state.canvas.paths = [];
    AsciiApp.state.canvas.currentPath = [];
    
    AsciiApp.utils.createNotification('Canvas limpiado', 'info');
};

/**
 * Deshacer el último trazo
 */
AsciiApp.drawingManager.undoLastPath = function() {
    // Si no hay paths, salir
    if (AsciiApp.state.canvas.paths.length === 0) {
        AsciiApp.utils.createNotification('No hay trazos para deshacer', 'info');
        return;
    }
    
    // Eliminar el último path
    AsciiApp.state.canvas.paths.pop();
    
    // Redibujar todos los paths restantes
    AsciiApp.drawingManager.redrawCanvas();
    
    AsciiApp.utils.createNotification('Trazo deshecho', 'info');
};

/**
 * Redibuja el canvas con los paths guardados
 */
AsciiApp.drawingManager.redrawCanvas = function() {
    const canvas = AsciiApp.elements.drawCanvas;
    const ctx = AsciiApp.state.canvas.context;
    
    // Limpiar canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redibujar cada path
    for (const path of AsciiApp.state.canvas.paths) {
        if (path.length === 0) continue;
        
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        
        ctx.stroke();
    }
};

/**
 * Convierte el dibujo actual a ASCII Art
 */
AsciiApp.drawingManager.convertDrawingToAscii = function() {
    const canvas = AsciiApp.elements.drawCanvas;
    
    // Si no hay contexto o canvas, salir
    if (!canvas || !AsciiApp.state.canvas.context) {
        AsciiApp.utils.createNotification('Error: Canvas no inicializado', 'error');
        return;
    }
    
    // Convertir el canvas a una imagen
    const img = new Image();
    img.onload = function() {
        // Guardar la imagen en el estado global
        AsciiApp.state.currentImage = img;
        
        // Convertir a ASCII usando el convertidor de imágenes
        const asciiArt = AsciiApp.imageConverter.convertImageToAscii(img);
        
        // Asegurar que la salida se muestre correctamente con saltos de línea
        AsciiApp.uiManager.displayAsciiOutput(AsciiApp.state.lastAsciiArt);
        
        AsciiApp.utils.createNotification('Dibujo convertido a ASCII', 'success');
    };
    
    // Convertir canvas a imagen
    img.src = canvas.toDataURL('image/png');
};
