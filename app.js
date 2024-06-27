// Declaración de variables a usar en el proyecto.
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;

// Función para asignar un texto a los diferentes elementos de nuestro HTML.
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Función para verificar si el número que el usuario ingresó es el número secreto o no.
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // El usuario adivinó el número secreto:
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        // El usuario no adivinó el número secreto. Se darán pistas: si el número secreto es mayor o menor.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

// Función para dejar vacío el input donde se ingresa el número del usuario. 
// Esto para evitar borrar manualmente cada vez que se escriba un número y fallemos adivinándolo.
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar un número secreto entre 1 y el número máximo, en este caso 10.
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // Mostrar por consola la lista y el número generado.
    console.log(listaNumerosSorteados);
    console.log(numeroGenerado);

    // Si ya aparecieron todos los números aleatorios posibles, se indica un respectivo mensaje.
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    } else {
        // Si aún no está llena la lista, se verifica si el numero generado está dentro de esa lista.
        // Si el número generado está en la lista, se llama de nuevo la función para que retorne un nuevo número.
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            // Si el número generado no está en la lista, se lo agrega y retorna.
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Función para establecer un juego desde cero, resetear sus intentos y poner los textos del HTML.
function condicionesIniciales() {
    // Mensaje para el título del juego.
    asignarTextoElemento('h1', 'Juego del número secreto!');
    // Mensaje para indicar el intervalo de números.
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    // Generar un nuevo número secreto.
    numeroSecreto = generarNumeroSecreto();
    // Reestablecemos los intentos
    intentos = 1;
}

// Función para iniciar un nuevo juego cada vez que adivinemos, haciendo uso de la función condicionesIniciales().
function reiniciarJuego() {
    // Dejamos vacío el input para que el usuario ingrese su número.
    limpiarCaja();
    condicionesIniciales();
    // Deshabilitamos el botón de 'nuevo juego' cuando esté en desarrollo la adivinanza.
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    // Habilitamos el botón de 'intentar'
    document.querySelector('#intentar').removeAttribute('disabled');
}

condicionesIniciales();