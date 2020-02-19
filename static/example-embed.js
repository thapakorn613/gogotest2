

!(function () {
  // *********** Message between the frames *********** //

  var IframeMessenger = {}

  IframeMessenger.sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(msg, '*')
  }

  IframeMessenger.onReceiveMessage = function (msg) {
    console.log('Received', msg)
  }

  // *********** Functions *********** //

  const isUuid = function (string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(string)
  }

  const getUuidFromUrl = function (url) {
    if (url.length < 36) {
      return false
    }
    let uuid = url.substring(url.length - 36, url.length)
    return uuid
  }

  const isInIframe = function () {
    return window.location !== window.parent.location
  }

  const printLinkAttributes = function (link) {
    // link.protocol // => "http:"
    // link.host     // => "example.com:3000"
    // link.hostname // => "example.com"
    // link.port     // => "3000"
    // link.pathname // => "/pathname/"
    // link.hash     // => "#hash"
    // link.search   // => "?search=test"
    // link.origin   // => "http://example.com:3000"
    console.log(link.host, link.pathname, link.hash, link.search, link.href)
  }

  const genButton = function (link) {
    return `<center><a href="${link}" target="_blank" class="btn btn-default text-center">
      <i class="fas fa-folder-open"></i>
        Try it!
      </a></center>`
  }

  const filteredHostnames = ['code.gogoboard.org', 'code.learninginventions.org']
  // console.log('Is iframe', isInIframe())

  jQuery(document).ready(function () {
    jQuery('#header-wrapper #header').remove()

    jQuery('a').each((nodeIndex, node) => {
      // *********** Filter only GoGo Code website *********** //
      // console.log(node.host)
      if (filteredHostnames.indexOf(node.host) > -1) {
        // console.log(nodeIndex, node)
        // printLinkAttributes(node)
        let $tryButton = jQuery(genButton(node.href))
        jQuery(node).attr('target', '_blank')
        jQuery(node).after($tryButton).after('<p></p>')

        var addClickEvent = function (event) {
          event.preventDefault()
          let uuid = getUuidFromUrl(node.href)
          if (isUuid(uuid)) {
            // console.log(uuid)
            IframeMessenger.sendMessage({ event: 'loadProject', data: uuid })
          }
        }

        if (isInIframe()) {
          jQuery(node).click(addClickEvent)
          jQuery($tryButton).click(addClickEvent)
        }
      }
    })
  })
}())
