
module.exports = function () {
  const _data = []

  return {
    push: function (i) {
      _data.push(i)
    },
    pop: function () {
      const first = _data[0]
      _data.splice(0, 1)
      return first
    },
    size: () => (_data.length)
  }
}
