import Noty from 'noty'

export default {
  info (msg) {
    // if (!state.noti) return
    // state.noti.show(msg, {position: 'bottom-right'})
    new Noty({
      type: 'info',
      layout: 'bottomRight',
      timeout: 3000,
      text:
        '<i class="fa fa-inverse fa-2x fa-info-circle"></i>&nbsp;&nbsp;&nbsp;' +
        msg
    }).show()
  },

  warning (msg) {
    // if (!state.noti) return
    new Noty({
      type: 'warning',
      layout: 'bottomRight',
      timeout: 3000,
      text:
        '<i class="fa fa-inverse fa-2x fa-exclamation-circle"></i>&nbsp;&nbsp;&nbsp;' +
        msg
    }).show()
    // state.noti.show(msg, {icon: 'exclamation', position: 'bottom-right'})
  },

  success (msg) {
    // if (!state.noti) return
    // state.noti.show(msg, {icon: 'check', position: 'bottom-right'})
    // if (!state.noti) return
    new Noty({
      type: 'success',
      layout: 'bottomRight',
      timeout: 2500,
      progressBar: false,
      text: '<i class="fa fa-2x fa-check-circle"></i>&nbsp;&nbsp;&nbsp;' + msg
    }).show()
  }
}
