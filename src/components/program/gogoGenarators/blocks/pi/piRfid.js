module.exports = function (Blockly) {
  Blockly.GogoCode.userfid = function () {
  // TODO: Assemble Python into code variable.
    var code = '\nimport rfid_sl500\nrfid = rfid_sl500.RFID_Reader()\nrfid.connect("/dev/ttyUSB0")\n'
    return code
  }

  Blockly.GogoCode.read_from_rfid = function () {
  // TODO: Assemble Python into code variable.
    var code = 'rfid.read_String()\n'
  // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode.write_to_rfid = function () {
    // var valueName = Blockly.GogoCode.valueToCode(this, 'NAME', Blockly.GogoCode.ORDER_ATOMIC)
  // TODO: Assemble Python into code variable.
    var code = 'rfid.write_String("string")\n'
    return code
  }

  return Blockly
}
