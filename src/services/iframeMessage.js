
export default {
  sendMessage (data) {
    var iframeEl = document.querySelector('#programming-frame')
    if (iframeEl.contentWindow) {
      // console.info('sending', data)
      iframeEl.contentWindow.postMessage(data, '*')
    }
  },
}
