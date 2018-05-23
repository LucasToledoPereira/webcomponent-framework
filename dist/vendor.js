/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n'use strict';\n\n(()=>{if(!window.customElements)return;const a=window.HTMLElement,b=window.customElements.define,c=window.customElements.get,d=new Map,e=new Map;let f=!1,g=!1;window.HTMLElement=function(){if(!f){const a=d.get(this.constructor),b=c.call(window.customElements,a);g=!0;const e=new b;return e}f=!1;}, window.HTMLElement.prototype=a.prototype;Object.defineProperty(window,'customElements',{value:window.customElements,configurable:!0,writable:!0}), Object.defineProperty(window.customElements,'define',{value:(c,h)=>{const i=h.prototype,j=class extends a{constructor(){super(), Object.setPrototypeOf(this,i), g||(f=!0, h.call(this)), g=!1;}},k=j.prototype;j.observedAttributes=h.observedAttributes, k.connectedCallback=i.connectedCallback, k.disconnectedCallback=i.disconnectedCallback, k.attributeChangedCallback=i.attributeChangedCallback, k.adoptedCallback=i.adoptedCallback, d.set(h,c), e.set(c,h), b.call(window.customElements,c,j);},configurable:!0,writable:!0}), Object.defineProperty(window.customElements,'get',{value:a=>e.get(a),configurable:!0,writable:!0});})();\n\n/**\n@license\nCopyright (c) 2017 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\nThe complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\nThe complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\nCode distributed by Google as part of the polymer project is also\nsubject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n*/\n\n}());\n\n\n//# sourceURL=webpack:///./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js?");

/***/ }),

