// Seleccionamos el contenedor general
const ahorcado = document.querySelector(".contenedor");
// Los 3 divs que se usarán
const inicio = ahorcado.querySelector(".inicio");
const agregar_palabra = ahorcado.querySelector(".agregar_palabra");
const iniciar_juego = ahorcado.querySelector(".iniciar_juego");
// Ejecutamos el evento key
let escribir = true;
let secreto = '';
let contar = 0;

// Preguntamos si existe una lista guardada
// https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
if( localStorage.getItem('listaPalabras') === null ) {
	// Si no existe, creamos la lista
	localStorage.setItem('listaPalabras', listaPalabras);
} 
const lista = (localStorage.getItem('listaPalabras') === null) ? listaPalabras.join(',') : localStorage.getItem('listaPalabras');

let palabrasExistentes = lista.split(',');
// para mi, es mejor que usar for o while
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
function agregarPalabraLista(array = '') {
	agregar_palabra.querySelector(".lista_palabras ul").innerHTML = ''
	agregar_palabra.querySelector('textarea').value = ''
	var mapear = (array !== '') ? array : palabrasExistentes;
	mapear.map( (palabra, posicion) => {
		// Se añade a la lista existente
		agregar_palabra.querySelector(".lista_palabras ul").innerHTML += `<li class="display-inline-block" id="palabra_${posicion}">${palabra}</li>`
	})
}
agregarPalabraLista()


/**
 * Eliminamos palabras de la lista
*/
const itemArray = [].slice.call(agregar_palabra.querySelector(".lista_palabras ul").children)
// Con esto eliminamos la palabra que deseamos
itemArray.map( eliminar => {
	eliminar.addEventListener('click', e => {
		quien = document.getElementById(e.target.id).textContent;
		editarLista = lista.split(',');
		// Creamos una array temporal
		let nLista = [];
		for(let n = 0; n < editarLista.length; n++) {
			if(quien !== editarLista[n]) nLista.push(editarLista[n])
		}
		// Volvemos a cargar la lista en el localstorage
		localStorage.setItem('listaPalabras', nLista);
		agregarPalabraLista(nLista);
		location.reload();
	})
})


/**
 * Función para comprobar palabras
 * Si el usuario añade en el campo palabras repetidas
*/
const fnComprobarAntes = strArr => {
	strArr = strArr.trim().split(' ');
   const resp = [];
   for(let i = 0; i < strArr.length; i++){
      if(strArr.indexOf(strArr[i]) !== strArr.lastIndexOf(strArr[i])){
         if(!resp.includes(strArr[i])) {
         	if(strArr[i].length >= 4) resp.push(strArr[i]);
         }
      } else {
      	if(strArr[i].length >= 4) resp.push(strArr[i]);
      }
   }
   return resp;
}

/**
 * Función para verificar la lista
*/
function fnObtenerListaCreada() {
	let getList = []
	const obtenerLista = [].slice.call(agregar_palabra.querySelectorAll(".lista_palabras ul li"));
	obtenerLista.map( item => getList.push(item.textContent))
	return getList;
}

/**
 * Funcion para añadir más palabras
*/
function fnAgregarPalabra() {
	let lista = localStorage.getItem('listaPalabras').split(',');
	// Obtenemos todas las palabras del textarea
	const nuevasPalabras = agregar_palabra.querySelector('textarea').value;
	const comprobar = fnComprobarAntes(nuevasPalabras);
	// Inspeccionamos la lista
	for(var i = 0; i < comprobar.length; i++) {
		// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
		if(fnObtenerListaCreada().includes(comprobar[i]) === false) {
			newWord = comprobar[i].trim();
			// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/push
			lista.push(newWord);
			// Añadimos palabras a la lista visual
			var item = document.createElement('li');
		   item.setAttribute("class", "display-inline-block");
		   item.innerHTML = newWord;
		   agregar_palabra.querySelector("ul").insertAdjacentElement("beforeend", item);
			// Actualizamos la lista
			agregarPalabraLista(lista);
		}		
	}	
	localStorage.setItem('listaPalabras', lista);
}

