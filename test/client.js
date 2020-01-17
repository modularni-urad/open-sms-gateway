const io = require('socket.io-client')

const num = Math.random().toString().slice(2, 11)
const socket = io(`http://localhost:3000/?num=${num}`)

socket.on('send', function (msg) {
  console.log(`incomming: ${msg}`)
  setTimeout(() => {
    socket.emit('send_result', 'ok')
  }, 2000)
})
