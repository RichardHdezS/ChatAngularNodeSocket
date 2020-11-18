'use strict'
//para iniciar el server es con el comando npm run dev
const { Server } = require('http')

const app=require('express')()
const serverHttp=require('http').Server(app)
const io= require('socket.io')(serverHttp)


//arreglo dond e se guardaran todas los mesajes qeu enviemos desde le chat
const myMessage = []

//las funciones on en socket.io nos permiten recivir conexiones
io.on('connection', function(socket)//recivimos una conexion de un usuario que se haya conectado y declaramos una variable llamada socket que nos permite enviar op recivr mensaje del usuario conectado
{
    socket.on('send-message', function(data){//escuchamos cuando el cleinte nos envia un mensaje bajo el evento 'send-message' y tenemos una llamda trayendo el dato del cleinte
        myMessage.push(data)//guardamos el mesaje qyue se haya enviado por el cliente
        socket.emit('text-event', myMessage)//emitimos el mensaje recivido bajo el evento 'text-event', pero unicamnete se emite al que lo haya solcitado, no a todos los que esten conectados
        socket.broadcast.emit('text-event', myMessage)//con socket.broadcast.emit nos permite emitir los mensajes a todos aquelo que esten conectados

    })
})
    
//levantamos ek servidor en el puerto 3000(podemos elejir el que sea) y con un arrow funtion mandamos un mensaje de que esta corriendo el puerto
serverHttp.listen(3000, ()=>{
    console.log(`server running on ${3000}`) 
})