// module.exports =

export default function (Blockly) {
  Blockly.GogoCode = new Blockly.Generator('GogoCode')

  /**
     * List of illegal variable names.
     * This is not intended to be a security feature.  Blockly is 100% client-side,
     * so bypassing this list is trivial.  This is intended to prevent users from
     * accidentally clobbering a built-in object or function.
     * @private
     */
  Blockly.GogoCode.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    // https://developer.mozilla.org/en/GogoCode/Reference/Reserved_Words
    'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
    // https://developer.mozilla.org/en/GogoCode/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan' +
    'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
    'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
    'or,pass,print,raise,return,try,while,with,yield,' +
    // https://docs.python.org/3/library/constants.html
    // https://docs.python.org/2/library/constants.html
    'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    // >>> print(','.join(sorted(dir(__builtins__))))
    // https://docs.python.org/3/library/functions.html
    // https://docs.python.org/2/library/functions.html
    'ArithmeticError,AssertionError,AttributeError,BaseException,' +
    'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
    'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
    'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
    'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
    'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
    'ImportWarning,IndentationError,IndexError,InterruptedError,' +
    'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
    'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
    'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
    'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
    'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
    'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
    'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
    'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
    'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
    'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
    '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
    'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
    'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
    'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
    'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
    'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
    'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
    'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
    'sum,super,tuple,type,unichr,unicode,vars,xrange,zip,' +
    'main,to,end,ifstatechange,not,and,or,beep,forever,repeat,waituntil,' +
    'sensor1,sensor2,sensor3,sensor4,sensor5,sensor6,sensor7,sensor8,' +
    'on,off,onfor,cw,ccw,rd,setpower,seth,lt,rt,wait,timer,resett,' +
    'settickrate,tickcount,cleartick,ir,show,' +
    'seconds,minutes,hours,dow,day,month,year,' +
    'setpos,cls,play,nexttrack,prevtrack,gototrack,erasetracks,' +
    'i2cwrite,i2cread,')

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/GogoCode/Reference/Operators/Operator_Precedence
 */
  Blockly.GogoCode.ORDER_ATOMIC = 0         // 0 "" ...
  Blockly.GogoCode.ORDER_MEMBER = 1         // . []
  Blockly.GogoCode.ORDER_NEW = 1            // new
  Blockly.GogoCode.ORDER_FUNCTION_CALL = 2  // ()
  Blockly.GogoCode.ORDER_INCREMENT = 3      // ++
  Blockly.GogoCode.ORDER_DECREMENT = 3      // --
  Blockly.GogoCode.ORDER_LOGICAL_NOT = 4    // !
  Blockly.GogoCode.ORDER_BITWISE_NOT = 4    // ~
  Blockly.GogoCode.ORDER_UNARY_PLUS = 4     // +
  Blockly.GogoCode.ORDER_UNARY_NEGATION = 4 // -
  Blockly.GogoCode.ORDER_TYPEOF = 4         // typeof
  Blockly.GogoCode.ORDER_VOID = 4           // void
  Blockly.GogoCode.ORDER_DELETE = 4         // delete
  Blockly.GogoCode.ORDER_MULTIPLICATION = 5 // *
  Blockly.GogoCode.ORDER_DIVISION = 5       // /
  Blockly.GogoCode.ORDER_MODULUS = 5        // %
  Blockly.GogoCode.ORDER_ADDITION = 6       // +
  Blockly.GogoCode.ORDER_SUBTRACTION = 6    // -
  Blockly.GogoCode.ORDER_BITWISE_SHIFT = 7  // << >> >>>
  Blockly.GogoCode.ORDER_RELATIONAL = 8     // < <= > >=
  Blockly.GogoCode.ORDER_IN = 8             // in
  Blockly.GogoCode.ORDER_INSTANCEOF = 8     // instanceof
  Blockly.GogoCode.ORDER_EQUALITY = 9       // == != === !==
  Blockly.GogoCode.ORDER_BITWISE_AND = 10   // &
  Blockly.GogoCode.ORDER_BITWISE_XOR = 11   // ^
  Blockly.GogoCode.ORDER_BITWISE_OR = 12    // |
  Blockly.GogoCode.ORDER_LOGICAL_AND = 13   // &&
  Blockly.GogoCode.ORDER_LOGICAL_OR = 14    // ||
  Blockly.GogoCode.ORDER_CONDITIONAL = 15   // ?:
  Blockly.GogoCode.ORDER_ASSIGNMENT = 16    // = += -= *= /= %= <<= >>= ...
  Blockly.GogoCode.ORDER_COMMA = 17         // ,
  Blockly.GogoCode.ORDER_NONE = 99          // (...)

