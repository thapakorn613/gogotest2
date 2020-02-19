module.exports = function (Blockly) {
  // ****** Change Python to GoGoCode Later ******


  Blockly.GogoCode['send_sms'] = function (block) {
    var message = Blockly.Python.valueToCode(block, 'message', Blockly.GogoCode.ORDER_ATOMIC)
    var number = Blockly.Python.valueToCode(block, 'number', Blockly.GogoCode.ORDER_ATOMIC)
    var code = '<span class="c330">sendsms ' + number + ' ' + message + '</span>\n'
    code = code.replace(/'/g, '"')
    return code
  }
  return Blockly
}
