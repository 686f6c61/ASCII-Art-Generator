/**
 * ASCII Art Generator - Convertidor de Texto
 * 
 * Proporciona la funcionalidad principal para transformar texto en arte ASCII
 * utilizando diferentes estilos de fuentes y conjuntos de caracteres.
 * Soporta múltiples tamaños y formatos, con capacidad para procesar
 * texto en diferentes idiomas incluyendo caracteres especiales.
 * 
 * @version 2.1.0
 * @license MIT
 */

// Namespace global para el convertidor de texto
window.AsciiApp = window.AsciiApp || {};
AsciiApp.textConverter = {};

// Definición de las fuentes ASCII disponibles
AsciiApp.textConverter.fonts = {
    standard: {
        A: "  A  \n A A \nAAAAA\nA   A\nA   A",
        B: "BBBB \nB   B\nBBBB \nB   B\nBBBB ",
        C: " CCC \nC   C\nC    \nC   C\n CCC ",
        D: "DDDD \nD   D\nD   D\nD   D\nDDDD ",
        E: "EEEEE\nE    \nEEE  \nE    \nEEEEE",
        F: "FFFFF\nF    \nFFF  \nF    \nF    ",
        G: " GGG \nG    \nG  GG\nG   G\n GGG ",
        H: "H   H\nH   H\nHHHHH\nH   H\nH   H",
        I: "IIIII\n  I  \n  I  \n  I  \nIIIII",
        J: "JJJJJ\n  J  \n  J  \nJ J  \n JJ  ",
        K: "K   K\nK  K \nKKK  \nK  K \nK   K",
        L: "L    \nL    \nL    \nL    \nLLLLL",
        M: "M   M\nMM MM\nM M M\nM   M\nM   M",
        N: "N   N\nNN  N\nN N N\nN  NN\nN   N",
        O: " OOO \nO   O\nO   O\nO   O\n OOO ",
        P: "PPPP \nP   P\nPPPP \nP    \nP    ",
        Q: " QQQ \nQ   Q\nQ   Q\nQ  Q \n QQ Q",
        R: "RRRR \nR   R\nRRRR \nR  R \nR   R",
        S: " SSS \nS    \n SSS \n    S\nSSSS ",
        T: "TTTTT\n  T  \n  T  \n  T  \n  T  ",
        U: "U   U\nU   U\nU   U\nU   U\n UUU ",
        V: "V   V\nV   V\nV   V\n V V \n  V  ",
        W: "W   W\nW   W\nW W W\nWW WW\nW   W",
        X: "X   X\n X X \n  X  \n X X \nX   X",
        Y: "Y   Y\n Y Y \n  Y  \n  Y  \n  Y  ",
        Z: "ZZZZZ\n   Z \n  Z  \n Z   \nZZZZZ",
        " ": "     \n     \n     \n     \n     ",
        "0": " 000 \n0   0\n0 0 0\n0   0\n 000 ",
        "1": "  1  \n 11  \n  1  \n  1  \n11111",
        "2": " 222 \n2   2\n   2 \n  2  \n22222",
        "3": "3333 \n    3\n  33 \n    3\n3333 ",
        "4": "   4 \n  44 \n 4 4 \n44444\n   4 ",
        "5": "55555\n5    \n5555 \n    5\n5555 ",
        "6": " 666 \n6    \n6666 \n6   6\n 666 ",
        "7": "77777\n   7 \n  7  \n 7   \n7    ",
        "8": " 888 \n8   8\n 888 \n8   8\n 888 ",
        "9": " 999 \n9   9\n 9999\n    9\n 999 ",
        ".": "     \n     \n     \n     \n  .  ",
        ",": "     \n     \n     \n  ,  \n ,   ",
        "!": "  !  \n  !  \n  !  \n     \n  !  ",
        "?": " ??? \n?   ?\n  ?  \n     \n  ?  ",
        "@": " @@@ \n@ @ @\n@ @ @\n@    \n @@@ ",
        "#": " # # \n#####\n # # \n#####\n # # ",
        "$": " $$$ \n$ $  \n $$$ \n  $ $\n $$$ ",
        "%": "%   %\n   % \n  %  \n %   \n%   %",
        "&": " &&  \n& &  \n && &\n&  & \n && &",
        "*": "     \n * * \n  *  \n * * \n     ",
        "(": "   ( \n  (  \n (   \n  (  \n   ( ",
        ")": " )   \n  )  \n   ) \n  )  \n )   ",
        "-": "     \n     \n-----\n     \n     ",
        "_": "     \n     \n     \n     \n_____",
        "+": "     \n  +  \n+++++\n  +  \n     ",
        "=": "     \n=====\n     \n=====\n     ",
        "|": "  |  \n  |  \n  |  \n  |  \n  |  ",
        "/": "    /\n   / \n  /  \n /   \n/    ",
        "\\": "\\    \n \\   \n  \\  \n   \\ \n    \\"
    },
    
    // Fuente de tipografía pequeña
    small: {
        A: " _ \n/ \\\n\\_/",
        B: "_ \n|_)\n|_)",
        C: " _\n/ \n\\_",
        D: "_ \n| \\\n|_/",
        E: " _\n|_\n|_",
        F: " _\n|_\n| ",
        G: " _ \n/ |\n\\_|",
        H: "   \n|_|\n| |",
        I: " \n|\n|",
        J: "  \n |\n_|",
        K: "  \n|/\n|\\"
    }
};