//   /**
//   * Arbitrary code to inject into locations that risk causing infinite loops.
//   * Any instances of '%1' will be replaced by the block ID that failed.
//   * E.g. '  checkTimeout(%1);\n'
//   * @type ?string
//   */
  Blockly.GogoCode.INFINITE_LOOP_TRAP = null

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
  Blockly.GogoCode.init = function (workspace) {
    // Create a dictionary of definitions to be printed before the code.
    Blockly.GogoCode.definitions_ = Object.create(null)
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.GogoCode.functionNames_ = Object.create(null)

    if (!Blockly.GogoCode.variableDB_) {
      Blockly.GogoCode.variableDB_ =
          new Blockly.Names(Blockly.GogoCode.RESERVED_WORDS_)
    } else {
      Blockly.GogoCode.variableDB_.reset()
    }

    Blockly.GogoCode.variableDB_.setVariableMap(workspace.getVariableMap())

    var defvars = []
    // Add developer variables (not created or named by the user).
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace)
    for (var i = 0; i < devVarList.length; i++) {
    //   defvars.push(Blockly.GogoCode.variableDB_.getName(devVarList[i],
    //       Blockly.Names.DEVELOPER_VARIABLE_TYPE))

      var defining = `set ${Blockly.GogoCode.variableDB_.getName(devVarList[i], Blockly.Names.DEVELOPER_VARIABLE_TYPE)} 0`

      defvars.push(defining)
    }

    // Add user variables, but only ones that are being used.
    var variables = Blockly.Variables.allUsedVarModels(workspace)

    for (var j = 0; j < variables.length; j++) {
      var defining2 = `set ${Blockly.GogoCode.variableDB_.getName(variables[j].getId(), Blockly.Variables.NAME_TYPE)} 0`
      defvars.push(defining2)
    }

    // var variables = Blockly.Variables.allUsedVarModels(workspace);
    // for (var j = 0; i < variables.length; i++) {
    //   defvars.push(Blockly.GogoCode.variableDB_.getName(variables[i].getId(),
    //       Blockly.Variables.NAME_TYPE));
    // }

    // Declare all of the variables.
    if (defvars.length) {
      Blockly.GogoCode.definitions_['variables'] = `[VAR]${defvars.join('\n')}[/VAR]`
    }
  }

//   /**
//    * Initialise the database of variable names.
//    */
//   Blockly.GogoCode.init = function (workspace) {
//     // Create a dictionary of definitions to be printed before the code.
//     Blockly.GogoCode.definitions_ = Object.create(null)
//     // Create a dictionary mapping desired function names in definitions_
//     // to actual function names (to avoid collisions with user functions).
//     Blockly.GogoCode.functionNames_ = Object.create(null)

//     if (Blockly.Variables) {
//       if (!Blockly.GogoCode.variableDB_) {
//         Blockly.GogoCode.variableDB_ =
//             new Blockly.Names(Blockly.GogoCode.RESERVED_WORDS_)
//       } else {
//         Blockly.GogoCode.variableDB_.reset()
//       }

