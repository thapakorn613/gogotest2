module.exports = function (Blockly) {
  Blockly.GogoCode['display_text'] = function (block) {
    var textInput = block.getFieldValue('text')
    var code = `<span class="c230">show "${textInput} "</span>\n`
    return code
  }

  Blockly.GogoCode['display_number'] = function (block) {
    var valueValue = Blockly.GogoCode.valueToCode(block, 'value',
        Blockly.GogoCode.ORDER_NONE)
    var code = `<span class="c230">show ${valueValue}</span>\n`
    return code
  }

  Blockly.GogoCode['display_movecursor'] = function (block) {
    var textNum = block.getFieldValue('num')
    textNum = isNaN(textNum) ? 0 : textNum % 32
    var code = '<span class="c230">setpos ' + textNum + '</span>\n'
    return code
  }

  Blockly.GogoCode['display_clearscreen'] = function (block) {
    var code = '<span class="c230">cls</span>\n'
    return code
  }

  return Blockly
}
