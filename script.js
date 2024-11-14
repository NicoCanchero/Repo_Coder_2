document.addEventListener("DOMContentLoaded", function () {
  let numeroAleatorio;
  let intentosPrevios = [];
  let adivinadoCorrectamente = false;
  let nombreJugador = "";

  // Recuperar el objeto jugador desde localStorage, o inicializar con un valor por defecto
  let objetoJugador = JSON.parse(localStorage.getItem("objetoJugador")) || {
    nombre: "N/A",
    mejoresIntentos: 999, // Comenzar con un número muy alto como el intento inicial para la comparación
  };

  updatePlayerRecord();

  const storedName = localStorage.getItem("nombreJugador");

  // Si el nombre del jugador existe en localStorage, mostrar los botones del juego
  if (storedName) {
    nombreJugador = storedName;
    document.getElementById("nombreJugador").innerText =
      "Jugador: " + nombreJugador;
    document.getElementById("iniciarJuego").style.display = "inline-block";
    document.getElementById("cambiarNombre").style.display = "inline-block";
    document.getElementById("inputNombre").style.display = "none";
    document.getElementById("botonNombre").style.display = "none";
  } else {
    // Si no hay un nombre almacenado, pedir al usuario que ingrese su nombre
    document.getElementById("inputNombre").style.display = "block";
    document.getElementById("botonNombre").style.display = "inline-block";
    document.getElementById("iniciarJuego").style.display = "none";
    document.getElementById("cambiarNombre").style.display = "none";
  }

  // Función para actualizar la visualización del record del jugador
  function updatePlayerRecord() {
    const recordNombre = document.getElementById("recordNombre");
    const mejorIntento = document.getElementById("mejorIntento");

    if (objetoJugador.mejoresIntentos === 999) {
      recordNombre.innerText = "Aún no existen records";
      mejorIntento.innerText = "";
    } else {
      recordNombre.innerText = objetoJugador.nombre + ":";
      mejorIntento.innerText = objetoJugador.mejoresIntentos + " intentos";
    }
  }

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

    if (intento >= 1 && intento <= 100) {
      intentosPrevios.push(intento);
      actualizarVisualizacionIntentos();

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

        // Actualizar el mejor récord del jugador
        if (intentosPrevios.length < objetoJugador.mejoresIntentos) {
          objetoJugador.mejoresIntentos = intentosPrevios.length;
          objetoJugador.nombre = nombreJugador;

          // Guardar el objeto actualizado en localStorage
          localStorage.setItem("objetoJugador", JSON.stringify(objetoJugador));

          alert(
            "¡Nuevo récord! Te ha llevado " +
              objetoJugador.mejoresIntentos +
              " intentos adivinar el número."
          );
        }

        adivinadoCorrectamente = true;
        finalizarJuego();
        updatePlayerRecord();
      }
    } else {
      alert("Por favor, ingresa un número válido entre 1 y 100.");
    }

    campoIntento.value = "";
  }

  function finalizarJuego() {
    document.getElementById("campoIntento").style.display = "none";
    document.getElementById("botonIntentar").style.display = "none";
    if (confirm("¿Quieres jugar de nuevo?")) {
      jugarJuego();
    } else {
      alert("Gracias por jugar, " + nombreJugador + ". ¡Hasta luego!");
      document.getElementById("intentos").style.display = "none";
      document.getElementById("nombreJugador").innerText =
        "Muchas gracias por jugar " + nombreJugador + "!";

      // Actualizar el record del jugador después de que termine el juego
      updatePlayerRecord();
    }
  }

  function jugarJuego() {
    if (nombreJugador === "") {
      nombreJugador = document.getElementById("inputNombre").value.trim();
      if (nombreJugador === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
      }

      // Guardar el nombre del jugador en localStorage
      localStorage.setItem("nombreJugador", nombreJugador);

      document.getElementById("nombreJugador").innerText =
        "Jugador: " + nombreJugador;
    }

    numeroAleatorio = generarNumeroAleatorio();
    console.log("El número correcto es: " + numeroAleatorio);
    intentosPrevios = [];
    adivinadoCorrectamente = false;

    document.getElementById("intentos").style.display = "block";
    document.getElementById("campoIntento").style.display = "block";
    document.getElementById("botonIntentar").style.display = "block";
    document.getElementById("iniciarJuego").style.display = "none";
    document.getElementById("cambiarNombre").style.display = "none";
  }

  document.getElementById("botonNombre").addEventListener("click", () => {
    nombreJugador = document.getElementById("inputNombre").value.trim();
    if (nombreJugador === "") {
      alert("Por favor, ingresa un nombre para comenzar.");
    } else {
      // Guardar el nombre del jugador en localStorage
      localStorage.setItem("nombreJugador", nombreJugador);

      // Actualizar el nombre del jugador en el HTML
      document.getElementById("nombreJugador").innerText =
        "Jugador: " + nombreJugador;

      document.getElementById("inputNombre").style.display = "none";
      document.getElementById("botonNombre").style.display = "none";
      document.getElementById("iniciarJuego").style.display = "inline-block";
      document.getElementById("cambiarNombre").style.display = "inline-block";
    }
  });

  document.getElementById("iniciarJuego").addEventListener("click", jugarJuego);
  document
    .getElementById("botonIntentar")
    .addEventListener("click", manejarIntento);

  document.getElementById("cambiarNombre").addEventListener("click", () => {
    localStorage.removeItem("nombreJugador");

    // Restablecer el nombre del jugador y mostrar el campo para ingresar el nombre nuevamente
    document.getElementById("nombreJugador").innerText = "";
    document.getElementById("inputNombre").style.display = "block";
    document.getElementById("botonNombre").style.display = "inline-block";
    document.getElementById("cambiarNombre").style.display = "none";
    document.getElementById("iniciarJuego").style.display = "none";
  });
});
