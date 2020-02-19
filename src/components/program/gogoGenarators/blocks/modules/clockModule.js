module.exports = function (Blockly) {
  Blockly.GogoCode['clock_date'] = function (block) {
    var dropdownDate = block.getFieldValue('date')
        // TODO: Assemble JavaScript into code variable.
        // console.log(dropdownDate)
    var date
    switch (parseInt(dropdownDate)) {
      case 0: date = 'seconds'; break
      case 1: date = 'minutes'; break
      case 2: date = 'hours'; break
      case 3: date = 'dow'; break
      case 4: date = 'day'; break
      case 5: date = 'month'; break
      case 6: date = 'year'; break
    }

    var code = '<span class="c230">' + date + '</span>'
        // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}

