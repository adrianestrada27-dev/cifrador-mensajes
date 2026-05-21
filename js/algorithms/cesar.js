// js/algorithms/cesar.js
// Implementacion del cifrado Cesar (cifrado por sustitucion clasica).
// Desplaza cada letra del mensaje un numero fijo de posiciones en el alfabeto.
// Los caracteres no alfabeticos (espacios, numeros, simbolos) se conservan intactos.

const Cesar = (() => {

  /**
   * Convierte la clave de texto a un numero de desplazamiento.
   * Suma los valores ASCII de cada caracter y aplica modulo 26
   * para mantener el desplazamiento dentro del rango del alfabeto.
   * @param {string} key - Clave ingresada por el usuario.
   * @returns {number} Desplazamiento entre 0 y 25.
   */
  function keyToShift(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % 26;
  }

  /**
   * Desplaza un caracter alfabetico el numero de posiciones indicado.
   * Respeta mayusculas y minusculas de forma independiente.
   * @param {string} char  - Caracter a desplazar (una sola letra).
   * @param {number} shift - Posiciones a desplazar (positivo = cifrar, negativo = descifrar).
   * @returns {string} Caracter desplazado.
   */
  function shiftChar(char, shift) {
    const isUpper = char >= 'A' && char <= 'Z';
    const isLower = char >= 'a' && char <= 'z';

    if (!isUpper && !isLower) return char; // no es letra, se devuelve igual

    const base = isUpper ? 65 : 97; // codigo ASCII de 'A' o 'a'
    const code = char.charCodeAt(0);

    // Aplica desplazamiento con modulo 26 para mantenerlo en el alfabeto.
    // Se suma 26 antes del modulo para evitar valores negativos al descifrar.
    return String.fromCharCode(((code - base + shift + 26) % 26) + base);
  }

  /**
   * Cifra un mensaje usando el cifrado Cesar.
   * @param {string} message - Mensaje en texto plano.
   * @param {string} key     - Clave definida por el usuario.
   * @returns {string} Mensaje cifrado.
   */
  function encrypt(message, key) {
    const shift = keyToShift(key);
    return message.split('').map(char => shiftChar(char, shift)).join('');
  }

  /**
   * Descifra un mensaje cifrado con Cesar.
   * Descifrar es cifrar con el desplazamiento negativo.
   * @param {string} ciphertext - Mensaje cifrado.
   * @param {string} key        - Clave usada al cifrar.
   * @returns {string} Mensaje descifrado.
   */
  function decrypt(ciphertext, key) {
    const shift = keyToShift(key);
    return ciphertext.split('').map(char => shiftChar(char, -shift)).join('');
  }

  // Expone solo las funciones necesarias al exterior.
  return { encrypt, decrypt };

})();