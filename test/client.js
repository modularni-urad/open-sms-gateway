const eio = require('engine.io-client')

const num = Math.random().toString().slice(2, 11)
const socket = eio(`http://localhost:3000/?num=${num}`)

socket.on('open', function () {
  socket.on('message', function (data) {
    console.log(`incomming: ${data}`)
    setTimeout(() => {
      socket.send('ok')
    }, 2000)
  })

  socket.on('close', function () {
    console.log('closing')
  })
})