/**
 * Obtenemos todos los botones
*/
const botones = [].map.call(ahorcado.querySelectorAll(".boton"), boton => {
	boton.addEventListener('click', event => {
		bloque = event.target.dataset.div;
		switch (bloque) {
			case 'agregar':
				fnAgregarPalabra();
			break; // evitamos que se siga ejecutando
			case 'reiniciar':
			case 'nuevo':
				fnPalabraSecreta();
				fnReiniciar();
			break; // evitamos que se siga ejecutando
			case 'regresar':
			case 'insertar':
				inicio.style.display = (bloque === 'regresar' ? 'block' : 'none');
				agregar_palabra.style.display = (bloque === 'regresar' ? 'none' : 'block');
			break; // evitamos que se siga ejecutando
			case 'iniciar':
			case 'desistir':
				if(bloque === 'iniciar') {
					var dn = fnPalabraSecreta();
					// Acción cada vez que presiona una tecla, durante
					function repeatFN(ltr) {
						fnLetraCorrecta(ltr)
						if(fnComprobar()) {
							miAlerta.iniciar("Ganaste, felicidades")
							document.querySelector(".modal").style.color = "green"
							fnPalabraSecreta();
						}
						fnLetraEquivocada(ltr)
						if(contar >= 11) {
							miAlerta.iniciar("Fin del juego, la palabra era <b>" + dn + "</b>")
							document.querySelector(".modal").style.color = "red"
							fnPalabraSecreta();
						}
					}
					const tecladoMovil = [].slice.call(document.querySelectorAll(".teclas input"))
					tecladoMovil.map( tecla => {
						tecla.onclick = valor => repeatFN(valor.target.value)
					})
					document.onkeypress = tecla => {
						if(tecla.charCode >= 97 && tecla.charCode <= 122) repeatFN(tecla.key)
					}
				}
				inicio.style.display = (bloque === 'iniciar' ? 'none' : 'block');
				iniciar_juego.style.display = (bloque === 'iniciar' ? 'block' : 'none');
			break; // evitamos que se siga ejecutando
		}
	})
})

/** Generamos nueva palabra secreta **/
function fnPalabraSecreta() {
	// Limpiamos
	document.querySelector(".palabras").innerHTML = ''
	document.querySelector(".escritas").innerHTML = ''
	// Desde acá elegimos una palabra al azar
	let IndexOfList = Math.round(Math.random() * lista.split(',').length);
	let WordSecret = lista.split(',')[IndexOfList];
	WordSecret.split('').map( (letra, posicion) => document.querySelector(".palabras").innerHTML += '<input type="text" id="p'+posicion+'" class="line"/>')
	secreto = WordSecret;
	return WordSecret
}

function fnLetraCorrecta(letra) {
	letra = letra.toLowerCase()
	let descomponerPalabra = secreto.split('');

	for(let init = 0;init <= descomponerPalabra.length; init++) {
		if(letra === descomponerPalabra[init]) {
			document.getElementById("p" + init).classList.add('add')
			document.getElementById("p" + init).value = letra.toLowerCase()
		}
	}
}

function fnLetraEquivocada(letra) {
	letra = letra.toLowerCase()
	const descomponerPalabra = secreto.split('');
	let continuar = true;
	// Creamos un arreglo para letras erroneas
	let yalotiene = '';
	let mal = [].slice.call(iniciar_juego.querySelectorAll(".escritas .ya"));
	// Primero comprobamos que la letra correcta, no se agregue
	if(!descomponerPalabra.includes(letra)) {
		for (var i = 0; i < mal.length; i++) {
			if(mal[i].textContent === letra) {
				continuar = false;
			}
		}
		if(continuar) {
			document.querySelector(".escritas").innerHTML += '<span class="ya">'+letra+'</span>';
			contar += 1;
			console.log(contar)
			const armar = document.querySelectorAll(".ahorcado .armar");
			for(let a = 0; a < armar.length; a++) {
				armarInt = parseInt(armar[a].getAttribute('armar'));
				if(armarInt === contar) {
					armar[a].style.display = 'block'
				}
			}
		}
		
	}
}

function fnReiniciar() {
	const armar = document.querySelectorAll(".ahorcado .armar");
	for(let a = 0; a < armar.length; a++) {
		armarInt = parseInt(armar[a].getAttribute('armar'));
		armar[a].style.display = 'none'
	}
	contar = 0;
}

function fnComprobar() {
	let arr = [];
	let obtenerLetras = iniciar_juego.querySelectorAll(".palabras .line.add")
	for(var letra = 0; letra < obtenerLetras.length; letra++) {
		arr.push(obtenerLetras[letra].value)
	}
	return (arr.join('') === secreto);
}

// Acción cada vez que presionó una tecla, despues
document.onkeydown = tecla => {
	if(tecla.code === "Enter" || tecla.key === "Enter" || tecla.keyCode === 13) {
		fnAgregarPalabra();
		tecla.preventDefault()
		return false;
	} else if(tecla.code === "Escape" || tecla.key === "escape" || tecla.keyCode === 27) {
		miAlerta.quitar();
		fnReiniciar()
	}
}

var miAlerta = {
	relanzar: () => {
		miAlerta.quitar();
		contar = 0;
		fnReiniciar()
	},
	iniciar: mensaje => {
		const plantilla = `<div class="mascara" onclick="miAlerta.relanzar()"><div class="modal">${mensaje}</div></div>`
		document.querySelector("#mymodal").innerHTML = plantilla
	},
	quitar: () => document.querySelector("#mymodal").innerHTML = ''
}

/**
 * Polyfill => Ejecutar el siguiente código antes de cualquier otro código creará un trim ( ) 
 * si este no está disponible de manera nativa.
 * 
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
*/
if (!String.prototype.trim) {
  	(() => String.prototype.trim = () => this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''))();
}