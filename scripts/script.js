const pantalla = document.getElementById("pantalla");
const iniciarBtn = document.getElementById("iniciarBtn");
const detenerBtn = document.getElementById("detenerBtn");
const vueltaBtn = document.getElementById("vueltaBtn");
const vueltas = document.getElementById("vueltas");

let tiempoInicio = 0;
let tiempoTranscurrido = 0;
let intervalo = null;
let enFuncionamiento = false;
let contadorVueltas = 0;

detenerBtn.disabled = true;
vueltaBtn.disabled = true;

function formatearTiempo(ms) {
    const fecha = new Date(ms);
    const minutos = String(fecha.getUTCMinutes()).padStart(2, '0');
    const segundos = String(fecha.getUTCSeconds()).padStart(2, '0');
    const milisegundos = String(Math.floor(fecha.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutos}:${segundos}:${milisegundos}`;
}

function actualizarPantalla() {
    const tiempoActual = Date.now() - tiempoInicio + tiempoTranscurrido;
    pantalla.textContent = formatearTiempo(tiempoActual);
}

iniciarBtn.addEventListener("click", () => {
    if (iniciarBtn.textContent === "Reiniciar") {
        pantalla.textContent = "00:00:00";
        vueltas.innerHTML = "";
        contadorVueltas = 0;
        tiempoTranscurrido = 0;
        iniciarBtn.textContent = "Iniciar";
        detenerBtn.textContent = "Detener";
        iniciarBtn.style.backgroundColor = "rgb(144, 238, 144)";
        detenerBtn.style.backgroundColor = "rgb(203, 66, 66)";
        vueltaBtn.disabled = true;
        detenerBtn.disabled = true; 
        return;
    }

    if (!enFuncionamiento) {
        enFuncionamiento = true;
        tiempoInicio = Date.now();
        intervalo = setInterval(actualizarPantalla, 10);
        vueltaBtn.disabled = false;
        iniciarBtn.disabled = true; 
        detenerBtn.disabled = false;
    }
});

detenerBtn.addEventListener("click", () => {
    if (enFuncionamiento) {
        clearInterval(intervalo);
        tiempoTranscurrido += Date.now() - tiempoInicio;
        enFuncionamiento = false;
        detenerBtn.textContent = "Reanudar";
        iniciarBtn.textContent = "Reiniciar";
        iniciarBtn.style.backgroundColor = "rgb(121, 161, 221)";
        detenerBtn.style.backgroundColor = "rgb(144, 238, 144)";
        vueltaBtn.disabled = true;
        iniciarBtn.disabled = false; 
    } else {
        enFuncionamiento = true;
        tiempoInicio = Date.now();
        intervalo = setInterval(actualizarPantalla, 10);
        detenerBtn.textContent = "Detener";
        iniciarBtn.textContent = "Iniciar";
        iniciarBtn.style.backgroundColor = "rgb(144, 238, 144)";
        detenerBtn.style.backgroundColor = "rgb(203, 66, 66)";
        vueltaBtn.disabled = false;
        iniciarBtn.disabled = true;
    }
});

vueltaBtn.addEventListener("click", () => {
    if (enFuncionamiento) {
        contadorVueltas++;
        const li = document.createElement("li");
        li.textContent = `Vuelta No. ${contadorVueltas} - ${pantalla.textContent}`;
        vueltas.insertBefore(li, vueltas.firstChild);
    }
});
