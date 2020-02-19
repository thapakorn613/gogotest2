module.exports = function (Blockly) {
  Blockly.Color.PI_CLOUD_SERVICE = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_CLOUD_SERVICE = Blockly.Color.PI_CLOUD_SERVICE

  Blockly.Msg.ICON_PI_CLOUD_SERVICE = ''
  Blockly.Msg.ICON_PI_TELEGRAM = ''

  // Blockly.Blocks['ifttt_trigger'] = {
  //   init: function () {
  //     this.setColour(330)

  //     this.appendValueInput('topic')
  //         .appendField('Send IFTTT event ')
  //     this.appendValueInput('message')
  //         .appendField(' with text / value')
  //     this.setInputsInline(true)
  //     this.setPreviousStatement(true)
  //     this.setNextStatement(true)
  //     this.setTooltip('')
  //   }
  // }

  Blockly.Blocks['ifttt_trigger'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_CLOUD_SERVICE)
          .appendField(Blockly.Msg.PI_CLOUD_SEND_IFTTT_EVENT)
          .appendField(new Blockly.FieldTextInput('name'), 'topic')
          .appendField(Blockly.Msg.PI_CLOUD_WITH_VALUE)
      this.appendValueInput('message')
          .setCheck(['Boolean', 'Number', 'String'])
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.PI_CLOUD_SERVICE)
      this.setTooltip('')
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['telegram_message'] = {
    helpUrl: '',
    init: function () {
      this.setColour(Blockly.Color.PI_CLOUD_SERVICE)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_TELEGRAM)
          .appendField(Blockly.Msg.PI_CLOUD_SEND_TELEGRAM)
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PI_CLOUD_TELEGRAM_MESSAGE, 'message'], [Blockly.Msg.PI_CLOUD_TELEGRAM_IMAGE, 'image']]), 'message_type')
      this.appendValueInput('message')
          .appendField(Blockly.Msg.PI_CLOUD_TELEGRAM_VALUE)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  // Blockly.Blocks['if_telegram_message'] = {
  //   helpUrl: '',
  //   init: function () {
  //     this.setColour(290)
  //     this.appendValueInput('key_value_input')
  //         .appendField('Telegram message is equal to')
  //     this.setInputsInline(true)
  //     this.setOutput(true, Boolean)
  //     this.setTooltip('Reports value of specific key.')
  //   }
  // }

  Blockly.Blocks['if_telegram_message'] = {
    init: function () {
      this.appendValueInput('key_value_input')
          .appendField(Blockly.Msg.ICON_PI_TELEGRAM)
          .setCheck(['Boolean', 'Number', 'String'])
          .appendField(Blockly.Msg.PI_CLOUD_TELEGRAM_MESSAGE_EQUAL)
      this.setInputsInline(false)
      this.setOutput(true, null)
      this.setColour(Blockly.Color.PI_CLOUD_SERVICE)
      this.setTooltip('')
      this.setHelpUrl('')
    }
  }

  return Blockly
}


