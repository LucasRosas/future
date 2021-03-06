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
})({"js/skils.js":[function(require,module,exports) {
// C??digo dos bot??es na barra de ferramentas
var estilo = {};

function configuracoes() {}

boler = false;

function mudaestilo(a, b) {
  document.documentElement.style.setProperty('--' + a, b);
  estilo[a] = b;
  localStorage.setItem(localestilo, JSON.stringify(estilo));
}

function cornome(x) {
  x.nextElementSibling.value = x.value;
  x.nextElementSibling.style.color = x.value;
  mudaestilo(x.id, x.value);
  ajustacontraste();
}

function setacores() {
  x = document.getElementsByClassName('cor');

  for (i = 0; i < x.length; i++) {
    if (estilo[x[i].id] != null) {
      x[i].value = estilo[x[i].id];
    }
  }
}

function ajustacontraste() {
  x = document.getElementsByClassName('cor');

  for (i = 0; i < x.length; i++) {
    mudaestilo(x[i].id + 'd', chroma(x[i].value).darken().hex());

    if (chroma.contrast(x[i].value, '#000000') >= 6) {
      mudaestilo(x[i].id + 'c', '#000000');
    } else {
      mudaestilo(x[i].id + 'c', '#ffffff');
    }
  }
}

var imageHeight = 0;
var image = new Image();
var covery = 0;
var boler = false;
var dist = 0;
var e = window.event;
/* function coord() {
    var e = window.event;
    mudaestilo('cy', e.clientY + 'px')
    mudaestilo('cx', e.clientX + 'px')
    document.getElementById('coord').innerText = e.clientX + ', ' + e.clientY
} */

function addImage(x) {
  mudaestilo('imgcoverurl', x);
  image.src = x.split('url(')[1].replace(')', '');

  if (image.width > 0) {
    imageHeight = window.innerWidth * image.height / image.width;
  } else {
    imageHeight = image.height;
  }

  boler = false;
  roda();
}

function coverposition1() {
  var e = window.event;
  boler = true;
  posy1 = e.clientY - covery;
  mudaestilo('covery', covery + 'px');
}

function coverposition2() {
  var e = window.event;

  if (boler) {
    posy2 = e.clientY;
    covery = Math.min(Math.max(posy2 - posy1, 350 - imageHeight), 0);
    mudaestilo('covery', covery + 'px');
  }
}

function posiciona(m) {
  x = m.getBoundingClientRect().left;
  y = m.getBoundingClientRect().top + 20;
  mudaestilo('leftdef', x + 'px');
  mudaestilo('topdef', y + 'px');
}

function corvalor(x) {
  document.getElementById('c' + x.id).value = x.value;
  mudaestilo('c' + x.id, x.value);
  ajustacontraste();
}

function config() {
  x = document.getElementById('configuracoes');
  b = blocodenotas;
  a = document.getElementsByClassName('botoesf');

  if (x.classList.contains('desativo')) {
    x.classList.remove('desativo');
    x.classList.add('ativo');
  } else {
    fechaconfig();
  }
}

function fechaconfig() {
  document.getElementById('configuracoes').classList.remove('ativo');
  document.getElementById('configuracoes').classList.add('desativo');
}

function bold() {
  if (myCodeMirror.getSelection() == '') {
    selecionapalavra();
    bold();
  } else {
    if (myCodeMirror.getSelection().split('*').length % 2 == 0) {
      myCodeMirror.replaceSelection('*' + myCodeMirror.getSelection().replaceAll('*', ''));
    } else {
      myCodeMirror.replaceSelection('*' + myCodeMirror.getSelection().replaceAll('*', '') + '*');
    }
  }

  roda();
}

function italic() {}

function sublinhado() {}

function h1() {
  myCodeMirror.setSelection({
    line: 6,
    ch: 0
  }, {
    line: 7,
    ch: 0
  });
  myCodeMirror.replaceSelection('#' + myCodeMirror.getSelection());
  roda();
}

function h2() {}

function h3() {}

function justificado() {}

function centraliza() {}

function alinhadodireita() {}

function lista() {}

function listaordenada() {}

function link() {}

function imagem() {}

function tabela() {}

function multiplaescolha() {}

function completaespaco() {}

function baixartxt() {}

function abrirlivro() {}

function compartilharlivro() {}

function selecionapalavra() {
  a1 = myCodeMirror.getCursor().line;
  a2 = myCodeMirror.getCursor().ch;
  b1 = myCodeMirror.findWordAt({
    line: a1,
    ch: a2
  }).anchor.ch;
  b2 = myCodeMirror.findWordAt({
    line: a1,
    ch: a2
  }).head.ch;
  myCodeMirror.extendSelection({
    line: a1,
    ch: b1
  }, {
    line: a1,
    ch: b2
  }, false);
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
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
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/skils.js"], null)
//# sourceMappingURL=/skils.91659e4a.js.map