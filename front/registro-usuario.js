export async function init () {
    console.log('registro-usuario js cargado');
}

init();

const API_URL_USUARIO = 'http://127.0.0.1:8000';

async function registrarUsuario(event) {
    event.preventDefault();
    console.log('Registrando usuario...');
    const nombre = document.getElementById('nombre').value;
    const contrasena = document.getElementById('contrasena').value;
    const correo= document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    
    const usuario = {
        nombre,contrasena,correo,telefono
    };

    try{
        const response = await fetch(`${API_URL_USUARIO}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(usuario),
    });

    if (!response.ok) throw new Error(`Error ${response.status} en la solicitud`);

    const usuarioCreado = await response.json();
    console.log('Usuario registrado:', usuarioCreado);
    window.location.href = 'cotiza.html';
    } catch (e){
        alert('Error al registrar usuario: ' + e.message);
        document
    }
}
document
  .getElementById("registrar-usario")
  ?.addEventListener("click", registrarUsuario);