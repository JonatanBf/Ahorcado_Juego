// ### VARIABLES ###

// Array de palabras
let palabras = 
[
["HTML", "lenguaje de marcado"], 
["CSS", "lenguaje de estilo"], 
["Bootstrap", "framework CSS"], 
["Nodejs", "Intérprete de JavaScript"], 
["Bit", "valor binario"], 
["Propiedad", "Característica de un objeto"], 
["Responsive", "diferentes tamaños de pantalla"], 
["Servidor", "donde se ejecuta el Back-End"], 
["Scrum", "Metodología de desarrollo ágil"], 
["Tester", "Pruebas de software"], 
["Java", "Orientado a objetos"], 
["JavaScript", "Dinámico, basado en un prototipo de alto nivel"], 
["Breakpoint", "Punto de interrupcion"], 
["Commit", "Confirmar cambios de forma permanente"], 
["Algoritmo", "Conjunto de pasos"], 
["React", "Biblioteca JavaScript"], 
["BackEnd", "Detrás de escena"], 
["Queries", "Base de datos"], 
["Bug", "problema en el código"]
];

// Palabra a averiguar
let palabra = "";

// Nº aleatorio
let rand;

// Palabra oculta
let oculta = [];

// mensaje final
let msgfinal = document.getElementById("msg-final")

// mensaje final
let h3Acierto = document.getElementById("acierto")

// Elemento html de la palabra
let hueco = document.getElementById("palabra");

// Contador de intentos
let cont = 6;

// span intentos
let spanIntentos = document.getElementById("intentos")

// Botones de letras
let buttons = document.getElementsByClassName('letra');

// Boton de reset
let btnInicio = document.getElementById("reset");


// Boton de Mostrar Pista
let btnPista = document.getElementById("pista");

// Boton de mostrarPalabra
let btnMostrarPalabra = document.getElementById("mostrar")

// Boton de mostrarPalabra
let spanHueco = document.getElementById("hueco-pista")

// Div_ Botoones
let divAbc = document.getElementById("abcdario")


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 18).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
  btnPista.style.display = "inline"
  btnMostrarPalabra.style.display = "inline"
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (let i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");

}

//Generar abecedario
function generaABC (a,z) {
  divAbc.innerHTML = "";
  let i = a.charCodeAt(0), j = z.charCodeAt(0);
  let letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    divAbc.innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      divAbc.innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='Ñ'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(let i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    h3Acierto.innerHTML = "Acertaste!";
    h3Acierto.className += "acierto verde";
  }else{
    cont--;
    spanIntentos.innerHTML = cont;
    h3Acierto.innerHTML = "Mmm, intentalo de nuevo";
    h3Acierto.className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    h3Acierto.className = ""; 
  }, 999);
}

// Obtener pista
function pista() {
  spanHueco.innerHTML = `Pista: ${palabras[rand][1]}`
  btnPista.style.display = "none";
  spanHueco.style.color = "#391df2";
  spanHueco.style.border = "solid #f21d1d";
  setTimeout( function() {
    spanHueco.innerHTML = ""
  },4000)
  console.log(msgfinal)
  }
  
// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    msgfinal.innerHTML = "Felicidades !!";
    msgfinal.className += "zoom-in";
    hueco.className += "encuadre";
    spanHueco.innerHTML ="";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    btnInicio.innerHTML = "Jugar de nuevo";
    setTimeout(function (){
      if (confirm("Jugar de nuevo? ")){
        window.location.reload()
    }
    }, 2000);
  }else if( cont == 0 ) {
    msgfinal.innerHTML = "Game Over";
    msgfinal.className += "zoom-in";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Jugar de nuevo";
    setTimeout(function (){
      if (confirm("Jugar de nuevo? ")){
        window.location.reload()
    }
    }, 2000);
  }
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  spanIntentos.innerHTML=cont;
  // spanHueco = "";
}

// Iniciar
window.onload = inicio();


//Obtener Palabra
function mostrarPalabra() {
  hueco.innerHTML = palabras[rand][0];
  msgfinal.innerHTML = "Ud se ha rendido <br> Game Over";
  msgfinal.className += "zoom-in";
  spanIntentos.innerHTML = "😥";
  btnPista.style.display = "none";
  btnMostrarPalabra.style.display = "none";
    setTimeout(function (){
      if (confirm("Jugar de nuevo? ")){
        window.location.reload()
    }
    }, 2000);
    }
  

