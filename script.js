let pedido = [];

function add(item) {
    pedido.push(item);
    mostrar();
}

function eliminar(nombrePlato) {
    const index = pedido.lastIndexOf(nombrePlato);
    if (index !== -1) {
        pedido.splice(index, 1);
    }
    mostrar();
}

function mostrar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let conteo = {};
    pedido.forEach(plato => conteo[plato] = (conteo[plato] || 0) + 1);

    for (let plato in conteo) {
        const li = document.createElement("li");
        li.className = "carrito-item";
        li.innerHTML = `
            <div>
                <span class="item-qty">${conteo[plato]}x</span>
                <span class="item-text">${plato}</span>
            </div>
            <button class="btn-eliminar" onclick="eliminar('${plato}')">×</button>
        `;
        lista.appendChild(li);
    }
}

/* FUNCIÓN DE ENVÍO CON UBICACIÓN Y QR DINÁMICO */
function enviarPedido() {
    if (pedido.length === 0) {
        alert("¡Tu carrito está vacío! Añade deliciosos platos primero.");
        return;
    }

    let direccion = document.getElementById("direccion-envio").value.trim();
    if (!direccion) {
        alert("Por favor, ingresa tu dirección de domicilio para realizar el envío.");
        document.getElementById("direccion-envio").focus();
        return;
    }

    const qrSeccion = document.getElementById("seccion-qr-pago");
    qrSeccion.style.display = "block";

    let nota = document.getElementById("nota").value.trim();
    
    let texto = "*¡Hola! Sabores de Hogar, deseo realizar un pedido a domicilio:* 🛵🏡\n\n";
    texto += `📍 *Dirección de Entrega:* ${direccion}\n\n`;
    texto += "📝 *Detalle de la Orden:*\n";

    let conteo = {};
    pedido.forEach(plato => conteo[plato] = (conteo[plato] || 0) + 1);
    for (let plato in conteo) {
        texto += `• *${conteo[plato]}x* ${plato}\n`;
    }
    
    if (nota) texto += `\n🔍 *Notas:* ${nota}`;
    texto += "\n\n💳 _Procederé a escanear el QR para adjuntar el comprobante de pago._";

    setTimeout(() => {
        window.open("https://wa.me/59176527078?text=" + encodeURIComponent(texto));
    }, 1500);
}

/* =========================================================
   LÓGICA DE MOVIMIENTO E INTERACCIÓN DEL PATITO
   ========================================================= */
window.addEventListener('DOMContentLoaded', () => {
    const pato = document.getElementById('patito-guia');
    const bocadillo = document.getElementById('bocadillo-pato');
    
    const frasesDeCamino = [
        "¿Cómo estás? 😊",
        "¿Ya comiste? 👀",
        "¿Creo que te había visto antes? 🤔",
        "¡Qué lindo verte por aquí! ✨",
        "¿Qué se te antoja hoy? 👨‍🍳",
        "¿Tienes mucha hambre? 🦆",
        "¡Mira lo que encontré! 🚀"
    ];

    const frasesComiendo = [
        "¡ÑAM, ÑAM! 😋",
        "*Crunsh, crunsh* 🥖",
        "¡Está riquísimo! 🤤",
        "¡CHOMP, CHOMP! 🐷",
        "¡Uff, de locos! 🔥"
    ];

    const frasesSatisfecho = [
        "¡SÚPER RECOMENDADO! 👍",
        "¡1000/10 DE DELICIA! ⭐",
        "¡Joyita de plato! 💎",
        "¡Pídete este ya! 🛒",
        "¡Santo cielo, qué rico! 😭"
    ];

    function moverPatitoAUnPlato() {
        const platos = document.querySelectorAll('.plato-card');
        if (platos.length === 0) return;

        bocadillo.classList.remove('mostrar-dialogo');
        
        setTimeout(() => {
            platos.forEach(p => p.classList.remove('pato-target'));
            pato.classList.remove('comiendo', 'satisfecho');
            pato.classList.add('caminando');

            const platoAlAzar = platos[Math.floor(Math.random() * platos.length)];
            const rectPlato = platoAlAzar.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            pato.style.opacity = "1";
            pato.style.left = `${rectPlato.left + scrollX - 105}px`;
            pato.style.top = `${rectPlato.top + scrollY + (rectPlato.height / 8)}px`;

            bocadillo.innerText = frasesDeCamino[Math.floor(Math.random() * frasesDeCamino.length)];
            
            setTimeout(() => {
                bocadillo.classList.add('mostrar-dialogo');
            }, 400);

            setTimeout(() => {
                pato.classList.remove('caminando'); 
                platoAlAzar.classList.add('pato-target');
                bocadillo.classList.remove('mostrar-dialogo');

                setTimeout(() => {
                    pato.classList.add('comiendo');
                    bocadillo.innerText = frasesComiendo[Math.floor(Math.random() * frasesComiendo.length)];
                    bocadillo.classList.add('mostrar-dialogo');

                    setTimeout(() => {
                        pato.classList.remove('comiendo');
                        bocadillo.classList.remove('mostrar-dialogo');

                        setTimeout(() => {
                            pato.classList.add('satisfecho');
                            bocadillo.innerText = frasesSatisfecho[Math.floor(Math.random() * frasesSatisfecho.length)];
                            bocadillo.classList.add('mostrar-dialogo');
                        }, 300);

                    }, 4000);

                }, 300);

            }, 1200); 

        }, 300);
    }

    setTimeout(moverPatitoAUnPlato, 1000);
    setInterval(moverPatitoAUnPlato, 12000);
});