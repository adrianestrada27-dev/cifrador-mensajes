// js/algorithms/xor.js
// Implementacion del cifrado XOR (operacion bitwise exclusiva).
// Cada byte del mensaje se combina con un byte de la clave usando XOR.
// La clave se repite ciclicamente para cubrir todo el mensaje.
// El resultado se representa en hexadecimal para evitar caracteres no imprimibles.

const XOR = (() => {

  /**
   * Cifra un mensaje aplicando XOR byte a byte contra la clave.
   * El resultado se codifica en hexadecimal (2 caracteres por byte).
   * @param {string} message - Mensaje en texto plano.
   * @param {string} key     - Clave definida por el usuario.
   * @returns {string} Mensaje cifrado en formato hexadecimal.
   */
  function encrypt(message, key) {
    let result = '';

    for (let i = 0; i < message.length; i++) {
      const msgByte  = message.charCodeAt(i);
      const keyByte  = key.charCodeAt(i % key.length); // clave ciclica
      const xorByte  = msgByte ^ keyByte;               // operacion XOR

      // Convierte el byte resultante a hex de 2 digitos (e.g. 7 -> "07")
      result += xorByte.toString(16).padStart(2, '0');
    }

    return result;
  }

  /**
   * Descifra un mensaje cifrado con XOR.
   * Convierte el hexadecimal de vuelta a bytes y aplica XOR con la misma clave.
   * XOR es simetrico: aplicar la operacion dos veces con la misma clave
   * recupera el mensaje original.
   * @param {string} ciphertext - Mensaje cifrado en formato hexadecimal.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado en texto plano.
   */
  function decrypt(ciphertext, key) {
    let result = '';

    // Procesa el hex de 2 en 2 caracteres (cada par es un byte)
    for (let i = 0; i < ciphertext.length; i += 2) {
      const hexPair  = ciphertext.substring(i, i + 2);
      const xorByte  = parseInt(hexPair, 16);            // hex a numero
      const keyByte  = key.charCodeAt((i / 2) % key.length);
      const msgByte  = xorByte ^ keyByte;                // XOR inverso

      result += String.fromCharCode(msgByte);
    }

    return result;
  }

  // Expone solo las funciones necesarias al exterior.
  return { encrypt, decrypt };

})();