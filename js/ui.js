// js/ui.js
// Modulo de interfaz de usuario.
// Conecta los algoritmos de cifrado con los elementos del DOM.
// Maneja eventos, validaciones de entrada y presentacion de resultados.
// Depende de: cesar.js, xor.js, aes.js, des.js, des3.js, blowfish.js

const UI = (() => {

  // Mapa de algoritmos disponibles.
  // La clave coincide con el value de cada <option> en el selector HTML.
  const algorithms = {
    cesar:    Cesar,
    xor:      XOR,
    aes:      AES,
    des:      DES,
    des3:     DES3,
    blowfish: Blowfish
  };

  // Referencias a elementos del DOM.
  // Se inicializan en init() para garantizar que el DOM este listo.
  let inputMessage  = null;
  let inputKey      = null;
  let selectAlgo    = null;
  let btnEncrypt    = null;
  let btnDecrypt    = null;
  let outputOriginal   = null;
  let outputEncrypted  = null;
  let outputDecrypted  = null;
  let outputMatch      = null;
  let outputError      = null;

  /**
   * Limpia el area de resultados antes de cada operacion.
   */
  function clearResults() {
    outputOriginal.textContent  = '';
    outputEncrypted.textContent = '';
    outputDecrypted.textContent = '';
    outputMatch.textContent     = '';
    outputError.textContent     = '';
    outputError.classList.remove('visible');
    outputMatch.classList.remove('match', 'no-match');
  }

  /**
   * Muestra un mensaje de error en el area designada.
   * @param {string} message - Texto del error a mostrar.
   */
  function showError(message) {
    outputError.textContent = 'Error: ' + message;
    outputError.classList.add('visible');
  }

  /**
   * Valida que el mensaje y la clave no esten vacios.
   * @param {string} message - Mensaje ingresado.
   * @param {string} key     - Clave ingresada.
   * @returns {boolean} true si ambos son validos, false si alguno falla.
   */
  function validate(message, key) {
    if (!message || message.trim() === '') {
      showError('El mensaje no puede estar vacio.');
      return false;
    }
    if (!key || key.trim() === '') {
      showError('La clave no puede estar vacia.');
      return false;
    }
    return true;
  }

  /**
   * Obtiene el algoritmo seleccionado del mapa de algoritmos.
   * @returns {object|null} Modulo del algoritmo o null si no se encuentra.
   */
  function getSelectedAlgorithm() {
    const selected = selectAlgo.value;
    const algo = algorithms[selected];
    if (!algo) {
      showError('Algoritmo no reconocido: ' + selected);
      return null;
    }
    return algo;
  }

  /**
   * Manejador del boton Cifrar.
   * Cifra el mensaje y luego intenta descifrarlo para verificar coincidencia.
   */
  function handleEncrypt() {
    clearResults();

    const message = inputMessage.value;
    const key     = inputKey.value;

    if (!validate(message, key)) return;

    const algo = getSelectedAlgorithm();
    if (!algo) return;

    try {
      const encrypted = algo.encrypt(message, key);
      const decrypted = algo.decrypt(encrypted, key);

      // Muestra los tres resultados en pantalla.
      outputOriginal.textContent  = message;
      outputEncrypted.textContent = encrypted;
      outputDecrypted.textContent = decrypted;

      // Verifica si el mensaje descifrado coincide con el original.
      const match = decrypted === message;
      outputMatch.textContent = match
        ? 'Coincidencia correcta: el mensaje fue recuperado exitosamente.'
        : 'Advertencia: el mensaje descifrado no coincide con el original.';
      outputMatch.classList.add(match ? 'match' : 'no-match');

    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Manejador del boton Descifrar.
   * Descifra el contenido del campo de mensaje asumiendo que ya esta cifrado.
   */
  function handleDecrypt() {
    clearResults();

    const ciphertext = inputMessage.value;
    const key        = inputKey.value;

    if (!validate(ciphertext, key)) return;

    const algo = getSelectedAlgorithm();
    if (!algo) return;

    try {
      const decrypted = algo.decrypt(ciphertext, key);

      outputOriginal.textContent  = ciphertext;
      outputDecrypted.textContent = decrypted;

    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Inicializa la UI: obtiene referencias al DOM y registra los event listeners.
   * Debe llamarse una vez que el DOM este completamente cargado.
   */
  function init() {
    inputMessage  = document.getElementById('input-message');
    inputKey      = document.getElementById('input-key');
    selectAlgo    = document.getElementById('select-algorithm');
    btnEncrypt    = document.getElementById('btn-encrypt');
    btnDecrypt    = document.getElementById('btn-decrypt');
    outputOriginal  = document.getElementById('output-original');
    outputEncrypted = document.getElementById('output-encrypted');
    outputDecrypted = document.getElementById('output-decrypted');
    outputMatch     = document.getElementById('output-match');
    outputError     = document.getElementById('output-error');

    btnEncrypt.addEventListener('click', handleEncrypt);
    btnDecrypt.addEventListener('click', handleDecrypt);
  }

  // Expone solo init() al exterior; todo lo demas es privado.
  return { init };

})();