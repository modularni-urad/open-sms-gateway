const app = require('express')()
const server = require('http').createServer(app)
var io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const Phone = require('./phoneman')

app.post('/', (req, res) => {
  Phone.sendSMS(req.query).then(result => {
    res.send(result)
  })
})

io.on('connection', (socket) => {
  Phone.addClient(socket)
  console.log('a user connected: ' + socket.handshake.query.num)

  socket.on('send_result', (data) => {
    Phone.onSendResult(socket, data)
  })
  socket.on('disconnect', (reason) => {
    Phone.removeClient.bind(socket, reason)
  })
  socket.on('error', (error) => {
    console.log('error: ' + error)
    Phone.removeClient.bind(socket, error)
  })
})

server.listen(PORT, function () {
  console.info(`Galadriel started on port ${PORT}`)
})
