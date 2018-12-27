const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

let io = socketIO(server)
require('./sockets')(io)

server.listen(port, (err) => {
    if (err) throw new Error(err)
    console.log(`Servidor corriendo en puerto ${ port }`)
})