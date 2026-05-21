# Cifrador de Mensajes Seguro

Aplicacion web para cifrar y descifrar mensajes usando seis algoritmos criptograficos distintos. Desarrollada con HTML, CSS y JavaScript puro, sin frameworks ni dependencias de backend.

---

## Algoritmos implementados

| Algoritmo | Tipo                | Implementacion    |
| --------- | ------------------- | ----------------- |
| Cesar     | Sustitucion clasica | Nativa (JS puro)  |
| XOR       | Operacion bitwise   | Nativa (JS puro)  |
| AES       | Simetrico moderno   | crypto-js via CDN |
| DES       | Simetrico legacy    | crypto-js via CDN |
| 3DES      | Simetrico legacy    | crypto-js via CDN |
| Blowfish  | Simetrico legacy    | Nativa (JS puro)  |

---

## Estructura del proyecto

cifrador/
index.html -- estructura principal y carga de recursos
css/
style.css -- estilos, tema terminal de seguridad
js/
algorithms/
cesar.js -- cifrado Cesar
xor.js -- cifrado XOR
aes.js -- cifrado AES via crypto-js
des.js -- cifrado DES via crypto-js
des3.js -- cifrado Triple DES via crypto-js
blowfish.js -- cifrado Blowfish (implementacion nativa)
ui.js -- logica de interfaz y manejo de eventos
main.js -- punto de entrada, inicializacion

---

## Dependencias externas

- [crypto-js 4.2.0](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js) — AES, DES, 3DES

Blowfish se implemento de forma nativa en JS puro debido a incompatibilidades de CORB con librerias externas disponibles via CDN.

---

## Uso

1. Abre `index.html` en cualquier navegador moderno
2. Escribe el mensaje
3. Define una clave
4. Selecciona el algoritmo
5. Presiona **Cifrar** o **Descifrar**

No requiere servidor ni instalacion.

---

## Validaciones

- Clave vacia: muestra error y detiene la operacion
- Mensaje vacio: muestra error y detiene la operacion
- Error interno del algoritmo: se captura y muestra al usuario

---

## Materia

Criptografia — 8vo Semestre
