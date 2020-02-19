module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PI_GOGO_COM = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_GOGO_COM = Blockly.Color.PI_GOGO_COM

  Blockly.Msg.ICON_PI_GOGO_COM = ''

  Blockly.Blocks['key_value'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_GOGO_COM)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_GOGO_COM)
          .appendField(Blockly.Msg.PI_GOGO_KEY)
          .appendField(new Blockly.FieldDropdown([['button', 'button'], ['slider', 'slider'], ['switch', 'switch'], ['facename', 'facename'], ['speech', 'speech']]), 'key_name')
      this.appendValueInput('key_value_input')
          .appendField(Blockly.Msg.PI_GOGO_EQUAL_TO)


      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setTooltip(Blockly.Msg.PI_GOGO_KEY_TOOLTIP)
    }
  }


  Blockly.Blocks['key_value_unrestricted'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_GOGO_COM)

      this.appendValueInput('key_name')
          .appendField(Blockly.Msg.ICON_PI_GOGO_COM)
          .appendField(Blockly.Msg.PI_GOGO_KEY)
      this.appendValueInput('key_value_input')
          .appendField(Blockly.Msg.PI_GOGO_EQUAL_TO)

      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setTooltip(Blockly.Msg.PI_GOGO_KEY_TOOLTIP)
    }
  }

  Blockly.Blocks['get_int_value_of_key'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_GOGO_COM)
      this.appendValueInput('key_name')
        .appendField(Blockly.Msg.ICON_PI_GOGO_COM)
        .appendField(Blockly.Msg.PI_GOGO_NUM_VAL_OF_KEY)

      //    .appendField(new Blockly.FieldDropdown([["Button", "button"], ["Slider", "slider"], ["Switch", "switch"], ["Face Name", "facename"], ["Speech", "speech"]]), "key_name");
      // this.appendValueInput("key_value_input")
      //     .appendField("is equal to ");


      this.setInputsInline(true)
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.I_GOGO_NUM_OF_KEY_TOOLTIP)
    }
  }

  Blockly.Blocks['send_string_message'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_GOGO_COM)

      this.appendValueInput('message')
          .appendField(Blockly.Msg.ICON_PI_GOGO_COM)
          .appendField(Blockly.Msg.PI_GOGO_SUBMIT_TEXT)
      this.appendValueInput('topic')
          .appendField(Blockly.Msg.PI_GOGO_TO_TOPIC)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }


  Blockly.Blocks['send_number_message'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_GOGO_COM)

      this.appendValueInput('message', Number)
          .appendField(Blockly.Msg.ICON_PI_GOGO_COM)
          .appendField(Blockly.Msg.PI_GOGO_SUBMIT_NUMBER)
      this.appendValueInput('topic')
          .appendField(Blockly.Msg.PI_GOGO_TO_TOPIC)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }



  return Blockly
}
