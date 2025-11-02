export async function init () {
    console.log('solicitar-cotizacion.js cargado');
}

init();

const API_URL_USUARIO = 'http://127.0.0.1:8000';

async function solicitarCotizacion(event) {
    event.preventDefault();
    console.log('Solicitando cotización...');
    
    const carro = document.getElementById('carro').value;
    const motor = document.getElementById('motor').value;
    const ciudad = document.getElementById('ciudad').value;
    const consesionario = document.getElementById('consecionario').value;
    
    const cotizacion = {
        carro: carro,
        motor: motor, 
        ciudad: ciudad,
        consesionario: consesionario
    };

    try{
        const response = await fetch(`${API_URL_USUARIO}/cotizar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(cotizacion),
        });

        if (!response.ok) {
            throw new Error (`Error ${response.status} en la solicitud`);
        }
        
        const cotazizacionCreada = await response.json();
        console.log('Cotización solicitada:', cotazizacionCreada);
        alert ('Cotización solicitada con éxito');
        window.location.href = 'index.html';

    } catch (e){
        alert ('Error al solicitar cotización: ' + e.message);
    }
}

document
  .getElementById("formulario-cotizacion")
  ?.addEventListener("submit", solicitarCotizacion);