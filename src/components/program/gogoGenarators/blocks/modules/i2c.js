module.exports = function (Blockly) {
  Blockly.GogoCode['i2c_write'] = function (block) {
    var valueValue = Blockly.GogoCode.valueToCode(block, 'value', Blockly.GogoCode.ORDER_NONE)
    var textRegAddr = Blockly.GogoCode.valueToCode(block, 'reg_addr', Blockly.GogoCode.ORDER_NONE)
    var textI2cAddr = Blockly.GogoCode.valueToCode(block, 'i2c_addr', Blockly.GogoCode.ORDER_NONE)
    //  var textRegAddr = block.getFieldValue('reg_addr');
    //  var textI2cAddr = block.getFieldValue('i2c_addr');
    // var code = '<span class="c210">i2cwrite [write: \'' + valueValue + '\', reg_address: ' + textRegAddr + ', i2c_address: ' + textI2cAddr + ']</span>\n'
    var code = `<span class="c210">i2cwrite ${textI2cAddr} ${textRegAddr} ${valueValue}</span>\n`
    return code
  }

  Blockly.GogoCode['i2c_read'] = function (block) {
    //  var textRegAddr = block.getFieldValue('reg_addr');
    //  var textI2cAddr = block.getFieldValue('i2c_addr');
    var textRegAddr = Blockly.GogoCode.valueToCode(block, 'reg_addr', Blockly.GogoCode.ORDER_NONE)
    var textI2cAddr = Blockly.GogoCode.valueToCode(block, 'i2c_addr', Blockly.GogoCode.ORDER_NONE)
    // var code = '<span class="c210">i2cread [reg_address: ' + textRegAddr + ', i2c_address: ' + textI2cAddr + ']</span>\n'
    var code = `<span class="c210">( i2cread ${textI2cAddr} ${textRegAddr} )</span> `
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}
