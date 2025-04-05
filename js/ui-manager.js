/**
 * ASCII Art Generator - Administrador de UI
 * 
 * Gestiona la interfaz de usuario y la experiencia interactiva de la aplicación.
 * Controla la visualización de resultados, cambios de tema, navegación entre
 * pestanas y la presentación del arte ASCII generado con el formato adecuado.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para el administrador de UI
window.AsciiApp = window.AsciiApp || {};
AsciiApp.uiManager = {};

/**
 * Muestra ASCII art en el elemento de salida asegurando los saltos de línea correctos
 * @param {string} asciiArt - Arte ASCII a mostrar
 * @param {boolean} colored - Si debe mostrarse con colores (para imágenes)
 */
AsciiApp.uiManager.displayAsciiOutput = function(asciiArt, colored = false) {
    const outputEl = AsciiApp.elements.output;
    
    if (!outputEl) return;
    
    // Para salida con colores HTML (imágenes)
    if (colored) {
        outputEl.innerHTML = asciiArt;
        return;
    }
    
    // Para salida de texto plano, preservamos los saltos de línea
    outputEl.innerHTML = '';
    
    // Preservar saltos de línea exactamente como están
    const preElement = document.createElement('pre');
    preElement.textContent = asciiArt;
    outputEl.appendChild(preElement);
    
    // Actualizar estado global con el último arte ASCII generado
    AsciiApp.state.lastAsciiArt = asciiArt;
};

/**
 * Cambia la pestaña activa
 * @param {string} tab - Nombre de la pestaña ('image', 'text', 'draw')
 */
AsciiApp.uiManager.switchTab = function(tab) {
    // Resets
    const allTabs = ['image', 'text', 'draw'];
    
    // Primero removemos clases activas de todas las pestañas
    allTabs.forEach(t => {
        const tabEl = AsciiApp.elements[`${t}Tab`];
        const sectionEl = AsciiApp.elements[`${t}Section`];
        
        if (!tabEl || !sectionEl) return;
        
        tabEl.classList.remove('active-tab');
        sectionEl.classList.add('hidden');
    });
    
    // Luego activamos solo la pestaña seleccionada
    if (tab === 'image') {
        AsciiApp.elements.imageTab.classList.add('active-tab');
        AsciiApp.elements.imageSection.classList.remove('hidden');
    } else if (tab === 'text') {
        AsciiApp.elements.textTab.classList.add('active-tab');
        AsciiApp.elements.textSection.classList.remove('hidden');
    } else if (tab === 'draw') {
        AsciiApp.elements.drawTab.classList.add('active-tab');
        AsciiApp.elements.drawSection.classList.remove('hidden');
        
        // Inicializar el canvas de dibujo si es necesario
        AsciiApp.drawingManager.initCanvas();
    }
    
    // Limpiar salida
    AsciiApp.elements.output.textContent = '';
    AsciiApp.state.lastAsciiArt = '';
    
    // Actualizar estado global
    AsciiApp.state.currentTab = tab;
};

/**
 * Cambia entre tema oscuro y claro
 */
AsciiApp.uiManager.toggleTheme = function() {
    // Alternar tema
    AsciiApp.state.theme = AsciiApp.state.theme === 'dark' ? 'light' : 'dark';
    
    // Aplicar el tema
    AsciiApp.uiManager.applyTheme(AsciiApp.state.theme);
    
    // Guardar preferencia
    localStorage.setItem('theme', AsciiApp.state.theme);
    
    // Actualizar ícono del toggle
    if (AsciiApp.elements.themeToggle) {
        if (AsciiApp.state.theme === 'dark') {
            AsciiApp.elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            AsciiApp.elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    AsciiApp.utils.createNotification(`Tema ${AsciiApp.state.theme === 'dark' ? 'oscuro' : 'claro'} activado`, 'info');
};

/**
 * Aplica un tema específico
 * @param {string} theme - Nombre del tema ('light', 'dark')
 */
AsciiApp.uiManager.applyTheme = function(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.classList.add('dark');
        
        // Establecer colores de fondo y texto para tema oscuro
        document.body.style.backgroundColor = '#1e1e2e';
        document.body.style.color = '#ffffff';
        
        // Cambiar el ícono si existe
        if (AsciiApp.elements.themeToggle) {
            AsciiApp.elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        html.classList.remove('dark');
        
        // Establecer colores de fondo y texto para tema claro
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#1e1e2e';
        
        // Cambiar el ícono si existe
        if (AsciiApp.elements.themeToggle) {
            AsciiApp.elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Guardar estado
    AsciiApp.state.theme = theme;
};


