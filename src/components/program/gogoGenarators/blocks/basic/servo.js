module.exports = function (Blockly) {
  Blockly.GogoCode['servo_seth'] = function (block) {
    // var text_heading = block.getFieldValue('heading');
    var valueHeading = Blockly.GogoCode.valueToCode(block, 'heading', Blockly.GogoCode.ORDER_NONE)
    var code = `ifelse ( ${valueHeading} < 10 ) [ seth 10 ]  [ ifelse ( ${valueHeading} > 40 ) [ seth 40 ] [ <span class="c316">seth ${valueHeading}</span>  ] ] \n`
    return code
  }

  Blockly.GogoCode['servo_lt'] = function (block) {
    // var text_heading = block.getFieldValue('heading');
    var valueHeading = Blockly.GogoCode.valueToCode(block, 'heading', Blockly.GogoCode.ORDER_NONE)
    var code = `<span class="c316">lt ${valueHeading}</span> \n`
    return code
  }

  Blockly.GogoCode['servo_rt'] = function (block) {
    // var text_heading = block.getFieldValue('heading');
    var valueHeading = Blockly.GogoCode.valueToCode(block, 'heading', Blockly.GogoCode.ORDER_NONE)
    var code = '<span class="c316">rt ' + valueHeading + '</span> \n'
    return code
  }

  return Blockly
}