/***/ "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @license\n * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function() {\n  'use strict';\n\n  /**\n   * Basic flow of the loader process\n   *\n   * There are 4 flows the loader can take when booting up\n   *\n   * - Synchronous script, no polyfills needed\n   *   - wait for `DOMContentLoaded`\n   *   - run callbacks passed to `waitFor`\n   *   - fire WCR event\n   *\n   * - Synchronous script, polyfills needed\n   *   - document.write the polyfill bundle\n   *   - wait on the `load` event of the bundle to batch Custom Element upgrades\n   *   - wait for `DOMContentLoaded`\n   *   - run callbacks passed to `waitFor`\n   *   - fire WCR event\n   *\n   * - Asynchronous script, no polyfills needed\n   *   - fire WCR event, as there could not be any callbacks passed to `waitFor`\n   *\n   * - Asynchronous script, polyfills needed\n   *   - Append the polyfill bundle script\n   *   - wait for `load` event of the bundle\n   *   - batch Custom Element Upgrades\n   *   - run callbacks pass to `waitFor`\n   *   - fire WCR event\n   */\n\n  var polyfillsLoaded = false;\n  var whenLoadedFns = [];\n  var allowUpgrades = false;\n  var flushFn;\n\n  function fireEvent() {\n    window.WebComponents.ready = true;\n    document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));\n  }\n\n  function batchCustomElements() {\n    if (window.customElements && customElements.polyfillWrapFlushCallback) {\n      customElements.polyfillWrapFlushCallback(function (flushCallback) {\n        flushFn = flushCallback;\n        if (allowUpgrades) {\n          flushFn();\n        }\n      });\n    }\n  }\n\n  function asyncReady() {\n    batchCustomElements();\n    ready();\n  }\n\n  function ready() {\n    // bootstrap <template> elements before custom elements\n    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {\n      HTMLTemplateElement.bootstrap(window.document);\n    }\n    polyfillsLoaded = true;\n    runWhenLoadedFns().then(fireEvent);\n  }\n\n  function runWhenLoadedFns() {\n    allowUpgrades = false;\n    var done = function() {\n      allowUpgrades = true;\n      whenLoadedFns.length = 0;\n      flushFn && flushFn();\n    };\n    return Promise.all(whenLoadedFns.map(function(fn) {\n      return fn instanceof Function ? fn() : fn;\n    })).then(function() {\n      done();\n    }).catch(function(err) {\n      console.error(err);\n    });\n  }\n\n  window.WebComponents = window.WebComponents || {\n    ready: false,\n    _batchCustomElements: batchCustomElements,\n    waitFor: function(waitFn) {\n      if (!waitFn) {\n        return;\n      }\n      whenLoadedFns.push(waitFn);\n      if (polyfillsLoaded) {\n        runWhenLoadedFns();\n      }\n    }\n  };\n\n  var name = 'webcomponents-loader.js';\n  // Feature detect which polyfill needs to be imported.\n  var polyfills = [];\n  if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||\n    (window.ShadyDOM && window.ShadyDOM.force)) {\n    polyfills.push('sd');\n  }\n  if (!window.customElements || window.customElements.forcePolyfill) {\n    polyfills.push('ce');\n  }\n\n  var needsTemplate = (function() {\n    // no real <template> because no `content` property (IE and older browsers)\n    var t = document.createElement('template');\n    if (!('content' in t)) {\n      return true;\n    }\n    // broken doc fragment (older Edge)\n    if (!(t.content.cloneNode() instanceof DocumentFragment)) {\n      return true;\n    }\n    // broken <template> cloning (Edge up to at least version 17)\n    var t2 = document.createElement('template');\n    t2.content.appendChild(document.createElement('div'));\n    t.content.appendChild(t2);\n    var clone = t.cloneNode(true);\n    return (clone.content.childNodes.length === 0 ||\n        clone.content.firstChild.content.childNodes.length === 0);\n  })();\n\n  // NOTE: any browser that does not have template or ES6 features\n  // must load the full suite of polyfills.\n  if (!window.Promise || !Array.from || !window.URL || !window.Symbol || needsTemplate) {\n    polyfills = ['sd-ce-pf'];\n  }\n\n  if (polyfills.length) {\n    var script = document.querySelector('script[src*=\"' + name +'\"]');\n    var newScript = document.createElement('script');\n    // Load it from the right place.\n    var replacement = 'bundles/webcomponents-' + polyfills.join('-') + '.js';\n    var url = script.src.replace(name, replacement);\n    newScript.src = url;\n    // if readyState is 'loading', this script is synchronous\n    if (document.readyState === 'loading') {\n      // make sure custom elements are batched whenever parser gets to the injected script\n      newScript.setAttribute('onload', 'window.WebComponents._batchCustomElements()');\n      document.write(newScript.outerHTML);\n      document.addEventListener('DOMContentLoaded', ready);\n    } else {\n      newScript.addEventListener('load', function () {\n        asyncReady();\n      });\n      newScript.addEventListener('error', function () {\n        throw new Error('Could not load polyfill bundle' + url);\n      });\n      document.head.appendChild(newScript);\n    }\n  } else {\n    polyfillsLoaded = true;\n    if (document.readyState === 'complete') {\n      fireEvent()\n    } else {\n      // this script may come between DCL and load, so listen for both, and cancel load listener if DCL fires\n      window.addEventListener('load', ready);\n      window.addEventListener('DOMContentLoaded', function() {\n        window.removeEventListener('load', ready);\n        ready();\n      })\n    }\n  }\n})();\n\n\n//# sourceURL=webpack:///./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js?");

/***/ }),

/***/ 1:
/*!****************************************************************************************************************************!*\
  !*** multi @webcomponents/webcomponentsjs/webcomponents-loader @webcomponents/webcomponentsjs/custom-elements-es5-adapter ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @webcomponents/webcomponentsjs/webcomponents-loader */\"./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js\");\nmodule.exports = __webpack_require__(/*! @webcomponents/webcomponentsjs/custom-elements-es5-adapter */\"./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js\");\n\n\n//# sourceURL=webpack:///multi_@webcomponents/webcomponentsjs/webcomponents-loader_@webcomponents/webcomponentsjs/custom-elements-es5-adapter?");

/***/ })

/******/ });