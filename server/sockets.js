module.exports = function (io) {
  io.on('connection', (client) => {
    client.on('disconnect', () => {
      console.log('usuario desconectado')
    })    

    client.emit('enviarmensaje', {
      usuario: 'Pedro',
      message: 'Enviando un mensaje desde el servidor'
    })

    client.on('enviarmensaje', function(resp) {
      console.log('resp: ', resp)
      client.broadcast.emit('enviarmensaje', resp)
    })
  })
}