/* Logica del juego inicio/reinicio = resultado segun el violentometro */

const preguntas = [
    // ZONA AMARILLA (ALERTA)
    { texto: "¿Te hace bromas hirientes o piropos ofensivos?", valor: 2 },
    { texto: "¿Controla tus redes sociales o relaciones con tu familia?", valor: 4 },
    { texto: "¿Descalifica tus opiniones o te miente?", valor: 5 },

    // ZONA NARANJA (REACCIONA)
    { texto: "¿Te trata con desprecio o te insulta?", valor: 7 },
    { texto: "¿Te empuja, te jalonea, pellizca o araña?", valor: 8 },
    { texto: "¿Maneja y dispone de tu dinero o documentos sin tu permiso?", valor: 9 },

    // ZONA ROJA (URGENTE)
    { texto: "¿Te golpea o agrede físicamente?", valor: 13 },
    { texto: "¿Te obliga a tener relaciones sexuales (violación)?", valor: 15 },
    { texto: "¿Te amenaza de muerte o aísla de tus seres queridos?", valor: 20 }
];

let indicePreguntaActual = 0;
let puntuacionTotal = 0;

// REFERENCIAS DE ELEMENTOS DOM

const juegoPrincipal = document.getElementById('juego-principal');
const juegoContainer = document.getElementById('juego-container');
const preguntaContainer = document.getElementById('pregunta-container');
const resultadoContainer = document.getElementById('resultado-container');

const btnIniciar = document.getElementById('btn-iniciar');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const btnReiniciar = document.getElementById('btn-reiniciar'); // Botón estático
const instruccionParrafo = juegoPrincipal.querySelector('p');

// OCULTAR ELEMENTOS AL INICIO

juegoContainer.style.display = 'none';
instruccionParrafo.style.display = 'none'; 
if (btnIniciar) {
    btnIniciar.style.display = 'block';
}

if (btnReiniciar) { 
    btnReiniciar.style.display = 'none'; 
}

/* Inicia el flujo del juego, ocultando el botón de inicio y mostrando el contenedor de preguntas */

function iniciarJuego() {
    btnIniciar.style.display = 'none';
    instruccionParrafo.style.display = 'block'; 
    juegoContainer.style.display = 'flex'; 

    /* Boton de reiniciar se encuentra oculto */

    btnReiniciar.style.display = 'none';
    mostrarPregunta();
}

/* Reinicia las variables de estado y vuelve a mostrar la primer pregunta */

function reiniciarJuego() {
            indicePreguntaActual = 0;
            puntuacionTotal = 0;
            
            /* Oculta el resultado y limpia el estilo */
            resultadoContainer.style.display = 'none';
            resultadoContainer.className = ''; // Limpia el color de resultado
            
            /* oculta el boton de reiniciar */
            btnReiniciar.style.display = 'none';
            
            /* Instrucciones ocultas */
            instruccionParrafo.style.display = 'block';

            /*Oculta el contenedor de preguntas y opciones */ 
            juegoContainer.style.display = 'none';
            mostrarPregunta();

            /* Muestra menu */
            btnIniciar.style.display = 'block';
        }

/* Muestra la pregunta actual o, si se terminaron, llama a mostrarResultado */

function mostrarPregunta() {
    if (indicePreguntaActual < preguntas.length) {
        preguntaContainer.textContent = preguntas[indicePreguntaActual].texto;
    } else {
        mostrarResultado();
    }
}

/* captura la respuesta del usuario, actualiza la puntuación y avanza a la siguiente pregunta 
@param {boolean} esAfirmativa - True si la respuesta es "Sí", False si es "No".*/

function manejarRespuesta(esAfirmativa) {
    if (indicePreguntaActual < preguntas.length) {
        if (esAfirmativa) {
            puntuacionTotal += preguntas[indicePreguntaActual].valor;
        }
        indicePreguntaActual++;
        mostrarPregunta();
    }
}

/* Calcula el resultado final, establece el mensaje y el color, y muestra el botón de reinicio */

function mostrarResultado() {
    juegoContainer.style.display = 'none';
    instruccionParrafo.style.display = 'none';
    
    let mensaje = "";
    let claseColor = "";

    // Logica de rangos
    if (puntuacionTotal >= 45) { 
        mensaje = "🔴 ¡URGENTE! RIESGO DE FEMINICIDIO <br><br> Tu vida corre PELIGRO INMINENTE. Llama a las autoridades de inmediato (Línea de emergencia, etc.).";
        claseColor = "urgente";
    } else if (puntuacionTotal >= 16) { 
        mensaje = "🟠 ¡REACCIONA! LA VIOLENCIA ESCALA <br><br> La situación es peligrosa. Busca una red de apoyo confiable y establece límites claros AHORA.";
        claseColor = "reacciona";
    } else if (puntuacionTotal >= 1 && puntuacionTotal <= 15){ 
        mensaje = "🟡 ALERTA IDENTIFICA LAS SEÑALES <br><br> ¡Cuidado! Estás en las primeras etapas de violencia. Infórmate sobre el tema y platica con alguien de confianza.";
        claseColor = "alerta";
    } else{ // Puntuación 0
        mensaje = "🟣 CONCIENTIZACIÓN <br><br> Este test es una herramienta educativa, pero recuerda: si experimentas incomodidad o miedo, busca orientación profesional.";
        claseColor = "nop";
    }

    // Establece el contenido de texto (el botón de Reinicio ya existe en el HTML)
    resultadoContainer.innerHTML = `<h3></h3><p>${mensaje}</p>`;
    resultadoContainer.classList.add(claseColor);
    
    // Muestra el contenedor y el botón estático
    resultadoContainer.style.display = 'block';
    btnReiniciar.style.display = 'block';

}

// --- Event Listeners ---
btnIniciar.addEventListener('click', iniciarJuego); 
btnSi.addEventListener('click', () => manejarRespuesta(true));
btnNo.addEventListener('click', () => manejarRespuesta(false));
btnReiniciar.addEventListener('click', reiniciarJuego);

