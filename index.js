const app = require('express')()
const server = require('http').createServer(app)
const engine = require('engine.io')
const wsserver = engine.attach(server)
const PORT = process.env.PORT || 3000
const Phone = require('./phoneman')

app.post('/', (req, res) => {
  Phone.sendSMS(req.query).then(result => {
    res.send(result)
  })
})

wsserver.on('connection', socket => {
  const num = socket.request._query.num
  // check if the client provides appropriate query
  if (num && num.match(/[0-9]{9}/g)) {
    console.log('a user connected: ' + num)
    Phone.addClient(num, socket)
  } else {
    console.log('wrong num, disconnected: ' + num)
    socket.close(true)
    return
  }

  socket.on('message', (data) => {
    Phone.onSendResult(socket.request._query.num, socket, data)
  })
  socket.on('close', (reason) => {
    const num = socket.request._query.num
    console.log(`${num} disconnected. Reason: ${reason}`)
    Phone.removeClient(num)
  })
  socket.on('error', (error) => {
    console.log('error: ' + error)
    Phone.removeClient(socket.request._query.num)
  })
})

server.listen(PORT, function () {
  console.info(`Galadriel started on port ${PORT}`)
})
