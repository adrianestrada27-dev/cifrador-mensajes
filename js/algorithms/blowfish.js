// js/algorithms/blowfish.js
// Wrapper del cifrado Blowfish usando la libreria blowfish.js (cargada via CDN).
// Blowfish es un cifrado simetrico de bloque con claves de longitud variable
// (entre 32 y 448 bits). Disenado por Bruce Schneier en 1993.
// Es rapido, libre de patentes y aun considerado seguro para uso general.
// El resultado cifrado se representa en Base64.

const Blowfish = (() => {

  /**
   * Verifica que la libreria Blowfish este disponible en el scope global.
   * @throws {Error} Si la clase Blowfish no esta definida.
   */
  function checkLibrary() {
    if (typeof BlowfishJS === 'undefined') {
      throw new Error('La libreria BlowfishJS no esta disponible. Verifica la conexion a internet.');
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
    const bf = new BlowfishJS(key);
    // .encrypt() retorna un Uint8Array; se convierte a Base64 para representacion legible.
    const encrypted = bf.encrypt(message);
    return btoa(String.fromCharCode(...encrypted));
  }

  /**
   * Descifra un mensaje cifrado con Blowfish.
   * @param {string} ciphertext - Mensaje cifrado en formato Base64.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado en texto plano.
   */
  function decrypt(ciphertext, key) {
    checkLibrary();
    const bf = new BlowfishJS(key);

    // Convierte Base64 de vuelta a Uint8Array antes de descifrar.
    const bytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    const decrypted = bf.decrypt(bytes);
    return decrypted;
  }

  // Expone solo las funciones necesarias al exterior.
  return { encrypt, decrypt };

})();