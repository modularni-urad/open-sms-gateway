
const axios = require('axios')

function onRes (res) {
  console.log(`${res.status}: ${res.data}`)
}

let num = Math.random().toString().slice(2, 11)
axios.post(`http://localhost:3000/?num=${num}&mess=Ahoj ${num}, jak se mas?`)
  .then(onRes)

num = Math.random().toString().slice(2, 11)
axios.post(`http://localhost:3000/?num=${num}&mess=Ahoj ${num}, jak se mas?`)
  .then(onRes)

num = Math.random().toString().slice(2, 11)
axios.post(`http://localhost:3000/?num=${num}&mess=Ahoj ${num}, jak se mas?`)
  .then(onRes)
