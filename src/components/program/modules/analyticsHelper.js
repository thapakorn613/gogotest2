var Hashes = require('jshashes')
const uuidv4 = require('uuid/v4')

export default {
  hashEmail (string) {
    var SHA256 = new Hashes.SHA256()
    return SHA256.hex(string)
  },
  getBrowserId () {
    if (!window.localStorage) {
      return uuidv4()
    } else if (!window.localStorage.bid) {
      var newUid = uuidv4()
      window.localStorage.setItem('bid', newUid)
      return newUid
    } else {
      return window.localStorage.bid
    }
  }
}
