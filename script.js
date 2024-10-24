let numeroAleatorio;
let intentosPrevios = []; // Array para guardar intentos previos
let adivinadoCorrectamente = false;
let nombreJugador = "";

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 100) + 1;
}

function actualizarVisualizacionIntentos() {
  const divIntentos = document.getElementById("intentos");
  divIntentos.innerHTML = "Intentos previos: " + intentosPrevios.join(", ");
}

function manejarIntento() {
  const campoIntento = document.getElementById("campoIntento");
  let intento = Number(campoIntento.value);

  // Verificar si el intento es un número válido
  if (intento >= 1 && intento <= 100) {
    intentosPrevios.push(intento); // Almacenar el intento
    actualizarVisualizacionIntentos(); // Actualizar array previos

    if (intento < numeroAleatorio) {
      alert("¡Demasiado bajo! Intenta de nuevo.");
    } else if (intento > numeroAleatorio) {
      alert("¡Demasiado alto! Intenta de nuevo.");
    } else {
      alert(
        "¡Felicidades, " +
          nombreJugador +
          "! Adivinaste el número correcto: " +
          numeroAleatorio
      );
      adivinadoCorrectamente = true;
      finalizarJuego();
    }
  } else {
    alert("Por favor, ingresa un número válido entre 1 y 100.");
  }

  // Limpiar campo de entrada
  campoIntento.value = "";
}

function finalizarJuego() {
  document.getElementById("campoIntento").style.display = "none";
  document.getElementById("botonIntentar").style.display = "none";
  // Confirm - Preguntar si quiere jugar de nuevo
  if (confirm("¿Quieres jugar de nuevo?")) {
    jugarJuego();
  } else {
    alert("Gracias por jugar, " + nombreJugador + ". ¡Hasta luego!");
    document.getElementById("intentos").style.display = "none";
    document.getElementById("nombreJugador").innerText =
      "Muchas gracias por jugar " + nombreJugador + "!";
  }
}

function jugarJuego() {
  if (nombreJugador === "") {
    nombreJugador = prompt("Por favor, ingresa tu nombre:"); // Prompt - Preguntar por el nombre
    document.getElementById("nombreJugador").innerText =
      "Jugador: " + nombreJugador;
  }

  numeroAleatorio = generarNumeroAleatorio();
  console.log("El número correcto es: " + numeroAleatorio); // console.log para mostrar numero ganador
  intentosPrevios = []; // Limpiar intentos previos
  adivinadoCorrectamente = false;
  document.getElementById("intentos").innerHTML = "Intentos previos: ";

  document.getElementById("campoIntento").style.display = "block";
  document.getElementById("botonIntentar").style.display = "block";
  document.getElementById("iniciarJuego").style.display = "none";
}

// Event listener a los botones
document.getElementById("iniciarJuego").addEventListener("click", jugarJuego);
document
  .getElementById("botonIntentar")
  .addEventListener("click", manejarIntento);