// Completar el alfabeto small con letras básicas
for (let letter of 'LMNOPQRSTUVWXYZ0123456789 .,!?@#$%&*()-_+=|/\\') {
    if (!AsciiApp.textConverter.fonts.small[letter]) {
        AsciiApp.textConverter.fonts.small[letter] = letter;
    }
}

/**
 * Convierte texto normal a ASCII Art
 * @param {string} text - El texto a convertir
 * @param {string} size - Tamaño del texto ('small', 'medium', 'large')
 * @param {string} charSetKey - Conjunto de caracteres a usar (opcional)
 * @returns {string} - ASCII Art resultante
 */
AsciiApp.textConverter.convertTextToAscii = function(text, size = 'medium', charSetKey = 'font') {
    // Si se ha elegido un conjunto de caracteres diferente al de fuente,
    // usamos ese estilo para convertir el texto
    if (charSetKey && charSetKey !== 'font' && AsciiApp.charSets[charSetKey]) {
        return AsciiApp.textConverter.convertTextWithCharSet(text, charSetKey);
    }
    
    // Normalizar a mayúsculas para la conversión estándar con fuentes
    text = text.toUpperCase();
    
    let fontKey = 'standard';
    
    switch (size) {
        case 'small':
            fontKey = 'small';
            break;
        case 'large':
            // Usar la fuente estándar pero con repetición de caracteres
            break;
        case 'medium':
        default:
            // Usar la fuente estándar
            break;
    }
    
    const font = AsciiApp.textConverter.fonts[fontKey];
    
    // Obtener la altura máxima de las letras en la fuente
    let maxLines = 5;
    if (fontKey === 'small') maxLines = 3;
    
    // Array para almacenar cada línea del resultado
    const resultLines = Array(maxLines).fill('');
    
    // Para cada carácter del texto
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Si el carácter no está en la fuente, usar espacio
        const charAscii = font[char] || font[' '];
        
        // Dividir el arte ASCII del carácter en líneas
        const charLines = charAscii.split('\n');
        
        // Para cada línea del carácter, añadirla a la línea correspondiente del resultado
        for (let j = 0; j < maxLines; j++) {
            // Si el carácter tiene esta línea, añadirla, si no, añadir espacios
            resultLines[j] += (charLines[j] || '     ') + ' ';
        }
    }
    
    // Unir las líneas con saltos de línea
    const result = resultLines.join('\n');
    
    // Si es tamaño grande, estirar horizontalmente y verticalmente
    if (size === 'large') {
        return AsciiApp.textConverter.stretchAsciiArt(result, 2, 2);
    }
    
    return result;
};

