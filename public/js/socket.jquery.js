var params = new URLSearchParams(window.location.search);

// variables de trabajo
var sala   = params.get('sala');
var formEnviar = $('#formEnviar');
var nombre = params.get('nombre');
var txtMensaje = $('#txtMensaje');
var divUsuarios = $('#divUsuarios');
var divChatbox = $('#divChatbox');

function scrollBottom() {
  // selectors
  var newMessage = divChatbox.children('li:last-child');
  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;
  if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) || (divChatbox.scrollTop() === scrollTop)) {
    $(divChatbox).animate({
      scrollTop: scrollHeight
    }, 'slow');
  }
}

function renderMensaje (data, yo) {
  var html = '';
  var fecha = new Date(data.fecha);
  var fechaMensaje = fecha.getHours() + ':' + fecha.getMinutes();

  if(yo){
    html += '<li class="reverse animated fadeIn"">';
    html += '    <div class="chat-content">';
    html += '        <h5>'+ data.nombre +'</h5>';
    html += '        <div class="box bg-light-inverse">'+ data.mensaje +'</div>';
    html += '    </div>';
    html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html += '    <div class="chat-time">' + fechaMensaje +'</div>';
    html += '</li> ';
  }else{
    html += '<li class="animated fadeIn">';
    html += '  <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '  <div class="chat-content">';
    html += '      <h5>'+ data.nombre +'</h5>';
    html += '      <div class="box bg-light-info">'+ data.mensaje +'</div>';
    html += '  </div>';
    html += '  <div class="chat-time">' + fechaMensaje +'</div>';
    html += '</li>';
  }

  divChatbox.append(html);
}

function renderMensajeEndHome (data) {
  var html = '<li>';  

  html += '  <div class="chat-content">';
  html += '      <h5>'+ data.nombre +'</h5>';
  html += '      <div class="box bg-light-danger">' + data.mensaje + '</div>';
  html += '  </div>';
  html += '</li>';
  divChatbox.append(html);
}

function renderUsuario (data) {
  var html = '';
  html += '<li>';
  html +=   '<a href="javascript:void(0)" class="active"> Chat de <span>'+ params.get('sala') +' </span></a>';
  html += '</li>';

  for(var i = 0; i < data.length; i++){
    html += '<li>';
    html +=   '<a data-id='+ data[0].id +' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ data[i].nombre +'<small class="text-success">online</small></span></a>';
    html += '</li>';
  }
  divUsuarios.html(html);
}

// Listeners

divUsuarios.on('click', 'a', function () {
  let id = $(this).data('id');
});

formEnviar.on('submit', function (e) {
  e.preventDefault();
  let value = txtMensaje.val().trim();
  if(!value){
    return;
  }

  socket.emit('crearMensaje', { nombre: nombre, mensaje: txtMensaje.val() }, function (mensaje) {
    renderMensaje(mensaje, true);
    txtMensaje.val('').focus();
    scrollBottom();
  });
});