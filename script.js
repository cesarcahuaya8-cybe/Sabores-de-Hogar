// VARIABLES DE CONTROL DE LOS GUERREROS
const pato = document.getElementById('patito-guia');
const zorro = document.getElementById('enemigo-zorro');
const bPato = document.getElementById('bocadillo-pato');
const bZorro = document.getElementById('bocadillo-zorro');

let posicionPato = { x: 100, y: 200 };
let posicionZorro = { x: 800, y: 250 };

// ACTIVAR EN PANTALLA
setTimeout(() => {
    pato.style.opacity = "1";
    zorro.style.opacity = "1";
    combateMilitarLoop();
}, 1500);

// SISTEMA DE IA DE COMBATE EN TIEMPO REAL
function combateMilitarLoop() {
    // Buscar una tarjeta de comida al azar para disputarla
    const tarjetas = document.querySelectorAll('.plato-card');
    if (tarjetas.length === 0) return;
    
    const tarjetaObjetivo = tarjetas[Math.floor(Math.random() * tarjetas.length)];
    const coordenadas = tarjetaObjetivo.getBoundingClientRect();
    
    // El Zorro avanza sigilosamente a atacar el plato
    setTimeout(() => {
        zorro.classList.add('zorro-acechando');
        posicionZorro.x = coordenadas.left + window.scrollX + 60;
        posicionZorro.y = coordenadas.top + window.scrollY - 30;
        actualizarPosiciones();
        
        bZorro.innerText = "¡Me llevaré este plato! 😈";
        bZorro.classList.add('mostrar-dialogo');
    }, 1000);

    // El Pato detecta la amenaza y corre a interceptarlo velozmente
    setTimeout(() => {
        pato.classList.add('pato-corriendo');
        posicionPato.x = coordenadas.left + window.scrollX - 70;
        posicionPato.y = coordenadas.top + window.scrollY - 40;
        actualizarPosiciones();
        
        bPato.innerText = "¡Defenderé el menú! ⚔️";
        bPato.classList.add('mostrar-dialogo');
    }, 1800);

    // MOMENTO DEL IMPACTO REAL (EL CHOQUE)
    setTimeout(() => {
        pato.classList.remove('pato-corriendo');
        pato.classList.add('pato-atacando');
        
        // El plato tiembla y sufre daño por la batalla
        tarjetaObjetivo.classList.add('recibir-golpe');
        zorro.classList.add('recibir-golpe');
        
        bZorro.innerText = "¡AUUCH! 💥";
        bPato.innerText = "¡TOMA ESTO! ⚡";
        
        setTimeout(() => {
            pato.classList.remove('pato-atacando');
            tarjetaObjetivo.classList.remove('recibir-golpe');
            zorro.classList.remove('recibir-golpe');
            bZorro.classList.remove('mostrar-dialogo');
            bPato.classList.remove('mostrar-dialogo');
        }, 800);
        
    }, 2800);

    // El bucle se repite buscando otro sector del menú cada 7 segundos
    setTimeout(combateMilitarLoop, 7000);
}

function actualizarPosiciones() {
    pato.style.left = `${posicionPato.x}px`;
    pato.style.top = `${posicionPato.y}px`;
    zorro.style.left = `${posicionZorro.x}px`;
    zorro.style.top = `${posicionZorro.y}px`;
}

// LOGICA MINI DEL CARRITO PARA QUE SIGA FUNCIONANDO
function add(nombrePlato) {
    const lista = document.getElementById('lista');
    const li = document.createElement('li');
    li.className = "carrito-item";
    li.innerHTML = `<span><span class="item-qty">1x</span> ${nombrePlato}</span>`;
    lista.appendChild(li);
    
    // Interrupción del Pato al comprar
    bPato.innerText = "¡Excelente elección! 👨‍🍳";
    bPato.classList.add('mostrar-dialogo');
    setTimeout(() => bPato.classList.remove('mostrar-dialogo'), 2000);
}

function enviarPedido() {
    alert("Pedido enviado a WhatsApp. ¡Gracias!");
}
