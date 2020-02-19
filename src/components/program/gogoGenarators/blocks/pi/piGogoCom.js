module.exports = function (Blockly) {
  // ****** Change Blockly.Python to Blockly,GoGoCode Later ******


  Blockly.GogoCode['key_value'] = function (block) {
    var textKeyName = this.getFieldValue('key_name').toLowerCase()
    // var textKeyValueInput = this.getFieldValue('key_value_input');
    var textKeyValueInput = Blockly.Python.valueToCode(block, 'key_value_input', Blockly.GogoCode.ORDER_ATOMIC)
    var code = '<span class="c210">key "' + textKeyName + '" = ' + textKeyValueInput + '</span>'
    code = code.replace(/'/g, '"')
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['key_value_unrestricted'] = function (block) {
    var textKeyName = Blockly.Python.valueToCode(block, 'key_name', Blockly.GogoCode.ORDER_ATOMIC)
    // this.getFieldValue('key_name').toLowerCase();
    // var textKeyValueInput = this.getFieldValue('key_value_input');
    var textKeyValueInput = Blockly.Python.valueToCode(block, 'key_value_input', Blockly.GogoCode.ORDER_ATOMIC)
    var code = '<span class="c210">key ' + textKeyName + ' = ' + textKeyValueInput + '</span>'
    code = code.replace(/'/g, '"')
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['get_int_value_of_key'] = function (block) {
    var textKeyName = Blockly.Python.valueToCode(block, 'key_name', Blockly.GogoCode.ORDER_ATOMIC)
    // this.getFieldValue('key_name').toLowerCase();
    // var textKeyValueInput = this.getFieldValue('key_value_input');
    var code = '<span class="c210">intkey ' + textKeyName + '</span>'
    code = code.replace(/'/g, '"')
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['send_string_message'] = function (block) {
    var message = Blockly.Python.valueToCode(block, 'message', Blockly.GogoCode.ORDER_ATOMIC)
    var topic = Blockly.Python.valueToCode(block, 'topic', Blockly.GogoCode.ORDER_ATOMIC)
    var code = '<span class="c330">sendmessage ' + topic + '  ' + message + '</span>\n'
    code = code.replace(/'/g, '"')
    return code
  }

  Blockly.GogoCode['send_number_message'] = function (block) {
    var message = Blockly.GogoCode.valueToCode(block, 'message', Blockly.GogoCode.ORDER_NONE)
    var topic = Blockly.Python.valueToCode(block, 'topic', Blockly.GogoCode.ORDER_ATOMIC)
    var code = '<span class="c330">sendmessage ' + topic + ' ' + message + '</span>\n'
    code = code.replace(/'/g, '"')
    return code
  }

  return Blockly
}
