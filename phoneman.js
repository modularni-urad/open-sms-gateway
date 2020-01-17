const _ = require('underscore')
const Queue = require('./queue')

const queue = Queue()
const connected = []
const sentResults = {}

function _getFreeClient () {
  return connected[0]
}

function _trySend (data, resolve) {
  const c = _getFreeClient()
  if (!c) return null
  c.emit('send', JSON.stringify(data))
  sentResults[c] = resolve
  return c
}

exports.sendSMS = function (data) {
  return new Promise((resolve, reject) => {
    const c = _trySend(data, resolve)
    if (!c) {
      queue.push({ data, resolve })
    }
  })
}

exports.onSendResult = function (socket, data) {
  try {
    sentResults[socket](data)
    delete sentResults[socket]
  } catch (err) {
    console.log(err)
  }

  if (queue.size()) {
    const i = queue.pop()
    _trySend(i.data, i.resolve)
  }
}

exports.addClient = function (socket) {
  connected.push(socket)
}

exports.removeClient = function (socket) {
  connected.splice(_.indexOf(socket))
}
