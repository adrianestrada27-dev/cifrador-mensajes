// js/main.js
// Punto de entrada de la aplicacion.
// Espera a que el DOM este completamente cargado antes de inicializar la UI.
// Cualquier logica de arranque global debe pasar por aqui.

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa la interfaz de usuario y registra todos los event listeners.
    UI.init();
});