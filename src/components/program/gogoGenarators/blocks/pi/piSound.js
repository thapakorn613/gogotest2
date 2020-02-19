module.exports = function (Blockly) {
  // ****** Change Python to GoGoCode Later ******

  Blockly.GogoCode['play_sound'] = function (block) {
    var valueString = Blockly.Python.valueToCode(block, 'string', Blockly.GogoCode.ORDER_ATOMIC)
    var code = 'playsound ' + valueString + '\n'
    code = code.replace(/'/g, '"')
    return code
  }

  Blockly.GogoCode['stop_sound'] = function () {
    var code = 'stopsound\n'
    return code
  }

  Blockly.GogoCode['say'] = function (block) {
    var valueString = Blockly.Python.valueToCode(block, 'string', Blockly.GogoCode.ORDER_ATOMIC)
    var code = 'say ' + valueString + '\n'
    code = code.replace(/'/g, '"')
    return code
  }

  return Blockly
}
