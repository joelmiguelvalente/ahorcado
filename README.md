# Ahorcado [BETA]
![GitHub repo size](https://img.shields.io/github/repo-size/joelmiguelvalente/ahorcado?color=red&label=Peso%20del%20repositorio&logo=size&style=flat-square)

> Falta: Que inicie el teclado para los dispositivos, porque no se podrá jugar

# Agregar palabras
Estas se agregan haciendo uso del [**localstorage**](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage), lo que hace que se pueda almacenar en el navegador y que puedas recargar sin perder esa lista generada, y las palabras que se añaden y existen en la listas, estas no se agregarán. Eso sí, estas nuevas palabras solamente estarán en el navegador del usuario que lo use, por el momento será así, para más adelante varios podrán compartir la lista que se vaya generando con el tiempo!
> Ya se reparó el problema de agregar palabras repetidas, si existe o tiene menos de 4 letras no las agregará

# Cambiar lista
Si en el caso quieres que la lista este vacía o tenga otras palabras que desees, pues ir a **palabras.js**, si dejarlo vacío solamente reemplazala con esto y listo.
```javascript
let listaPalabras = [];
```

# Eliminar palabra
Se puede eliminar una pabra de la lista? Si solo debes hacer clic sobre la palabra que deseas quitar, por ahora por cada palabra que cliquees para quitar se recarga la página... Aún tengo el error que quita una sola vez

# Jugando
Las palabras se eligen aleatoriamente de la lista ya creada por el/los usuario/s haciendo uso del localstorage, y una vez que tiene la palabra seleccionada esta la convertimos en **array** para obtener la cantidad de líneas que deben aparacer en el juego, ejemplo:

`document` => devolvera un `array('d','o','c','u','m','e','n','t')` usando el `.length` van a ser 8 líneas totales

# Reinicar juego | Ganar juego
Ya tiene una función en la que puedes reiniciar el juego o si ganas, podrás continuar sin recargar la página ya que la función realiza eso por tí...

### Otros repositorios (Oracle Next Education)
 * 🗄 [Encriptador v1](https://github.com/joelmiguelvalente/challengeencriptador) - ChallengeOne
 * 🗄 [Ahorcado v1](https://github.com/joelmiguelvalente/ahorcado) - ChallengeOne

### Otros repositorios (Alternos)
 * 🗄 [Encriptador v2](https://github.com/joelmiguelvalente/encriptador/tree/main)
 * 🗄 [Encriptador v3](https://github.com/joelmiguelvalente/encriptador)

### Páginas
 * 🔗 [Encriptador v1](https://joelmiguelvalente.github.io/challengeencriptador/) 
 * 🔗 [Encriptador v2](https://exquisite-moonbeam-680e7e.netlify.app/) 
 * 🔗 [Encriptador v3](https://joelmiguelvalente.github.io/encriptador/)
 * 🔗 [Barbería Alura](https://joelmiguelvalente.github.io/barberiaalura/) 

### Redes 
 * 💻 [Linkedin](https://www.linkedin.com/in/joelmiguelvalente)
 * 💻 [Discord](https://discord.com/users/465203938900049920)
 * 💻 [Twitter](https://twitter.com/JvalenteM92)