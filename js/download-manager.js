/**
 * ASCII Art Generator - Administrador de Descargas
 * 
 * Gestiona las descargas y copias al portapapeles.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para el administrador de descargas
window.AsciiApp = window.AsciiApp || {};
AsciiApp.downloadManager = {};

/**
 * Descarga el arte ASCII generado como un archivo de texto
 */
AsciiApp.downloadManager.downloadAsciiArt = function() {
    // Verificar si hay arte ASCII generado
    if (!AsciiApp.state.lastAsciiArt) {
        AsciiApp.utils.createNotification('No hay nada que descargar. Genera primero un arte ASCII.', 'info');
        return;
    }
    
    // Crear blob con el arte ASCII
    const blob = new Blob([AsciiApp.state.lastAsciiArt], { type: 'text/plain' });
    
    // Crear URL de objeto
    const url = URL.createObjectURL(blob);
    
    // Crear elemento de enlace para descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-art-${AsciiApp.utils.getFormattedDateTime()}.txt`;
    
    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Liberar URL
    URL.revokeObjectURL(url);
    
    AsciiApp.utils.createNotification('Arte ASCII descargado', 'success');
};

/**
 * Copia el arte ASCII generado al portapapeles
 */
AsciiApp.downloadManager.copyToClipboard = async function() {
    // Verificar si hay arte ASCII generado
    if (!AsciiApp.state.lastAsciiArt) {
        AsciiApp.utils.createNotification('No hay nada que copiar. Genera primero un arte ASCII.', 'info');
        return;
    }
    
    try {
        // Copiar al portapapeles usando la API de clipboard
        await navigator.clipboard.writeText(AsciiApp.state.lastAsciiArt);
        AsciiApp.utils.createNotification('Copiado al portapapeles', 'success');
    } catch (error) {
        console.error('Error al copiar:', error);
        
        // Fallback si la API de clipboard no está disponible
        try {
            const textarea = document.createElement('textarea');
            textarea.value = AsciiApp.state.lastAsciiArt;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            AsciiApp.utils.createNotification('Copiado al portapapeles', 'success');
        } catch (err) {
            AsciiApp.utils.createNotification('Error al copiar', 'error');
        }
    }
};

/**
 * Descarga el arte ASCII como imagen (PNG)
 */
AsciiApp.downloadManager.downloadAsImage = function() {
    // Verificar si hay arte ASCII generado
    if (!AsciiApp.state.lastAsciiArt) {
        AsciiApp.utils.createNotification('No hay nada que descargar. Genera primero un arte ASCII.', 'info');
        return;
    }
    
    try {
        // Crear un canvas temporal
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Obtener las líneas de ASCII art
        const lines = AsciiApp.state.lastAsciiArt.split('\n');
        const maxLineLength = Math.max(...lines.map(line => line.length));
        
        // Establecer las dimensiones del canvas
        const fontSizePx = 14;
        const lineHeight = fontSizePx * 1.2;
        const padding = 20;
        
        canvas.width = maxLineLength * fontSizePx * 0.6 + padding * 2;
        canvas.height = lines.length * lineHeight + padding * 2;
        
        // Establecer el fondo
        const isDarkTheme = AsciiApp.state.theme === 'dark';
        ctx.fillStyle = isDarkTheme ? '#1e1e2e' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Configurar texto
        ctx.font = `${fontSizePx}px monospace`;
        ctx.fillStyle = isDarkTheme ? '#ffffff' : '#000000';
        ctx.textBaseline = 'top';
        
        // Dibujar cada línea
        lines.forEach((line, i) => {
            ctx.fillText(line, padding, padding + i * lineHeight);
        });
        
        // Convertir a imagen
        const dataUrl = canvas.toDataURL('image/png');
        
        // Crear enlace para descargar
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `ascii-art-${AsciiApp.utils.getFormattedDateTime()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        AsciiApp.utils.createNotification('Arte ASCII descargado como imagen', 'success');
    } catch (error) {
        console.error('Error al descargar como imagen:', error);
        AsciiApp.utils.createNotification('Error al descargar como imagen', 'error');
    }
};
