module.exports = function (Blockly) {
  // ****** Change Python to GoGoCode Later ******

  Blockly.GogoCode['show_image'] = function (block) {
    var valueString = Blockly.Python.valueToCode(block, 'string', Blockly.GogoCode.ORDER_ATOMIC)
    var code = 'showimage ' + valueString + '\n'
    code = code.replace(/'/g, '"')
    return code
  }

  Blockly.GogoCode['hide_image'] = function () {
    var code = 'hideimage\n'
    return code
  }

  Blockly.GogoCode['screen_tapped'] = function () {
    var code = 'screentapped?'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}
