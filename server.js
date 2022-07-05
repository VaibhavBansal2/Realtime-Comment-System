const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static('public'))

const dbConnect = require('./db')()

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`ID : ${socket.id}`)
    socket.on('comment', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })
    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name)
    })
})