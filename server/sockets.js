const { Usuarios } = require('./classes/usuarios');
const { crearMensaje } = require('./utilidades/utilidades');

let usuarios = new Usuarios();
module.exports = function (io) {
  io.on('connection', (client) => {
    client.on('entrarChat', function (data, callback) {
      if(!data.nombre || !data.sala){
        return callback({
          err: true,
          message: 'Lo sentimos pero el nombre del usuario y sala es obligatorio'
        });
      }
      client.join(data.sala);

      usuarios.agregarPersona(client.id, data.nombre, data.sala);
      let personasSala = usuarios.getPersonasSala(data.sala);
      client.broadcast.to(data.sala).emit('listaPersona', personasSala);
      client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje(
        'Administrador', `${ data.nombre } se unio al chat`
      ));     
      callback(personasSala);
    });

    client.on('crearMensaje', function (data, callback) {
      let persona = usuarios.getPersona(client.id);
      let crearMensajeVar = crearMensaje(persona.nombre, data.mensaje);
      client.broadcast.to(persona.sala).emit('crearMensaje', crearMensajeVar);
      callback(crearMensajeVar);
    });
    
    client.on('disconnect', function () {
      let personaBorrada = usuarios.borrarPersona(client.id);
      let personasSala   = usuarios.getPersonasSala(personaBorrada.sala);
      client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje(
        'Administrador', `${ personaBorrada.nombre } abadono el chat`
      ));      
      client.broadcast.to(personaBorrada.sala).emit('listaPersona', personasSala);
    });

    client.on('mensajePrivado', function (data) {
      let persona = usuarios.getPersona(client.id);
      client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ));      
    });
  });
};