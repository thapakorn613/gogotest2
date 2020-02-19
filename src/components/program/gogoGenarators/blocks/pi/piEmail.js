module.exports = function (Blockly) {
  Blockly.GogoCode['send_email'] = function (block) {
    // ****** Change Python to GoGoCode Later ******

    var email = Blockly.Python.valueToCode(block, 'email', Blockly.GogoCode.ORDER_ATOMIC)
    var title = Blockly.Python.valueToCode(block, 'title', Blockly.GogoCode.ORDER_ATOMIC)
    var body = Blockly.Python.valueToCode(block, 'body', Blockly.GogoCode.ORDER_ATOMIC)
    var code = '<span class="c330">sendmail ' + email + ' ' + title + ' ' + body + '</span>\n'
    code = code.replace(/'/g, '"')
    return code
  }

  return Blockly
}
