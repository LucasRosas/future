// Código dos botões na barra de ferramentas

function code_sh() {
    document.getElementById('blocodenotas').style.width = '50%'
}


function code_hi() {

    if (document.getElementById('configuracoes').classList.contains('ativo')) { config() }
    document.getElementById('blocodenotas').style.width = '0px'



}

function configuracoes() {}

boler = false

function mudaestilo(a, b) {
    if (a == 'font1') {
        font1 = b
    }
    if (a == 'font2') {
        font2 = b
    }
    document.documentElement.style.setProperty('--' + a, b);
    estilo = { corA: corA, corB: corB, dm: dm, imgcoverurl: imgcoverurl, covery: covery, font1: font1, font2: font2 }
    localStorage.setItem(localestilo, JSON.stringify(estilo))
    depois = `<script type="module"> import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.mjs"; renderMathInElement(document.body); renderMathInElement( document.body, { delimiters: [ {left: "$$", right: "$$", display: true}, {left: "\\[",right: "\\]", display: true}, {left: "$", right: "$", display: false}, {left: "\\(", right: "\\)", display: false} ] } ); document.addEventListener("DOMContentLoaded", function() { renderMathInElement(document.body, { strict: false }); }); </script><script src="https://lucasrosas.github.io/future/js/javas.js"></script><script>estilo = ${JSON.stringify(estilo)}</script></body></html>`
}

function cornome(x) {
    x.nextElementSibling.value = x.value
    x.nextElementSibling.style.color = x.value
    mudaestilo(x.id, x.value)
    ajustacontraste()

}

function setacores() {
    x = document.getElementsByClassName('cor')
    for (i = 0; i < x.length; i++) {
        if (estilo[x[i].id] != null) {
            x[i].value = estilo[x[i].id]
        }

    }
}

function ajustacontraste() {
    x = document.getElementsByClassName('cor')
    for (i = 0; i < x.length; i++) {
        mudaestilo(x[i].id + 'd', chroma(x[i].value).darken(2).hex())
        if (chroma.contrast(x[i].value, '#000000') >= 6) {
            mudaestilo(x[i].id + 'c', '#000000')
        } else {
            mudaestilo(x[i].id + 'c', '#ffffff')
        }
    }
}


function darkmode() {
    if (dm == true) {
        dm = false
    } else {
        dm = true
    }
    if (corA == '') {
        mudacor('#023e8a', '#81b29a')
    } else {
        mudacor(corA, corB)
    }
}
var vetcor

function mudacor(a, b) {
    if (a == '' && b == '') {

    } else {
        if (chroma.contrast('black', a) > chroma.contrast('black', b)) {
            corA = b
            corB = a
        } else {
            corA = a
            corB = b
        }
        vetcor = {
            cor1: corA,
            cor2: corB,
            cor3: chroma(corA).desaturate(3).hex(),
            cor4: chroma(corB).saturate(2).hex(),
            cor5: chroma(corB).desaturate(2).hex(),
            cor6: chroma(corA).saturate(2).hex(),
            cor7: chroma.blend(corA, corB, 'lighten').hex(),
            cor8: chroma.mix(corA, corB, 0.1, 'lch').brighten(2.5).hex(),
            cor9: chroma.blend(corA, corB, 'lighten').hex(),
            cor10: chroma.average([corA, '#bcd53f', '#5FD274', '#5FD274', '#bcd53f'], 'rgb').hex(),
        }
    }

    for (var prop in vetcor) {
        mudaestilo(prop, vetcor[prop])
    }
    if (dm) {
        mudaestilo('cor0', 'white')
        mudaestilo('corback', '#1F2937')
        for (var prop in vetcor) {
            mudaestilo(prop, chroma(vetcor[prop]).luminance(0.5).hex())
            mudaestilo(prop + 'd', chroma(vetcor[prop]).luminance(0.5).darken().hex())
            mudaestilo(prop + 'ds', chroma(vetcor[prop]).luminance(0.5).darken(2).hex())

            if (chroma.contrast(vetcor[prop], '#000000') >= 5) {
                mudaestilo(prop + 'c', '#000000')
            } else {
                mudaestilo(prop + 'c', '#ffffff')
            }
        }
    } else {
        mudaestilo('cor0', 'black')
        mudaestilo('corback', 'white')
        for (var prop in vetcor) {
            mudaestilo(prop, vetcor[prop])
            mudaestilo(prop + 'd', chroma(vetcor[prop]).darken().hex())
            mudaestilo(prop + 'dd', chroma(vetcor[prop]).darken(2).hex())

            if (chroma.contrast(vetcor[prop], '#000000') >= 5) {
                mudaestilo(prop + 'c', '#000000')
            } else {
                mudaestilo(prop + 'c', '#ffffff')
            }
        }
    }

}

