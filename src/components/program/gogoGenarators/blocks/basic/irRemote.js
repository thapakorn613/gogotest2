module.exports = function (Blockly) {
  Blockly.GogoCode['input__output__storage_new_ir'] = function () {
        // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c250">newir?</span>'
        // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['input__output__storage_get_ir'] = function () {
        // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c250">ir</span> '
        // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}