/**
 * Estira un ASCII Art horizontalmente y verticalmente
 * @param {string} asciiArt - ASCII Art a estirar
 * @param {number} horizontalFactor - Factor de estiramiento horizontal
 * @param {number} verticalFactor - Factor de estiramiento vertical
 * @returns {string} - ASCII Art estirado
 */
AsciiApp.textConverter.stretchAsciiArt = function(asciiArt, horizontalFactor, verticalFactor) {
    // Dividir en líneas
    const lines = asciiArt.split('\n');
    const resultLines = [];
    
    // Para cada línea original
    lines.forEach(line => {
        // Estirar horizontalmente
        let stretchedLine = '';
        for (let i = 0; i < line.length; i++) {
            stretchedLine += line[i].repeat(horizontalFactor);
        }
        
        // Estirar verticalmente (repetir la línea)
        for (let i = 0; i < verticalFactor; i++) {
            resultLines.push(stretchedLine);
        }
    });
    
    return resultLines.join('\n');
};

/**
 * Convierte texto usando un conjunto de caracteres alternativo
 * @param {string} text - Texto a convertir
 * @param {string} charSetKey - Clave del conjunto de caracteres a usar
 * @returns {string} - Arte ASCII generado
 */
AsciiApp.textConverter.convertTextWithCharSet = function(text, charSetKey) {
    // Obtener el conjunto de caracteres
    const charSet = AsciiApp.charSets[charSetKey]?.chars || AsciiApp.charSets.standard.chars;
    
    if (!charSet || charSet.length === 0) {
        return 'Error: Conjunto de caracteres no válido';
    }
    
    // Si estamos usando fuentes ASCII, usamos la lógica original
    if (charSetKey === 'font') {
        return AsciiApp.textConverter.convertTextToAscii(text);
    }
    
    // Para los conjuntos de caracteres especiales, usamos un enfoque diferente
    // Primero, creamos una versión ASCII del texto usando la fuente estándar
    const stdAsciiArt = AsciiApp.textConverter.convertTextToAscii(text, 'medium', 'font');
    
    // Luego aplicamos el conjunto de caracteres seleccionado a este ASCII art
    // Dividimos por líneas para preservar el formato
    const lines = stdAsciiArt.split('\n');
    let result = [];
    
    // Mapeo de densidad visual de caracteres
    const charMapping = {
        ' ': charSet[charSet.length - 1], // Espacio -> más ligero
        'A': charSet[0],
        'B': charSet[0],
        'C': charSet[0],
        'D': charSet[0],
        'E': charSet[0],
        'F': charSet[0],
        'G': charSet[0],
        'H': charSet[0],
        'I': charSet[0],
        'J': charSet[0],
        'K': charSet[0],
        'L': charSet[0],
        'M': charSet[0],
        'N': charSet[0],
        'O': charSet[0],
        'P': charSet[0],
        'Q': charSet[0],
        'R': charSet[0],
        'S': charSet[0],
        'T': charSet[0],
        'U': charSet[0],
        'V': charSet[0],
        'W': charSet[0],
        'X': charSet[0],
        'Y': charSet[0],
        'Z': charSet[0],
        '0': charSet[1],
        '1': charSet[1],
        '2': charSet[1],
        '3': charSet[1],
        '4': charSet[1],
        '5': charSet[1],
        '6': charSet[1],
        '7': charSet[1],
        '8': charSet[1],
        '9': charSet[1]
    };
    
    // Procesamos cada línea del ASCII art generado
    for (const line of lines) {
        let newLine = '';
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            // Sustituir con el carácter del conjunto seleccionado
            // Si el carácter no está en el mapping, usamos el valor medio del conjunto
            newLine += charMapping[char] || charSet[Math.floor(charSet.length / 2)];
        }
        result.push(newLine);
    }
    
    // Unimos las líneas con saltos de línea
    return result.join('\n');
};
