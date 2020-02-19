module.exports = function (Blockly) {
  Blockly.GogoCode['action_led'] = function () {
    var dropdownOnoff = this.getFieldValue('onoff')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c290">led' + dropdownOnoff + '</span>\n'
    return code
  }

  return Blockly
}

