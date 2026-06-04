// CONTROL DE LOS GUERREROS NEÓN
const pato = document.getElementById('patito-guia');
const zorro = document.getElementById('enemigo-zorro');
const bPato = document.getElementById('bocadillo-pato');
const bZorro = document.getElementById('bocadillo-zorro');

let posicionPato = { x: 100, y: 200 };
let posicionZorro = { x: 800, y: 250 };

// INICIALIZACIÓN
setTimeout(() => {
    pato.style.opacity = "1";
    zorro.style.opacity = "1";
    bucleCombateRealista();
}, 1500);

function bucleCombateRealista() {
    const tarjetas = document.querySelectorAll('.plato-card');
    if (tarjetas.length === 0) return;
    
    // Seleccionar plato para la disputa
    const tarjetaObjetivo = tarjetas[Math.floor(Math.random() * tarjetas.length)];
    const coordenadas = tarjetaObjetivo.getBoundingClientRect();
    
    // 1. EL ZORRO AVANZA CON PASO CORRIENDO (Las patas se mueven)
    setTimeout(() => {
        zorro.classList.remove('zorro-retirada');
        zorro.classList.add('zorro-corriendo');
        posicionZorro.x = coordenadas.left + window.scrollX + 70;
        posicionZorro.y = coordenadas.top + window.scrollY - 20;
        actualizarPosiciones();
        
        bZorro.innerText = "¡Ladronzuelo al ataque! 🦊";
        bZorro.classList.add('mostrar-dialogo');
    }, 500);

    // 2. EL PATO DETECTA AL ENEMIGO Y CORRE (Patas a toda velocidad)
    setTimeout(() => {
        pato.classList.add('pato-corriendo');
        posicionPato.x = coordenadas.left + window.scrollX - 60;
        posicionPato.y = coordenadas.top + window.scrollY - 30;
        actualizarPosiciones();
        
        bPato.innerText = "¡Saca tus garras de ahí! ⚔️";
        bPato.classList.add('mostrar-dialogo');
    }, 1200);

    // 3. MOMENTO DE IMPACTO REAL
    setTimeout(() => {
        zorro.classList.remove('zorro-corriendo');
        pato.classList.remove('pato-corriendo');
        
        pato.classList.add('pato-atacando');
        zorro.classList.add('recibir-golpe');
        tarjetaObjetivo.classList.add('recibir-golpe');
        
        bPato.innerText = "¡FUEEERA! ⚡";
        bZorro.innerText = "¡AUUUU! 💥";
    }, 2200);

    // 4. EL ZORRO RETROCEDE DERROTADO Y EL PATO COME
    setTimeout(() => {
        pato.classList.remove('pato-atacando');
        zorro.classList.remove('recibir-golpe');
        tarjetaObjetivo.classList.remove('recibir-golpe');
        
        // El zorro huye dándose la vuelta
        zorro.classList.add('zorro-retirada');
        posicionZorro.x += 160; 
        actualizarPosiciones();
        bZorro.innerText = "¡Volveré! 🏃‍♂️💨";
        
        // ¡EL PATO SE AGACHA Y EMPIEZA A COMER DEL PLATO!
        pato.classList.add('pato-comiendo');
        bPato.innerText = "¡Mmm, delicioso! 😋🍗";
    }, 3000);

    // 5. TERMINA DE COMER Y SE LIMPIA TODO PARA LA PRÓXIMA RONDA
    setTimeout(() => {
        pato.classList.remove('pato-comiendo');
        bPato.classList.remove('mostrar-dialogo');
        bZorro.classList.remove('mostrar-dialogo');
    }, 5500);

    // Ciclo de reinicio cada 8.5 segundos
    setTimeout(bucleCombateRealista, 8500);
}

function actualizarPosiciones() {
    pato.style.left = `${posicionPato.x}px`;
    pato.style.top = `${posicionPato.y}px`;
    zorro.style.left = `${posicionZorro.x}px`;
    zorro.style.top = `${posicionZorro.y}px`;
}

// COMPORTAMIENTO DEL CARRITO CON WHATSAPP
function add(nombrePlato) {
    const lista = document.getElementById('lista');
    const li = document.createElement('li');
    li.className = "carrito-item";
    li.innerHTML = `<span><span class="item-qty">1x</span> ${nombrePlato}</span>`;
    lista.appendChild(li);
    
    bPato.innerText = "¡Marchando un pedido! 👨‍🍳";
    bPato.classList.add('mostrar-dialogo');
    setTimeout(() => bPato.classList.remove('mostrar-dialogo'), 2000);
}

function enviarPedido() {
    const nombre = document.getElementById('nombre-cliente').value;
    const direccion = document.getElementById('direccion-envio').value;
    
    if(!nombre || !direccion) {
        alert("Por favor, ingresa tu nombre y dirección de envío.");
        return;
    }
    alert(`¡Perfecto ${nombre}! Tu pedido se está enviando a WhatsApp.`);
}
