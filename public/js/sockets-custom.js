var socket = io();
socket.on('connect', function() {
  console.log('conectado')
});

socket.on('disconnect', function() {
  console.log('perdimos la conexion con el servidor')
})

socket.on('enviarmensaje', (mensaje) => {
  console.log('Servidor: ', mensaje)
})
