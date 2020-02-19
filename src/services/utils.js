const userAgent = window.navigator.userAgent
const platform = window.navigator.platform
const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
const iosPlatforms = ['iPhone', 'iPad', 'iPod']
const type = {
  WINDOWS: 'windows',
  MAC: 'mac',
  IOS: 'ios',
  ANDROID: 'android',
  LINUX: 'linux'
}
export default {
  hex2rgb (hex, opacity) {
    hex = (hex + '').trim()

    let rgb = null
    let match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/)

    if (!match) {
      return null
    }

    rgb = {}

    hex = match[1]

    if (hex.length === 6) {
      rgb.r = parseInt(hex.substring(0, 2), 16)
      rgb.g = parseInt(hex.substring(2, 4), 16)
      rgb.b = parseInt(hex.substring(4, 6), 16)
    } else if (hex.length === 3) {
      rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16)
      rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16)
      rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16)
    }

    rgb.css = 'rgb' + (opacity ? 'a' : '') + '('
    rgb.css += rgb.r + ',' + rgb.g + ',' + rgb.b
    rgb.css += (opacity ? ',' + opacity : '') + ')'

    return rgb
  },

  findInNestedByName (array, name) {
    if (typeof array !== 'undefined') {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) return [{ ...array[i] }]
        let a = this.findInNestedByName(array[i].children, name)
        if (a != null) {
          a.unshift({ ...array[i] })
          return [...a]
        }
      }
    }
    return null
  },
  type,
  getOS () {
    var os = null

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = type.MAC
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = type.IOS
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = type.WINDOWS
    } else if (/Android/.test(userAgent)) {
      os = type.ANDROID
    } else if (!os && /Linux/.test(platform)) {
      os = type.ANDROID
    }

    return os
  },
  changeURL (data) {
    if (data === '') {
      window.history.pushState('gogo', 'GoGo Board', '/#/app/program')
    } else {
      window.history.pushState('gogo', 'GoGo Board', '/#/app/program/' + data)
    }
  },
  updateIframeSize (isFull) {
    let navbarHeight = document.querySelector('.vuestic-navbar').offsetHeight
    if (document.querySelector('#programming-frame')) {
      document.querySelector('#programming-frame').height = window.innerHeight - navbarHeight - 7
      document.querySelector('#programming-frame').width = window.innerWidth - (isFull ? 0 : 360)
    }

    if (document.querySelector('.scroll-wrapper')) {
      document.querySelector('.scroll-wrapper').style.height = (window.innerHeight - navbarHeight - 3).toString() + 'px'
      // document.querySelector('.scroll-wrapper').height = (window.innerHeight - navbarHeight - 3)
    }

    // if (utils.getOS() === utils.type.MAC) {
    //   document.querySelector('.scroll-wrapper .wrapper-content').style['margin-right'] = '22px'
    // }
    // console.log(utils.getOS())
  },
  updateWorkspaceSize (isFull) {
    let navbarHeight = document.querySelector('.vuestic-navbar').offsetHeight
    if (document.querySelector('#programming-frame')) {
      document.querySelector('#programming-frame').style.height = (window.innerHeight - navbarHeight - 7 - 47).toString() + 'px'
      document.querySelector('#programming-frame').style.width = (window.innerWidth - (isFull ? 0 : 360)).toString() + 'px'

      if (document.querySelector('#blocklyDiv')) {
        document.querySelector('#blocklyDiv').style.height = document.querySelector('#programming-frame').style.height
      }

      if (document.querySelector('#cmEditor .CodeMirror')) {
        document.querySelector('#cmEditor .CodeMirror').style.height = document.querySelector('#programming-frame').style.height
      }
      document.querySelector('footer.footer').style.width = `calc(100vw - ${(isFull ? 0 : 360)}px)`

      // if (document.querySelector('#cmEditor')) {
      //   document.querySelector('#cmEditor').style.height = document.querySelector('#programming-frame').style.height
      // }
      // document.querySelector('#blocklyArea').style.height = document.querySelector('#programming-frame').style.height
    }

    if (document.querySelector('.scroll-wrapper')) {
      document.querySelector('.scroll-wrapper').style.height = (window.innerHeight - navbarHeight - 3).toString() + 'px'
    }
  },
  hasClass (ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  },
  addClass (ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += (' ' + cls)
  },
  removeClass (ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      ele.className = ele.className.replace(reg, ' ')
    }
  },
  setGogoXmlValue (xml, name, value) {
    let isNew = false
    let gogoTag = xml.getElementsByTagName('gogo')[0]
    if (!gogoTag) {
      gogoTag = document.createElement('gogo')
      isNew = true
    }

    let node = gogoTag.getElementsByTagName(name)[0]
    if (!node) {
      node = document.createElement(name)
      node.appendChild(document.createTextNode(value))
      gogoTag.appendChild(node)
    } else {
      node = value
    }

    if (isNew) {
      xml.appendChild(gogoTag)
    }
    return xml
  },
  setGogoJsonToXml (xml, object) {
    if (!object) {
      return xml
    }
    for (const key in object) {
      xml = this.setGogoXmlValue(xml, key, object[key])
    }
    return xml
  },
  getGogoXmlValue (xml, name) {
    try {
      return xml.getElementsByTagName('gogo')[0].getElementsByTagName(name)[0].textContent
    } catch (error) {
      return null
    }
  },
  getGogoJsonValuefromXml (xml) {
    let data = {}
    let preferdKeys = ['logo_code', 'file_name', 'program_mode']
    // ******************* Get keys from XML files ******************* //
    try {
      let nodes = xml.getElementsByTagName('gogo')[0].childNodes
      for (const node of nodes) {
        // ******************* Add just the non-existing keys ******************* //
        if (preferdKeys.indexOf(node.nodeName) >= 0) {
          preferdKeys.push(node.nodeName)
        }
        preferdKeys.push(node.nodeName)
      }
    } catch (error) {
    }

    // ******************* try to get the values ******************* //
    for (const key of preferdKeys) {
      data[key] = this.getGogoXmlValue(xml, key)
    }
    return data
  },
  saveFile (fileName, data) {
    const blob = new Blob([data], { type: 'text/plain' })
    const e = document.createEvent('MouseEvents')
    const a = document.createElement('a')
    a.download = `${fileName || 'Untitled'}.xml`
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/xml', a.download, a.href].join(':')
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  },
  buildSharingUrl (fileId) {
    var protocol = window.location.protocol
    var slashes = protocol.concat('//')
    var host = slashes.concat(window.location.host)
    return host + '#/app/program/' + fileId
  },
  getDateTimeIso8601 () {
    return new Date().toJSON()
  }
}
