// js/algorithms/blowfish.js
// Wrapper del cifrado Blowfish usando la libreria blowfish.js (cargada via CDN).
// El objeto global que expone el CDN se llama "Blowfish".
// Este modulo se exporta como "BlowfishAlgo" para evitar conflicto de nombres.

const BlowfishAlgo = (() => {

  /**
   * Verifica que la libreria Blowfish este disponible en el scope global.
   * @throws {Error} Si la clase Blowfish no esta definida.
   */
  function checkLibrary() {
    if (typeof Blowfish === 'undefined') {
      throw new Error('La libreria Blowfish no esta disponible. Verifica la conexion a internet.');
    }
  }

  /**
   * Cifra un mensaje usando Blowfish.
   * @param {string} message - Mensaje en texto plano.
   * @param {string} key     - Clave definida por el usuario.
   * @returns {string} Mensaje cifrado en formato Base64.
   */
  function encrypt(message, key) {
    checkLibrary();
    const bf = new Blowfish(key);
    const encrypted = bf.encrypt(message);
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }

  /**
   * Descifra un mensaje cifrado con Blowfish.
   * @param {string} ciphertext - Mensaje cifrado en formato Base64.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado en texto plano.
   */
  function decrypt(ciphertext, key) {
    checkLibrary();
    const bf = new Blowfish(key);
    const bytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    return bf.decrypt(bytes);
  }

  return { encrypt, decrypt };

})();