//       var defvars = []
//       var variables = Blockly.Variables.allVariables()
//       for (var x = 0; x < variables.length; x++) {
//         defvars[x] = 'set ' +
//             Blockly.GogoCode.variableDB_.getName(variables[x],
//             Blockly.Variables.NAME_TYPE) + ' 0'
//       }
//       Blockly.GogoCode.definitions_['variables'] = defvars.join('\n')
//     }
//   }

  /**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
  Blockly.GogoCode.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var definitions = []
    for (var name in Blockly.GogoCode.definitions_) {
      definitions.push(Blockly.GogoCode.definitions_[name])
    }
    // Clean up temporary data.
    delete Blockly.GogoCode.definitions_
    delete Blockly.GogoCode.functionNames_
    Blockly.GogoCode.variableDB_.reset()
    return definitions.join('\n\n') + '\n\n\n' + code
  }

  /**
   * Naked values are top-level blocks with outputs that aren't plugged into
   * anything.  A trailing semicolon is needed to make this legal.
   * @param {string} line Line of generated code.
   * @return {string} Legal line of code.
   */
  Blockly.GogoCode.scrubNakedValue = function (line) {
    return line + ';\n'
  }


  /**
 * Encode a string as a properly escaped GogoCode string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} GogoCode string.
 * @private
 */
  Blockly.GogoCode.quote_ = function (string) {
    // TODO: This is a quick hack.  Replace with goog.string.quote
    string = string.replace(/\\/g, '\\\\')
                   .replace(/\n/g, '\\\n')
                   .replace(/'/g, '\\\'')
    return '\'' + string + '\''
  }

  /**
 * Common tasks for generating GogoCode from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The GogoCode code created for this block.
 * @return {string} GogoCode code with comments and subsequent blocks added.
 * @private
 */
  Blockly.GogoCode.scrub_ = function (block, code) {
    if (code === null) {
      // Block has handled code generation itself.
      return ''
    }
    var commentCode = ''
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
      // Collect comment for this block.
      var comment = block.getCommentText()
      if (comment) {
        commentCode += this.prefixLines(comment, '// ') + '\n'
      }
      // Collect comments for all value arguments.
      // Don't collect comments for nested statements.
      for (var x = 0; x < block.inputList.length; x++) {
        if (block.inputList[x].type === Blockly.INPUT_VALUE) {
          var childBlock = block.inputList[x].connection.targetBlock()
          if (childBlock) {
            var commenti = this.allNestedComments(childBlock)
            if (commenti) {
              commentCode += this.prefixLines(commenti, '// ')
            }
          }
        }
      }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock()
    var nextCode = this.blockToCode(nextBlock)
    return commentCode + code + nextCode
  }

  require('./blocks/basic/variable')(Blockly)
  require('./blocks/basic/function')(Blockly)
  require('./blocks/basic/logic')(Blockly)
  require('./blocks/basic/loop')(Blockly)
  require('./blocks/basic/math')(Blockly)
  require('./blocks/basic/motor')(Blockly)
  require('./blocks/basic/servo')(Blockly)
  require('./blocks/basic/sensor')(Blockly)
  require('./blocks/basic/sound')(Blockly)
  require('./blocks/basic/time')(Blockly)
  require('./blocks/basic/irRemote')(Blockly)
  require('./blocks/basic/otherAction')(Blockly)
  require('./blocks/basic/definition')(Blockly)

  require('./blocks/modules/clockModule')(Blockly)
  require('./blocks/modules/displayModule')(Blockly)
  require('./blocks/modules/displayModule')(Blockly)
  require('./blocks/modules/voiceModule')(Blockly)
  require('./blocks/modules/i2c')(Blockly)

  require('./blocks/pi/piCamera')(Blockly)
  require('./blocks/pi/piCloudService')(Blockly)
  require('./blocks/pi/piDataLogging')(Blockly)
  require('./blocks/pi/piEmail')(Blockly)
  require('./blocks/pi/piFingerScan')(Blockly)
  require('./blocks/pi/piGogoCom')(Blockly)
  require('./blocks/pi/piImage')(Blockly)
  require('./blocks/pi/piRfid')(Blockly)
  require('./blocks/pi/piSound')(Blockly)
  require('./blocks/pi/piSms')(Blockly)

  return Blockly.GogoCode
}