var imageHeight = 0
var image = new Image();

var boler = false
var dist = 0
var e = window.event;



/* function coord() {
    var e = window.event;
    mudaestilo('cy', e.clientY + 'px')
    mudaestilo('cx', e.clientX + 'px')
    document.getElementById('coord').innerText = e.clientX + ', ' + e.clientY
} */

function addImage(x) {
    mudaestilo('imgcoverurl', x)
    imgcoverurl = x
    image.src = x.split('url(')[1].replace(')', '')
    if (image.width > 0) {
        imageHeight = window.innerWidth * image.height / image.width
    } else { imageHeight = image.height }
    boler = false
    roda()
}


function coverposition1() {
    code_hi()
    var e = window.event;
    boler = true
    posy1 = e.clientY - covery;
    mudaestilo('covery', covery + 'px')
}

function coverposition2() {

    var e = window.event;
    if (boler) {
        posy2 = e.clientY
        covery = Math.min(Math.max(posy2 - posy1, 350 - imageHeight), 0)
        mudaestilo('covery', covery + 'px')
    }
}

function posiciona(m) {

    x = m.getBoundingClientRect().left
    y = m.getBoundingClientRect().top + 20
    mudaestilo('leftdef', x + 'px')
    mudaestilo('topdef', y + 'px')
}

function corvalor(x) {
    document.getElementById('c' + x.id).value = x.value
    mudaestilo('c' + x.id, x.value)
    ajustacontraste()
}


function config() {
    x = document.getElementById('configuracoes')
    b = blocodenotas
    a = document.getElementsByClassName('botoesf')

    if (x.classList.contains('desativo')) {
        x.classList.remove('desativo')
        x.classList.add('ativo')
        code_sh()
    } else {
        fechaconfig()

    }
}

function fechaconfig() {
    document.getElementById('configuracoes').classList.remove('ativo')
    document.getElementById('configuracoes').classList.add('desativo')
}

function bold() {
    if (myCodeMirror.getSelection() == '') {
        selecionapalavra()
        bold()
    } else {
        if ((myCodeMirror.getSelection().split('*')).length % 2 == 0) {
            myCodeMirror.replaceSelection('*' + myCodeMirror.getSelection().replaceAll('*', ''));
        } else {
            myCodeMirror.replaceSelection('*' + myCodeMirror.getSelection().replaceAll('*', '') + '*');
        }
    }
    roda()
}



function italic() {

}

function sublinhado() {}

function h1() {
    myCodeMirror.setSelection({ line: 6, ch: 0 }, { line: 7, ch: 0 })
    myCodeMirror.replaceSelection('#' + myCodeMirror.getSelection());
    roda()
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

    b1 = myCodeMirror.findWordAt({ line: a1, ch: a2 }).anchor.ch;
    b2 = myCodeMirror.findWordAt({ line: a1, ch: a2 }).head.ch;

    myCodeMirror.extendSelection({ line: a1, ch: b1 }, { line: a1, ch: b2 }, false);
}