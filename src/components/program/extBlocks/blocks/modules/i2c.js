module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.I2C = '210'
  Blockly.Msg.COLOR_I2C = Blockly.Color.I2C

  Blockly.Msg.ICON_I2C = ''

  Blockly.Blocks['i2c_write'] = {
    init: function () {
      this.setHelpUrl('')
      this.setColour(Blockly.Color.I2C)
      //    this.appendDummyInput()
      //        .appendField("Write I2C register:");
      //    this.appendValueInput("value")
      //        .appendField("write ");
      //    this.appendValueInput("reg_addr")
      //        .appendField("to ");
      //    this.appendValueInput("i2c_addr")
      //        .appendField(", ");
      //    this.setInputsInline(true);
      this.appendValueInput('value')
        .appendField(Blockly.Msg.ICON_I2C)
        .appendField(Blockly.Msg.MOD_I2C_WRITE_VALUE)
      this.appendValueInput('reg_addr')
        .appendField(Blockly.Msg.MOD_I2C_TO_REGISTER)
      this.appendValueInput('i2c_addr')
        .appendField(Blockly.Msg.MOD_I2C_ON_ADDRESS)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['i2c_read'] = {
    init: function () {
      this.setHelpUrl('')
      this.setColour(Blockly.Color.I2C)
      //    this.appendDummyInput()
      //        .appendField("Read I2C register:")
      //        .appendField("read from ")
      //        .appendField(new Blockly.FieldTextInput("register address"), "reg_addr")
      //        .appendField(", ")
      //        .appendField(new Blockly.FieldTextInput("I2C address"), "i2c_addr");
      //    this.appendValueInput("value")
      //        .appendField("");
      this.appendValueInput('reg_addr')
        .appendField(Blockly.Msg.ICON_I2C)
        .appendField(Blockly.Msg.MOD_I2C_READ_FROM_REGISTER)
      this.appendValueInput('i2c_addr')
        .appendField(Blockly.Msg.MOD_I2C_ON_ADDRESS)
      this.setInputsInline(true)
      this.setOutput(true)
      this.setTooltip('')
    }
  }

  return Blockly
}
