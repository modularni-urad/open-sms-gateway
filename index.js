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
  const num = socket.handshake.query.num
  // check if the client provides appropriate query
  if (num && num.match(/[0-9]{9}/g)) {
    Phone.addClient(socket)
    console.log('a user connected: ' + num)
  } else {
    console.log('wrong num, disconnected: ' + num)
    socket.disconnect(true)
    return
  }

  socket.on('send_result', (data) => {
    Phone.onSendResult(socket, data)
  })
  socket.on('disconnect', (reason) => {
    const num = socket.handshake.query.num
    Phone.removeClient.bind(num)
    console.log(`${num} disconnected. Reason: ${reason}`)
  })
  socket.on('error', (error) => {
    console.log('error: ' + error)
    Phone.removeClient.bind(socket, error)
  })
})

server.listen(PORT, function () {
  console.info(`Galadriel started on port ${PORT}`)
})
