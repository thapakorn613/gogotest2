const blankWorkspace = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`
const workspaceAndMain = `<xml><block type="procedure_procedure"><title name="pname">start</title></block></xml>`

const filterCode = function (code) {
  var variables = ''
  try {
    variables = code.split('[VAR]')[1].split('[/VAR]')[0] + '\n'
  } catch (error) {
    variables = ''
  }
  var codeArr
  codeArr = code.split('[p]')
  codeArr.shift()
  var proc = []

  codeArr.forEach(function (item) {
      // remove the code that located outside function
    var str = item.split('[/p]')[0]

      // var strTmp = str.split('@@')
      // str = strTmp[0] + (strTmp[2] ? strTmp[2] : '')

      // var varArr0 = strTmp[1] ? strTmp[1].split(',') : []
      // var varArr = []
      // var variables = str.split('[:]')
      // variables.shift()
      // variables.forEach(function (item2) {
      //   varArr.include(item2.split('[;]')[0].split(':')[0])
      // })

      // varArr0.forEach(function (item4) {
      //   varArr.erase(item4)
      // })

      // var newVar = ''
      // varArr.forEach(function (item3) {
      //   newVar += '  <span class="c330">set ' + item3 + ' 0</span>\n'
      // })
    var str2 = str.replace('[SS]', variables).replace(/\[:\]/g, '').replace(/\[;\]/g, '')
    proc.push(str2)
      // proc.push(str)
  })

  code = proc.pop() + '@@'
  code += proc.join('@@')

  codeArr = code.split('\n')
    // codeArr.clean()
    // codeArr = codeArr.filter(function (item, index) {
    //   return (item.trim() !== '')
    // })
  return codeArr.join('\n').replace(/@@/g, '\n\n')
    // return true
}

const cleanCode = function (logoCode) {
  logoCode = logoCode.replace(/ <= /ig, '&lte;')
  logoCode = logoCode.replace(/ < /ig, '&lt;')
  logoCode = logoCode.replace(/ > /ig, '&gt;')
  logoCode = logoCode.replace(/(<([^>]+)>)/ig, '')
  logoCode = logoCode.replace(/&lte;/ig, ' <= ')
  logoCode = logoCode.replace(/&lt;/ig, ' < ')
  logoCode = logoCode.replace(/&gt;/ig, ' > ')
    // logoCode = logoCode.replace(/newline/ig, '\n')
  return logoCode.trim()
}

const filterOutMain = function (xml) {
  for (var index in xml.childNodes) {
    var element = xml.childNodes[index]
    // *********** Remove main procedure *********** //
    if (element.innerHTML && /name="pname">/.test(element.innerHTML)) {
      xml.removeChild(element)
    }
  }
  return xml
}
export default {
  blankWorkspace,
  workspaceAndMain,
  filterCode,
  cleanCode,
  filterOutMain
}
