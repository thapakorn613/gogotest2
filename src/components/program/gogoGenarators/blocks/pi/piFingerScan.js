module.exports = function (Blockly) {
  Blockly.GogoCode.use_finer_scan = function () {
    // TODO: Assemble Python into code variable.
    var code = 'import fingerscan\nfp = fingerscan.fingerPrint()\nfp.connect("/dev/ttyACM0")\n'
    return code
  }

  Blockly.GogoCode.identify_finger = function () {
    // TODO: Assemble Python into code variable.
    var code = 'fp.identify()\n'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode.enroll_finger = function () {
    // TODO: Assemble Python into code variable.
    var code = 'fp.enrollOneTime()\n'
    return code
  }


  return Blockly
}
