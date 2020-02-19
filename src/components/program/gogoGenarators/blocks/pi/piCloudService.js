module.exports = function (Blockly) {
  Blockly.GogoCode['ifttt_trigger'] = function (block) {
    var valueMessage = ''
    try {
      valueMessage = Blockly.GogoCode.valueToCode(block, 'message', Blockly.Python.ORDER_NONE)
    } catch (error) {
      // ****** Change Python to GoGoCode Later ******
      valueMessage = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_NONE)
      valueMessage = valueMessage.replace(/'/g, '"')
    }
    // var topic = Blockly.GogoCode.valueToCode(block, 'topic', Blockly.GogoCode.ORDER_ATOMIC)
    var topic = block.getFieldValue('topic')
    // ****** hacking by replace with "" ******
    var code = '<span class="c330">sendmessage "@ifttt,' + topic + '" ' + valueMessage + '</span>\n'
    return code
  }

  Blockly.GogoCode['telegram_message'] = function (block) {
    var valueMessage = ''
    try {
      valueMessage = Blockly.GogoCode.valueToCode(block, 'message', Blockly.Python.ORDER_NONE)
    } catch (error) {
      // ****** Change Python to GoGoCode Later ******
      valueMessage = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_NONE)
      valueMessage = valueMessage.replace(/'/g, '"')
    }

    // var message = this.getFieldValue('message')
    var messageType = this.getFieldValue('message_type').toLowerCase()


    var code = '<span class="c330">sendmessage "@telegram,' + messageType + '" ' + valueMessage + '</span>\n'
    return code
  }

  // Blockly.GogoCode['if_telegram_message'] = function (block) {
  //   var textKeyValueInput = Blockly.GogoCode.valueToCode(block, 'key_value_input', Blockly.GogoCode.ORDER_ATOMIC)
  //   var code = '<span class="c210">key "telegram" = ' + textKeyValueInput + '</span>'
  //   return [code, Blockly.GogoCode.ORDER_NONE]
  // }

  Blockly.GogoCode['if_telegram_message'] = function (block) {
    var textKeyValueInput = Blockly.Python.valueToCode(block, 'key_value_input', Blockly.GogoCode.ORDER_ATOMIC).replace(/'/g, '"')
    var code = '<span class="c210">key "telegram" = ' + textKeyValueInput + '</span>'

    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}
