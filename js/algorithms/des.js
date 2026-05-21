// js/algorithms/des.js
// Wrapper del cifrado DES usando la libreria crypto-js (cargada via CDN).
// DES (Data Encryption Standard) es un algoritmo simetrico de bloque con
// clave de 56 bits efectivos. Hoy se considera inseguro para uso real,
// pero se implementa aqui con fines educativos y comparativos.
// El resultado cifrado se representa en Base64.

const DES = (() => {

  /**
   * Verifica que la libreria crypto-js este disponible en el scope global.
   * @throws {Error} Si CryptoJS no esta definido.
   */
  function checkLibrary() {
    if (typeof CryptoJS === 'undefined') {
      throw new Error('La libreria CryptoJS no esta disponible. Verifica la conexion a internet.');
    }
  }

  /**
   * Cifra un mensaje usando DES.
   * @param {string} message - Mensaje en texto plano.
   * @param {string} key     - Clave definida por el usuario.
   * @returns {string} Mensaje cifrado en formato Base64.
   */
  function encrypt(message, key) {
    checkLibrary();
    // CryptoJS.DES.encrypt retorna un objeto WordArray; .toString() lo convierte a Base64.
    const encrypted = CryptoJS.DES.encrypt(message, key);
    return encrypted.toString();
  }

  /**
   * Descifra un mensaje cifrado con DES.
   * @param {string} ciphertext - Mensaje cifrado en formato Base64.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado en texto plano.
   */
  function decrypt(ciphertext, key) {
    checkLibrary();
    // .decrypt retorna un WordArray; .toString(CryptoJS.enc.Utf8) lo convierte a texto legible.
    const decrypted = CryptoJS.DES.decrypt(ciphertext, key);
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    // Si el resultado esta vacio, la clave es incorrecta o el texto esta corrupto.
    if (!plaintext) {
      throw new Error('DES: no se pudo descifrar. Clave incorrecta o mensaje corrupto.');
    }

    return plaintext;
  }

  // Expone solo las funciones necesarias al exterior.
  return { encrypt, decrypt };

})();