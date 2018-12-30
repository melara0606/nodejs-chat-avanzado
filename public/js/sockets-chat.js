var socket = io();
var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
  window.location = 'index.html';
  throw new Error('El nombre del usuario es requerido');
}

socket.on('connect', function() {
  socket.emit('entrarChat', { nombre: params.get('nombre'), sala: params.get('sala') }, function(data) {
    console.log(data);
  });

  socket.on('crearMensaje', function(data) {
    console.log(data);
  });

  socket.on('listaPersona', function (personas) {
    console.log(personas);
  });

  socket.on('mensajePrivado', function (data) {
    console.log(data);
  });
});
