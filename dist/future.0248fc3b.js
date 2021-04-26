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
})({"js/future.js":[function(require,module,exports) {
var entrada;
var texto = 'memoria';
var localestilo = 'estilo';
var prefixo = "<div id=\"bm\"></div><div id='btsumarioa' onclick='abresumario()'></div><div id='cover' onmousedown=\"coverposition1()\" onmousemove=\"coverposition2()\" onmouseup=\"boler = false\"></div><div id=\"ss\"><div id=\"sumario\"></div><div id=\"sections\"><section>";
var posfixo = '</section></div></div>';
var etapa = 'etapa';
var preview = document.getElementById('preview');
var blocodenotas = document.getElementById('blocodenotas');
var sumario = '';

function inicia() {
  for (k in estilo) {
    mudaestilo(k, estilo[k]);
  }

  setacores();
  roda();
  ajustacontraste();
  addImage(estilo.imgcoverurl);
  animacerto();
}

function animacerto() {
  var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'sgv',
    loop: false,
    autoplay: true,
    path: 'data.json'
  });
}

function roda() {
  entrada = myCodeMirror.getValue('\n');
  localStorage.setItem(texto, entrada);
  entrada = imagem(link(tabela(complete(entrada))));
  entrada = formatxt(entrada, '-d', '<div class="divdd">', '</div>');
  entrada = formatxt(entrada, '-#', '<ol>', '</ol>');
  entrada = formatxt(entrada, '-A', '<ol type=A>', '</ol>');
  entrada = formatxt(entrada, '-I', '<ol type=I>', '</ol>');
  entrada = formatxt(entrada, '-a', '<ol type="a">', '</ol>');
  entrada = formatxt(entrada, '-m', "<div class='alternativas questao'>", "</div>");
  entrada = formatxt(entrada, '***', '<u>', '</u>');
  entrada = formatxt(entrada, '**', '<i>', '</i>');
  entrada = formatxt(entrada, '*', '<strong>', '</strong>'); // agora entrada vira um vetor.

  entrada = entrada.split('\n');
  entrada = tags(entrada);
  preview.innerHTML = prefixo + entrada + posfixo;
  dd();
  renderMathInElement(preview, {
    delimiters: [{
      left: "$$",
      right: "$$",
      display: true
    }, {
      left: "\\[",
      right: "\\]",
      display: true
    }, {
      left: "\\(",
      right: "\\)",
      display: false
    }]
  });
  indice();
  botaocontinua(0);
}

function tags(x) {
  for (i = 0; i < x.length; i++) {
    inicio = x[i].substring(0, 1);

    switch (inicio) {
      case '_':
        if (x[i] === '_') {
          x[i] = "</section><section style=\"display: none\">";
        }

        break;

      case 'i':
        if (x[i].substring(0, 3) === 'img') {
          x[i] = "<img class='esquerda' src='".concat(x[i].split('img')[1].split(',')[0], "' height='").concat(x[i].split('img')[1].split(',')[1], "'>");
        } else {
          x[i] = "<p>".concat(x[i], "</p>");
        }

        break;

      case ' ':
        if (x[i].substring(0, 13) === '  img{oculta}') {
          x[i] = "\n                    <div class=\"divimgocult\" onclick=\"mostra(this)\">\n                    <div class=\"imgbotao\">Mostrar</div>\n                    <img class=\"imgocult ocult\" src=\"".concat(x[i].split('  img{oculta}')[1].split(',')[0], "\" height=\"").concat(x[i].split('  img{oculta}')[1].split(',')[1], "\"/></div>");
        } else if (x[i].substring(0, 6) === '   img') {
          x[i] = "<img class='direita' src='".concat(x[i].split('   img')[1], "'>");
        } else if (x[i].substring(0, 5) === '  img') {
          x[i] = "<img class='centro' src='".concat(x[i].split('  img')[1], "'>");
        } else if (x[i].substring(0, 4) === ' img') {
          x[i] = "<img class='esquerda' src='".concat(x[i].split('img')[1], "'>");
        } else if (x[i].substring(0, 3) === '   ') {
          x[i] = "<p style=\"text-align: right; text-indent:0px\">".concat(x[i].split('   ')[1], "</p>");
        } else if (x[i].substring(0, 2) === '  ') {
          x[i] = "<p style=\"text-align: center; text-indent:0px\">".concat(x[i].split('  ')[1], "</p>");
        } else {
          x[i] = "<p>".concat(x[i], "</p>");
        }

        break;

      case '<':
        break;

      case '#':
        if (x[i].substring(0, 3) === '###') {
          x[i] = "<h3>".concat(x[i].split('###')[1], "</h3>");
        } else if (x[i].substring(0, 2) === '##') {
          x[i] = "<h2>".concat(x[i].split('##')[1], "</h2>");
        } else {
          x[i] = "<h1>".concat(x[i].split('#')[1], "</h1>");
        }

        break;

      case '-':
        if (x[i].substring(0, 2) === '--') {
          x[i] = "<li class='certa' onclick='marcou(this)'>".concat(x[i].split('--')[1], "</li>");
        } else {
          x[i] = "<li onclick='marcou(this)'>".concat(x[i].split('-')[1], "</li>");
        }

        break;

      default:
        x[i] = "<p>".concat(x[i], "</p>");
    }
  }

  return x.join('');
}

function complete(x) {
  a = x.split('[[');
  resp = [];
  ii = 0;

  for (i = 1; i < a.length; i++) {
    me = false;
    intervalo = false;
    k = -1;
    certas = a[i].split(']]')[0].split('|');
    largura = 0;

    for (j = 0; j < certas.length; j++) {
      if (certas[j].substring(0, 1) == '[') {
        me = true;
        k = j;
      }

      if (largura < certas[j].length) {
        largura = certas[j].length;
      }

      if (certas[j].includes('<<')) {
        intervalo = true;
      }
    }

    if (me) {
      certas[k] = certas[k].replace('[', '').replace(']', '');
      a[i] = "<marc class='marc questao' id=\"marc".concat(i, "\" onmouseover=\"posiciona(this)\">???<span class='me'><span onclick='escolheu(this)'>").concat(certas.join("</span><span onclick='escolheu(this)'>"), "</span></marc><span class='spanx'\">X</span>") + a[i].replace(a[i].split(']]')[0] + ']]', '');
      resp.push([certas[k]]);
    } else if (intervalo) {
      a[i] = "<input class='complete questao intervalo' type=\"text\" name =\"complete\" size=\"".concat(largura, "\" id=\"complete").concat(i, "\" value=\"???\" onclick = \"zera(this)\" onchange = \"verifica(this)\"> <span class='spanx'\">:</span>") + a[i].replace(a[i].split(']]')[0] + ']]', '');
      resp.push(certas);
    } else {
      a[i] = "<input class='complete questao' type=\"text\" name =\"complete\" size=\"".concat(largura, "\" id=\"complete").concat(i, "\" value=\"???\" onclick = \"zera(this)\" onchange = \"verifica(this)\"> <span class='spanx'\">:</span>") + a[i].replace(a[i].split(']]')[0] + ']]', '');
      resp.push(certas);
    }
  }

  x = a.join('');
  return x;
}

function formatxt(x, sinal, antes, depois) {
  if (sinal.substring(0, 1) != '-') {
    x = x.split(sinal);

    for (i = 1; i < x.length; i++) {
      if (i % 2 == 1) {
        x[i] = antes + x[i] + depois;
      }
    }
  } else {
    x = x.split('\n' + sinal + '\n');

    for (i = 1; i < x.length; i++) {
      if (i % 2 == 1) {
        x[i] = antes + '\n' + x[i] + depois + '\n';
      }
    }
  }

  return x.join('');
}

function imagem(x) {
  x = x.split('img_');

  for (i = 1; i < x.length; i++) {
    url = x[i].split(',')[0];
    altura = x[i].split(',')[1].split('_!')[0];
    x[i] = "<img src=\"".concat(url, "\" class=\"imgmiddle\" dragable=\"false\" style=\"height: ").concat(altura, "\">").concat(x[i].split('_!')[1]);
  }

  return x.join('');
}

function link(x) {
  x = x.split('~');

  for (i = 1; i < x.length; i++) {
    if (i % 2 == 1) {
      if (x[i].split('[')[1] != null) {
        a = x[i].substring(0, x[i].indexOf('['));
        b = x[i].substring(x[i].indexOf('[') + 1);
        c = b.substring(0, b.length - 1);
        x[i] = "<def onmouseover=\"posiciona(this)\">".concat(a, "<span class=\"def\">").concat(c, "</span></def>");
      } else {
        x[i] = '<a href="' + x[i].replace(',', '" target="_blank">') + '</a>';
      }
    }
  }

  return x.join('');
}

function tabela(x) {
  x = x.split('-t\n');

  for (i = 0; i < x.length; i++) {
    if (i % 2 == 1) {
      table = x[i].split('\n');
      tabela0 = [];

      for (j = 0; j < table.length - 1; j++) {
        tabela0.push(table[j]);
        tabela0[j] = tabela0[j].split('|');
      }

      for (j = 1; j < tabela0.length; j++) {
        for (k = 0; k < tabela0[j].length; k++) {
          if (tabela0[j][k] == '..') {
            g = 2;
            f = 1;

            while (j + f < tabela0.length && tabela0[j + f][k] == '..') {
              g = g + f;
              tabela0[j + f][k] = '#$#$';
              f++;
            }

            if (j == 1) {
              tabela0[j - 1][k] = '<th rowspan="' + g + '">' + tabela0[j - 1][k] + '</th>';
            } else {
              tabela0[j - 1][k] = '<td rowspan="' + g + '">' + tabela0[j - 1][k] + '</td>';
            }
          }
        }
      }

      for (j = 0; j < tabela0.length; j++) {
        for (k = 1; k < tabela0[j].length; k++) {
          if (tabela0[j][k] == '>>') {
            g = 2;
            f = 1;

            while (k + f < tabela0[j].length && tabela0[j][k + f] == '>>') {
              g = g + f;
              tabela0[j][k + f] = '#$#$';
              f++;
            }

            if (j == 0) {
              tabela0[j][k - 1] = '<th colspan="' + g + '">' + tabela0[j][k - 1] + '</th>';
            } else {
              tabela0[j][k - 1] = '<td colspan="' + g + '">' + tabela0[j][k - 1] + '</td>';
            }
          }
        }
      }

      saida = '<table>';
      td = 'th';

      for (j = 0; j < tabela0.length; j++) {
        saida = saida + '<tr>';

        for (k = 0; k < tabela0[j].length; k++) {
          if (tabela0[j][k] == '-') {
            td = 'td';
            j++;
          }

          if (tabela0[j][k] != '>>' && tabela0[j][k] != '..' && tabela0[j][k] != '#$#$') {
            if (tabela0[j][k].substring(0, 1) != '<') {
              saida = "".concat(saida, "<").concat(td, ">").concat(tabela0[j][k], "</").concat(td, ">");
            } else {
              saida = saida + tabela0[j][k];
            }
          }
        }

        saida = saida + '</tr>';
      }

      x[i] = saida + '</table>\n';
    }
  }

  x = x.join('');
  return x;
}

function marcou(x) {
  y = x.parentElement;

  if (y.classList.contains('alternativas')) {
    if (x.classList.contains('certa')) {
      x.classList.add('acertou');
      animacerto();
    } else {
      x.classList.add('errou');
    }

    if (y.getElementsByClassName('certa').length == y.getElementsByClassName('acertou').length) {
      y.classList.add('certo');
    }
  }

  continua(x);
}

function escolheu(x) {
  avo = x.parentElement.parentElement;
  alternativaescolhida = x.innerText;
  pergunta = Number(avo.id.replace('marc', ''));

  if (alternativaescolhida == resp[pergunta - 1][0]) {
    avo.innerHTML = alternativaescolhida;
    avo.classList.add('certo');
    avo.classList.remove('marc');
    avo.nextElementSibling.classList.remove('xis');
    animacerto();
    continua(avo);
  } else {
    x.style.backgroundColor = 'darkred';
    avo.nextElementSibling.classList.add('xis');
  }
}

function continua(x) {
  y = x.parentElement;

  while (y.tagName != 'SECTION') {
    y = y.parentElement;
  }

  confere(y);

  if (y.classList.contains('completo')) {
    y.nextElementSibling.style.display = 'block';
    botaocontinua(Array.from(document.getElementsByTagName('section')).indexOf(y) + 1);
    k = Array.from(document.getElementsByClassName('botaocontinua')).indexOf(x) + 1;

    if (localStorage.getItem('etapa') < k) {
      localStorage.setItem('etapa', k);
    }
  }
}

function confere(y) {
  ncomplete = y.getElementsByClassName('questao').length;
  ncerto = y.getElementsByClassName('certo').length;

  if (ncomplete == ncerto) {
    y.classList.add('completo');
  }
}

function zera(x) {
  x.value = '';
  x.style.backgroundColor = 'var(--cor9)';
}

function verifica(x) {
  resposta = x.value;
  pergunta = Number(x.id.replace('complete', ''));

  if (x.classList.contains('intervalo')) {
    iI = String(resp[pergunta - 1]).split('<<')[0];
    iF = String(resp[pergunta - 1]).split('<<')[1];

    if (resposta > iI && resposta < iF) {
      x.style.display = 'none';
      x.nextElementSibling.style.display = 'inline';
      x.nextElementSibling.textContent = resposta;
      x.nextElementSibling.classList.add('certo');
      animacerto();
      continua(x);
    } else {
      x.style.backgroundColor = 'darkred';
    }
  } else if (resp[pergunta - 1].includes(resposta)) {
    x.style.display = 'none';
    x.nextElementSibling.style.display = 'inline';
    x.nextElementSibling.textContent = resposta;
    x.nextElementSibling.classList.add('certo');
    animacerto();
    continua(x);
  } else {
    x.style.backgroundColor = 'darkred';
  }
}

function mostra(x) {
  x.getElementsByClassName('imgbotao')[0].style.display = 'none';
  x.getElementsByClassName('ocult')[0].classList.remove('ocult');
}

function botaocontinua(n) {
  sections = document.getElementsByTagName('SECTION');
  btncontinua = document.createElement('button');
  btncontinua.innerHTML = "Continuar";
  btncontinua.classList.add('botaocontinua');

  btncontinua.onclick = function (event) {
    this.previousElementSibling.classList.add('completo');
    this.nextElementSibling.style.display = 'block';
    this.style.display = 'none';
    botaocontinua(n + 1);
  };

  if (sections[n].nextElementSibling != null) {
    if (sections[n].nextElementSibling.tagName != 'BUTTON' && n != sections.length && (sections[n].getElementsByClassName('questao')[0] == null || sections[n].getElementsByClassName('completo')[0] != null)) {
      sections[n].parentNode.insertBefore(btncontinua, sections[n].nextElementSibling);
    }
  }
}

function dd() {
  divdds = document.getElementsByClassName('divdd');

  for (i = 0; i < divdds.length; i++) {
    conteudo2 = [];
    conteudo = String(divdds[i].innerHTML).split('[(');

    for (j = 1; j < conteudo.length; j++) {
      conteudo2.push("<sdrag draggable=\"true\" aria-label=\"Arraste-me para uma caixa\" data-balloon-pos=\"up\" ondragstart=\"dragstart_handler(event)\" ondragend=\"dragend_handler(event)\"class=\"s-drag\" id=\"drag".concat(i, "-").concat(j, "\">").concat(conteudo[j].split(')]')[0], "</sdrag>"));
      conteudo[j] = "<sdrop ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\" ondragleave=\"dragleave_handler(event)\" class=\"s-drop questao drop".concat(i, "-").concat(j, "\"></sdrop><span class=\"oc\">").concat(conteudo[j].split(')]')[0], "</span>").concat(conteudo[j].split(')]')[1]);
    }

    conteudo = conteudo.join('');
    conteudo2 = shuffleArr(conteudo2).join('');
    divdds[i].innerHTML = "<div class=\"divdrop\">".concat(conteudo, "</div><div class=\"divdrag\">").concat(conteudo2, "</div>");
  }

  alt = document.getElementsByClassName('alternativas');

  for (i = 0; i < alt.length; i++) {
    nli = alt[i].getElementsByTagName('li').length;

    if (nli > 10) {
      alt[i].classList.add('col3');
    } else if (nli > 5) {
      alt[i].classList.add('col2');
    }
  }
}

function shuffleArr(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var _ref = [array[rand], array[i]];
    array[i] = _ref[0];
    array[rand] = _ref[1];
  }

  return array;
}

function dragstart_handler(ev) {
  ev.currentTarget.setAttribute('data-balloon-h', '');
  ev.currentTarget.style.opacity = "0.2";
  ev.dataTransfer.setData("text", ev.target.id); // Tell the browser both copy and move are possible

  ev.effectAllowed = "move";
}

function dragover_handler(ev) {
  // Change the target element's border to signify a drag over event
  // has occurred
  ev.currentTarget.classList.add('drop-dragOver');
  ev.currentTarget.classList.remove('drop-dragOver-errou');
  ev.preventDefault();
}

function dragleave_handler(ev) {
  ev.currentTarget.classList.remove('drop-dragOver');
}

function drop_handler(ev) {
  ev.currentTarget.classList.remove('drop-dragOver');
  ev.preventDefault(); // Get the id of drag source element (that was added to the drag data
  // payload by the dragstart event handler)

  var id = document.getElementById(ev.dataTransfer.getData("text"));
  var di = ev.target.nextElementSibling.innerHTML; // Only Move the element if the source and destination ids are both "move"

  if (id.innerHTML == di) {
    ev.target.nextElementSibling.style.display = 'inline';
    ev.target.style.display = 'none';
    id.style.display = 'none';
    id.classList.add('certo');
    animacerto();
    continua(ev.currentTarget);
  } else {
    ev.currentTarget.classList.add('drop-dragOver-errou');
  }
}

function dragend_handler(ev) {
  // Restore source's border
  ev.currentTarget.style.opacity = "1"; // Remove all of the drag data

  ev.dataTransfer.clearData();
}

function savetxt() {
  var blob = new Blob([blocodenotas.innerText], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, "fonte.txt");
}

function savehtml() {
  varresp = "resp=[";

  for (i = 0; i < resp.length; i++) {
    varresp = varresp + "[";

    for (j = 0; j < resp[i].length; j++) {
      varresp = varresp + "'".concat(resp[i][j], "',");
    }

    varresp = varresp + "'".concat(resp[i][resp[i].length - 1], "'],");
  }

  varresp = varresp + "'']";
  var blob = new Blob(["".concat(antes + prefixo + entrada + posfixo, "<script>").concat(varresp, "</script>").concat(depois)], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, "index.html");
}

function indice() {
  sumario = '';
  elems = preview.getElementsByTagName('*');

  for (i = 0; i < elems.length; i++) {
    if (elems[i].tagName == 'H1' || elems[i].tagName == 'H2' || elems[i].tagName == 'H3') {
      sumario = sumario + '<div class="item"><div><div class="bolinha"></div></div>' + elems[i].outerHTML + '</div>';
    }
  }

  document.getElementById('sumario').innerHTML = "<div id='linha'></div> <div id=\"sumario2\">".concat(sumario, "</div>");
}

function scrola(x) {
  sum = document.getElementById('sumario2');

  if (x.scrollTop > 250) {
    sum.classList.add('azul');
    sum.classList.remove('verde');
    sum.classList.remove('rosa');
  } else {
    sum.classList.add('verde');
    sum.classList.remove('azul');
    sum.classList.remove('rosa');
  }
}
/*

function indice() {
    sumario = ''
    elems = preview.getElementsByTagName('*')
    for (i = 0; i < elems.length; i++) {
        if (elems[i].tagName == 'H1' || elems[i].tagName == 'H2' || elems[i].tagName == 'H3') {
            sumario = sumario + '<div class="item"><div><div class="bolinha"></div></div>' + elems[i].outerHTML + '</div>'
        }
    }
    document.getElementById('sumario').innerHTML = `<div id='btsumario' onclick='fecha()'></div><div id='linha'></div>` + sumario

}

function fecha() {
    mudaestilo('ml', '-1500px')
    mudaestilo('abr', '10px')

}

function abresumario() {
    mudaestilo('ml', '-250px')
    mudaestilo('abr', '-1000px')

}


function efeito(x) {
    if (document.documentElement.style.getPropertyValue('--dist') == "0px") {
        document.documentElement.style.setProperty('--dist', '100px')
        localStorage.setItem('etapa', '0')
        roda()
        x.textContent = 'desativar efeitos'
        blocodenotas.style.display = 'none'
        document.getElementsByClassName('botoesf')[0].style.display = 'none'

    } else {
        document.documentElement.style.setProperty('--dist', '0px')
        x.textContent = 'ativar efeitos'
        blocodenotas.style.display = 'block'
        document.getElementsByClassName('botoesf')[0].style.display = 'block'


    }
}



function savetxt() {
    var blob = new Blob([blocodenotas.innerText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "fonte.txt");
}

function savehtml() {
    varresp = `resp=[`
    for (i = 0; i < resp.length; i++) {
        varresp = varresp + `[`
        for (j = 0; j < resp[i].length; j++) {
            varresp = varresp + `'${resp[i][j]}',`
        }
        varresp = varresp + `'${resp[i][resp[i].length-1]}'],`
    }
    varresp = varresp + `'']`

    var blob = new Blob([`${antes + prefixo + entrada + posfixo}<script>${varresp}</script>${depois}`], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "index.html");
}



function cort(x) {
    x.nextElementSibling.value = x.value
    x.nextElementSibling.focus()
}

function corc(x) {
    document.getElementById(x.id + 't').value = x.value
}



function marcaiframe() {
    x = blocodenotas
    x.innerHTML = x.innerHTML.replaceAll('<p>iframe_', '<p class="iframe">iframe_')
    if (document.getElementsByClassName('iframe')[0] != null) {
        document.getElementsByClassName('iframe')[0].innerText = 'iframe_{' + code[0] + '}'
    }
}

function continua(x) {
    y = x.parentElement
    while (y.tagName != 'SECTION') {
        y = y.parentElement
    }
    confere(y)
    if (y.classList.contains('completo')) {
        y.nextElementSibling.style.display = 'block'
        y.getElementsByClassName('botaocontinua')[0].style.display = 'none'

        k = Array.from(document.getElementsByClassName('botaocontinua')).indexOf(x) + 1
        if (localStorage.getItem('etapa') < k) {
            localStorage.setItem('etapa', k)
        }
    }
    marca()
}

function confere(y) {
    ncomplete = y.getElementsByClassName('complete').length + y.getElementsByClassName('alternativas').length
    console.log(ncomplete);
    ncerto = y.getElementsByClassName('certo').length
    console.log(ncerto);
    if (ncomplete == ncerto) {
        y.classList.add('completo')
    }
}

function chamaiframe() {
    for (i = 0; i < code.length; i++) {
        document.getElementsByClassName('diviframe')[i].innerHTML = code[i]
    }
}

function iframe(x) {
    code = []
    a = x.split('<p>iframe{')
    for (i = 1; i < a.length; i++) {
        v = a[i].split(',')
        url = v[0]
        largura = v[1]
        altura = v[2].split('}')[0]
        a[i] = `<div class='iframediv'><iframe src="${url}" height="${altura}" width="${largura}"></iframe></div>` + a[i].replace(`${url},${largura},${altura}}</p>`, '')
    }
    a = a.join('')
    a = a.split('<p class="iframe">iframe_{')
    for (i = 1; i < a.length; i++) {
        code.push(a[i].split('}')[0].replaceAll('&lt;', '<').replaceAll('&gt;', '>'))
        a[i] = `<div class="diviframe">aqui vai um iframe</div>` + a[i].replace(`${a[i].split('}')[0]}}</p>`, '')
    }

    return a.join('')
}



function zera(x) {
    x.value = ''
    x.style.backgroundColor = 'rgb(2, 187, 2)'
}




function verifica(x) {
    resposta = x.value;
    pergunta = Number(x.id.replace('complete', ''))
    if (resp[pergunta - 1].includes(resposta)) {
        x.style.display = 'none';
        x.nextElementSibling.style.display = 'inline';
        x.nextElementSibling.textContent = resposta;
        x.nextElementSibling.classList.add('certo')
        continua(x)
    } else {
        x.style.backgroundColor = 'darkred';
    }

}




if (localStorage.getItem(texto).length > 40) {
    blocodenotas.innerHTML = localStorage.getItem(texto)
} else { blocodenotas.innerHTML = '<p>que isso?</p>' }

roda()



function abre(n) {
    for (i = 0; i <= n; i++) {
        if (document.getElementsByClassName('botaocontinua').length > 0) {
            document.getElementsByClassName('botaocontinua')[i].style.display = 'none'
        }
        if (document.getElementsByClassName('section').length > 0) {
            document.getElementsByTagName('section')[i].style.display = 'block'
        }
    }
    if (document.getElementsByClassName('botaocontinua').length > 0) {
        document.getElementsByClassName('botaocontinua')[n].style.display = 'inline'
    }
}

function roda() {

    entrada = blocodenotas.innerHTML.replaceAll('<span style="text-indent: 1.5em;">', '').replaceAll('</span>', '').replaceAll('</br>', '')
    localStorage.setItem(texto, entrada)
    entrada = entrada.replaceAll('div>', 'p>').replaceAll('<p>iframe_', '<p class="iframe">iframe_').replaceAll('<p>_</p>', `<button class='botaocontinua' onclick="continua(this)">Continuar</button></section><section style="display:none">`).replaceAll('\/\\', '</br>')
    let resp = []
    entrada = complete(entrada)
    let code = []
    entrada = iframe(entrada)


    entrada = link(entrada)
    entrada = tabela(entrada)
    entrada = imagem(entrada)


    preview.innerHTML = prefixo + entrada + posfixo
    chamaiframe()
    abre(localStorage.getItem('etapa'))
    indice()
    if (document.getElementsByClassName('item')[0] != null) {
        mudaestilo('hlinha', document.getElementsByClassName('item')[document.getElementsByClassName('item').length - 1].offsetTop + 'px')
    }
    if (document.getElementsByClassName('bolinha')[0] != null) {
        document.getElementsByClassName('bolinha')[0].classList.add('done')
    }
    renderMathInElement(preview, {
        delimiters: [{
            left: "$$",
            right: "$$",
            display: true
        }, { left: "\\[", right: "\\]", display: true }, { left: "$", right: "$", display: false }, { left: "\\(", right: "\\)", display: false }]
    })

}

function marca() {

} */
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51015" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/future.js"], null)
//# sourceMappingURL=/future.0248fc3b.js.map