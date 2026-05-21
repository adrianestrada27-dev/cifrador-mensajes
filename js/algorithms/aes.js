// js/algorithms/aes.js
// Wrapper del cifrado AES usando la libreria crypto-js (cargada via CDN).
// Modo: CBC con padding PKCS7 (comportamiento por defecto de crypto-js).
// La clave es una cadena de texto libre; crypto-js deriva la clave internamente.
// El resultado cifrado se representa en Base64.

const AES = (() => {

  /**
   * Verifica que la libreria crypto-js este disponible en el scope global.
   * Se lanza un error claro si el CDN no cargo correctamente.
   * @throws {Error} Si CryptoJS no esta definido.
   */
  function checkLibrary() {
    if (typeof CryptoJS === 'undefined') {
      throw new Error('La libreria CryptoJS no esta disponible. Verifica la conexion a internet.');
    }
  }

  /**
   * Cifra un mensaje usando AES.
   * @param {string} message - Mensaje en texto plano.
   * @param {string} key     - Clave definida por el usuario.
   * @returns {string} Mensaje cifrado en formato Base64.
   */
  function encrypt(message, key) {
    checkLibrary();
    // CryptoJS.AES.encrypt retorna un objeto WordArray; .toString() lo convierte a Base64.
    const encrypted = CryptoJS.AES.encrypt(message, key);
    return encrypted.toString();
  }

  /**
   * Descifra un mensaje cifrado con AES.
   * @param {string} ciphertext - Mensaje cifrado en formato Base64.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado en texto plano.
   */
  function decrypt(ciphertext, key) {
    checkLibrary();
    // .decrypt retorna un WordArray; .toString(CryptoJS.enc.Utf8) lo convierte a texto legible.
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    // Si el resultado esta vacio, la clave es incorrecta o el texto esta corrupto.
    if (!plaintext) {
      throw new Error('AES: no se pudo descifrar. Clave incorrecta o mensaje corrupto.');
    }

    return plaintext;
  }

  // Expone solo las funciones necesarias al exterior.
  return { encrypt, decrypt };

})();