module.exports = function (Blockly) {
  Blockly.GogoCode['action_motor'] = function () {
    var checkboxA = this.getFieldValue('a')
    var checkboxB = this.getFieldValue('b')
    var checkboxC = this.getFieldValue('c')
    var checkboxD = this.getFieldValue('d')
    // var value_name = Blockly.GogoCode.valueToCode(this, 'NAME', Blockly.GogoCode.ORDER_ATOMIC);
    // TODO: Assemble GogoCode into code variable.

    var code = '<span class="c316">' + (checkboxA === 'TRUE' ? 'a' : '') +
                                    (checkboxB === 'TRUE' ? 'b' : '') +
                                    (checkboxC === 'TRUE' ? 'c' : '') +
                                    (checkboxD === 'TRUE' ? 'd' : '') +
                                    ',</span>\n'
    if (code === '<span class="c316">,</span>\n') { code = '' }
    return code
  }

  Blockly.GogoCode['motor_action_turn'] = function () {
    var dropdownTurn = this.getFieldValue('turn')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c316">' + dropdownTurn + '</span>\n'
    // TODO: Change ORDER_NONE to the correct strength.
    // return [code, Blockly.GogoCode.ORDER_NONE];
    return code
  }

  Blockly.GogoCode['motor_action_onfor'] = function (block) {
    var valueSecond = Blockly.GogoCode.valueToCode(block, 'value', Blockly.GogoCode.ORDER_NONE)
    // TODO: Assemble GogoCode into code variable.
    // valueSecond *= 10;
    // valueSecond = isNaN(valueSecond) ? 0 : valueSecond;
    var code = '<span class="c316">onfor ' + valueSecond + '</span>\n'
    // TODO: Change ORDER_NONE to the correct strength.
    // return [code, Blockly.GogoCode.ORDER_NONE];
    return code
  }

  Blockly.GogoCode['motor_action_thisway'] = function () {
    // var value_right = Blockly.GogoCode.valueToCode(this, 'right', Blockly.GogoCode.ORDER_ATOMIC);
    var dropdownThisway = this.getFieldValue('clockwise')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c316">' + dropdownThisway + '</span>\n'
    // TODO: Change ORDER_NONE to the correct strength.
    // return [code, Blockly.GogoCode.ORDER_NONE];
    return code
  }

  Blockly.GogoCode['motor_action_rd'] = function () {
    var code = '<span class="c316">rd</span>\n'
    // return [code, Blockly.GogoCode.ORDER_NONE]
    return code
  }

  Blockly.GogoCode['motor_action_power'] = function (block) {
    // var dropdown_power = this.getFieldValue('power');
    var valuePower = Blockly.GogoCode.valueToCode(block, 'power', Blockly.GogoCode.ORDER_NONE)
    // var value_right = Blockly.GogoCode.valueToCode(this, 'right', Blockly.GogoCode.ORDER_ATOMIC);
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c316">setpower ' + valuePower + '</span>\n'
    // TODO: Change ORDER_NONE to the correct strength.
    // return [code, Blockly.GogoCode.ORDER_NONE]
    return code
  }

  Blockly.GogoCode['action_motor_is_on'] = function () {
    var checkboxA = this.getFieldValue('a')
    var checkboxB = this.getFieldValue('b')
    var checkboxC = this.getFieldValue('c')
    var checkboxD = this.getFieldValue('d')
    // var value_name = Blockly.GogoCode.valueToCode(this, 'NAME', Blockly.GogoCode.ORDER_ATOMIC);
    // TODO: Assemble GogoCode into code variable.

    var code = '<span class="c316">' + (checkboxA === 'TRUE' ? 'a' : '') +
                                    (checkboxB === 'TRUE' ? 'b' : '') +
                                    (checkboxC === 'TRUE' ? 'c' : '') +
                                    (checkboxD === 'TRUE' ? 'd' : '') +
                                    'on?</span>'// +value_name.slice(1, value_name.length-1)+'\n';
    if (code === '<span class="c316">on?</span>') { code = '<span class="c316">0</span>' }
    return [code, Blockly.GogoCode.ORDER_NONE]
  }


  Blockly.GogoCode['action_motor_is_cw'] = function () {
    var checkboxA = this.getFieldValue('a')
    var checkboxB = this.getFieldValue('b')
    var checkboxC = this.getFieldValue('c')
    var checkboxD = this.getFieldValue('d')
    // var value_name = Blockly.GogoCode.valueToCode(this, 'NAME', Blockly.GogoCode.ORDER_ATOMIC);
    // TODO: Assemble GogoCode into code variable.

    var code = '<span class="c316">' + (checkboxA === 'TRUE' ? 'a' : '') +
                                    (checkboxB === 'TRUE' ? 'b' : '') +
                                    (checkboxC === 'TRUE' ? 'c' : '') +
                                    (checkboxD === 'TRUE' ? 'd' : '') +
                                    'thisway?</span>'// +value_name.slice(1, value_name.length-1)+'\n';
    if (code === '<span class="c316">thisway?</span>') { code = '<span class="c316">0</span>' }
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}


