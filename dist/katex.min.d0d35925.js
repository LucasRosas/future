// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/katex.min.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./fonts\\KaTeX_AMS-Regular.woff2":[["KaTeX_AMS-Regular.ed1fb447.woff2","css/fonts/KaTeX_AMS-Regular.woff2"],"css/fonts/KaTeX_AMS-Regular.woff2"],"./fonts\\KaTeX_AMS-Regular.woff":[["KaTeX_AMS-Regular.fd7230f5.woff","css/fonts/KaTeX_AMS-Regular.woff"],"css/fonts/KaTeX_AMS-Regular.woff"],"./fonts\\KaTeX_AMS-Regular.ttf":[["KaTeX_AMS-Regular.24a37f0e.ttf","css/fonts/KaTeX_AMS-Regular.ttf"],"css/fonts/KaTeX_AMS-Regular.ttf"],"./fonts\\KaTeX_Caligraphic-Bold.woff2":[["KaTeX_Caligraphic-Bold.eb06750e.woff2","css/fonts/KaTeX_Caligraphic-Bold.woff2"],"css/fonts/KaTeX_Caligraphic-Bold.woff2"],"./fonts\\KaTeX_Caligraphic-Bold.woff":[["KaTeX_Caligraphic-Bold.10e11984.woff","css/fonts/KaTeX_Caligraphic-Bold.woff"],"css/fonts/KaTeX_Caligraphic-Bold.woff"],"./fonts\\KaTeX_Caligraphic-Bold.ttf":[["KaTeX_Caligraphic-Bold.c987f5a7.ttf","css/fonts/KaTeX_Caligraphic-Bold.ttf"],"css/fonts/KaTeX_Caligraphic-Bold.ttf"],"./fonts\\KaTeX_Caligraphic-Regular.woff2":[["KaTeX_Caligraphic-Regular.e5fd1535.woff2","css/fonts/KaTeX_Caligraphic-Regular.woff2"],"css/fonts/KaTeX_Caligraphic-Regular.woff2"],"./fonts\\KaTeX_Caligraphic-Regular.woff":[["KaTeX_Caligraphic-Regular.82cc74bf.woff","css/fonts/KaTeX_Caligraphic-Regular.woff"],"css/fonts/KaTeX_Caligraphic-Regular.woff"],"./fonts\\KaTeX_Caligraphic-Regular.ttf":[["KaTeX_Caligraphic-Regular.10c507f6.ttf","css/fonts/KaTeX_Caligraphic-Regular.ttf"],"css/fonts/KaTeX_Caligraphic-Regular.ttf"],"./fonts\\KaTeX_Fraktur-Bold.woff2":[["KaTeX_Fraktur-Bold.ec6f1545.woff2","css/fonts/KaTeX_Fraktur-Bold.woff2"],"css/fonts/KaTeX_Fraktur-Bold.woff2"],"./fonts\\KaTeX_Fraktur-Bold.woff":[["KaTeX_Fraktur-Bold.2ac3c88c.woff","css/fonts/KaTeX_Fraktur-Bold.woff"],"css/fonts/KaTeX_Fraktur-Bold.woff"],"./fonts\\KaTeX_Fraktur-Bold.ttf":[["KaTeX_Fraktur-Bold.83bfe5bd.ttf","css/fonts/KaTeX_Fraktur-Bold.ttf"],"css/fonts/KaTeX_Fraktur-Bold.ttf"],"./fonts\\KaTeX_Fraktur-Regular.woff2":[["KaTeX_Fraktur-Regular.df3ad7f7.woff2","css/fonts/KaTeX_Fraktur-Regular.woff2"],"css/fonts/KaTeX_Fraktur-Regular.woff2"],"./fonts\\KaTeX_Fraktur-Regular.woff":[["KaTeX_Fraktur-Regular.0bbe0dd8.woff","css/fonts/KaTeX_Fraktur-Regular.woff"],"css/fonts/KaTeX_Fraktur-Regular.woff"],"./fonts\\KaTeX_Fraktur-Regular.ttf":[["KaTeX_Fraktur-Regular.5db900d0.ttf","css/fonts/KaTeX_Fraktur-Regular.ttf"],"css/fonts/KaTeX_Fraktur-Regular.ttf"],"./fonts\\KaTeX_Main-Bold.woff2":[["KaTeX_Main-Bold.b14bc717.woff2","css/fonts/KaTeX_Main-Bold.woff2"],"css/fonts/KaTeX_Main-Bold.woff2"],"./fonts\\KaTeX_Main-Bold.woff":[["KaTeX_Main-Bold.1446f7e4.woff","css/fonts/KaTeX_Main-Bold.woff"],"css/fonts/KaTeX_Main-Bold.woff"],"./fonts\\KaTeX_Main-Bold.ttf":[["KaTeX_Main-Bold.19e069f2.ttf","css/fonts/KaTeX_Main-Bold.ttf"],"css/fonts/KaTeX_Main-Bold.ttf"],"./fonts\\KaTeX_Main-Regular.woff2":[["KaTeX_Main-Regular.b83270c2.woff2","css/fonts/KaTeX_Main-Regular.woff2"],"css/fonts/KaTeX_Main-Regular.woff2"],"./fonts\\KaTeX_Main-Regular.woff":[["KaTeX_Main-Regular.49f65c8a.woff","css/fonts/KaTeX_Main-Regular.woff"],"css/fonts/KaTeX_Main-Regular.woff"],"./fonts\\KaTeX_Main-Regular.ttf":[["KaTeX_Main-Regular.646671ce.ttf","css/fonts/KaTeX_Main-Regular.ttf"],"css/fonts/KaTeX_Main-Regular.ttf"],"./fonts\\KaTeX_SansSerif-Bold.woff2":[["KaTeX_SansSerif-Bold.c84c2cdd.woff2","css/fonts/KaTeX_SansSerif-Bold.woff2"],"css/fonts/KaTeX_SansSerif-Bold.woff2"],"./fonts\\KaTeX_SansSerif-Bold.woff":[["KaTeX_SansSerif-Bold.1f4ca0e4.woff","css/fonts/KaTeX_SansSerif-Bold.woff"],"css/fonts/KaTeX_SansSerif-Bold.woff"],"./fonts\\KaTeX_SansSerif-Bold.ttf":[["KaTeX_SansSerif-Bold.94d9bb34.ttf","css/fonts/KaTeX_SansSerif-Bold.ttf"],"css/fonts/KaTeX_SansSerif-Bold.ttf"],"./fonts\\KaTeX_SansSerif-Regular.woff2":[["KaTeX_SansSerif-Regular.6834ee72.woff2","css/fonts/KaTeX_SansSerif-Regular.woff2"],"css/fonts/KaTeX_SansSerif-Regular.woff2"],"./fonts\\KaTeX_SansSerif-Regular.woff":[["KaTeX_SansSerif-Regular.0b2a616b.woff","css/fonts/KaTeX_SansSerif-Regular.woff"],"css/fonts/KaTeX_SansSerif-Regular.woff"],"./fonts\\KaTeX_SansSerif-Regular.ttf":[["KaTeX_SansSerif-Regular.cec4c053.ttf","css/fonts/KaTeX_SansSerif-Regular.ttf"],"css/fonts/KaTeX_SansSerif-Regular.ttf"],"./fonts\\KaTeX_Script-Regular.woff2":[["KaTeX_Script-Regular.142cda4c.woff2","css/fonts/KaTeX_Script-Regular.woff2"],"css/fonts/KaTeX_Script-Regular.woff2"],"./fonts\\KaTeX_Script-Regular.woff":[["KaTeX_Script-Regular.936bff36.woff","css/fonts/KaTeX_Script-Regular.woff"],"css/fonts/KaTeX_Script-Regular.woff"],"./fonts\\KaTeX_Script-Regular.ttf":[["KaTeX_Script-Regular.a594c8e1.ttf","css/fonts/KaTeX_Script-Regular.ttf"],"css/fonts/KaTeX_Script-Regular.ttf"],"./fonts\\KaTeX_Size1-Regular.woff2":[["KaTeX_Size1-Regular.e0e81c7f.woff2","css/fonts/KaTeX_Size1-Regular.woff2"],"css/fonts/KaTeX_Size1-Regular.woff2"],"./fonts\\KaTeX_Size1-Regular.woff":[["KaTeX_Size1-Regular.26b53719.woff","css/fonts/KaTeX_Size1-Regular.woff"],"css/fonts/KaTeX_Size1-Regular.woff"],"./fonts\\KaTeX_Size1-Regular.ttf":[["KaTeX_Size1-Regular.68c96867.ttf","css/fonts/KaTeX_Size1-Regular.ttf"],"css/fonts/KaTeX_Size1-Regular.ttf"],"./fonts\\KaTeX_Size2-Regular.woff2":[["KaTeX_Size2-Regular.94b20b99.woff2","css/fonts/KaTeX_Size2-Regular.woff2"],"css/fonts/KaTeX_Size2-Regular.woff2"],"./fonts\\KaTeX_Size2-Regular.woff":[["KaTeX_Size2-Regular.3cc700fd.woff","css/fonts/KaTeX_Size2-Regular.woff"],"css/fonts/KaTeX_Size2-Regular.woff"],"./fonts\\KaTeX_Size2-Regular.ttf":[["KaTeX_Size2-Regular.880afff8.ttf","css/fonts/KaTeX_Size2-Regular.ttf"],"css/fonts/KaTeX_Size2-Regular.ttf"],"./fonts\\KaTeX_Size3-Regular.woff2":[["KaTeX_Size3-Regular.f6b492e7.woff2","css/fonts/KaTeX_Size3-Regular.woff2"],"css/fonts/KaTeX_Size3-Regular.woff2"],"./fonts\\KaTeX_Size3-Regular.woff":[["KaTeX_Size3-Regular.85d1e695.woff","css/fonts/KaTeX_Size3-Regular.woff"],"css/fonts/KaTeX_Size3-Regular.woff"],"./fonts\\KaTeX_Size3-Regular.ttf":[["KaTeX_Size3-Regular.cf9c1c14.ttf","css/fonts/KaTeX_Size3-Regular.ttf"],"css/fonts/KaTeX_Size3-Regular.ttf"],"./fonts\\KaTeX_Size4-Regular.woff2":[["KaTeX_Size4-Regular.94caf3df.woff2","css/fonts/KaTeX_Size4-Regular.woff2"],"css/fonts/KaTeX_Size4-Regular.woff2"],"./fonts\\KaTeX_Size4-Regular.woff":[["KaTeX_Size4-Regular.9f46dfff.woff","css/fonts/KaTeX_Size4-Regular.woff"],"css/fonts/KaTeX_Size4-Regular.woff"],"./fonts\\KaTeX_Size4-Regular.ttf":[["KaTeX_Size4-Regular.8d3659a8.ttf","css/fonts/KaTeX_Size4-Regular.ttf"],"css/fonts/KaTeX_Size4-Regular.ttf"],"./fonts\\KaTeX_Typewriter-Regular.woff2":[["KaTeX_Typewriter-Regular.521046d9.woff2","css/fonts/KaTeX_Typewriter-Regular.woff2"],"css/fonts/KaTeX_Typewriter-Regular.woff2"],"./fonts\\KaTeX_Typewriter-Regular.woff":[["KaTeX_Typewriter-Regular.d173d9e2.woff","css/fonts/KaTeX_Typewriter-Regular.woff"],"css/fonts/KaTeX_Typewriter-Regular.woff"],"./fonts\\KaTeX_Typewriter-Regular.ttf":[["KaTeX_Typewriter-Regular.e74f0411.ttf","css/fonts/KaTeX_Typewriter-Regular.ttf"],"css/fonts/KaTeX_Typewriter-Regular.ttf"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51064" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/katex.min.d0d35925.js.map