// const _ = require('underscore')
const Queue = require('./queue')

const queue = Queue()
const connected = {}
const sentResults = {}

function _getFreePhone () {
  for (const i in connected) {
    if (!(i in sentResults)) return i
  }
}

function _trySend (data, resolve) {
  const free = _getFreePhone()
  if (!free) return null
  const socket = connected[free]
  const dataStr = JSON.stringify(data)
  socket.emit('send', dataStr)
  console.log(`${free}: sending ${dataStr}`)
  sentResults[free] = resolve
  return socket
}

exports.sendSMS = function (data) {
  return new Promise((resolve, reject) => {
    const socket = _trySend(data, resolve)
    if (!socket) {
      queue.push({ data, resolve })
    }
  })
}

exports.onSendResult = function (socket, data) {
  try {
    const num = socket.handshake.query.num
    console.log(`${num}: receiving ${data}`)
    sentResults[num](data)
    delete sentResults[num]
  } catch (err) {
    console.log(err)
  }

  if (queue.size()) {
    const i = queue.pop()
    _trySend(i.data, i.resolve)
  }
}

exports.addClient = function (socket) {
  const num = socket.handshake.query.num
  connected[num] = socket
}

exports.removeClient = function (socket) {
  const num = socket.handshake.query.num
  delete connected[num]
}
