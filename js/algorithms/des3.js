// js/algorithms/des3.js
// Wrapper del cifrado Triple DES (3DES) usando la libreria crypto-js (cargada via CDN).
// 3DES aplica el algoritmo DES tres veces en modo EDE (Encrypt-Decrypt-Encrypt)
// usando una clave que internamente se divide en tres subclaves.
// Es mas robusto que DES simple pero significativamente mas lento que AES.
// El resultado cifrado se representa en Base64.

const DES3 = (() => {

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
   * Cifra un mensaje usando Triple DES.
   * @param {string} message - Mensaje en texto plano.
   * @param {string} key     - Clave definida por el usuario.
   * @returns {string} Mensaje cifrado en formato Base64.
   */
  function encrypt(message, key) {
    checkLibrary();
    // CryptoJS.TripleDES.encrypt retorna un objeto WordArray; .toString() lo convierte a Base64.
    const encrypted = CryptoJS.TripleDES.encrypt(message, key);
    return encrypted.toString();
  }

  /**
   * Descifra un mensaje cifrado con Triple DES.
   * @param {string} ciphertext - Mensaje cifrado en formato Base64.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado en texto plano.
   */
  function decrypt(ciphertext, key) {
    checkLibrary();
    // .decrypt retorna un WordArray; .toString(CryptoJS.enc.Utf8) lo convierte a texto legible.
    const decrypted = CryptoJS.TripleDES.decrypt(ciphertext, key);
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    // Si el resultado esta vacio, la clave es incorrecta o el texto esta corrupto.
    if (!plaintext) {
      throw new Error('3DES: no se pudo descifrar. Clave incorrecta o mensaje corrupto.');
    }

    return plaintext;
  }

  // Expone solo las funciones necesarias al exterior.
  return { encrypt, decrypt };

})();