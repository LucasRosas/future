// Código dos botões na barra de ferramentas



var estilo = {}

function configuracoes() { }

boler = false

function mudaestilo(a, b) {
    document.documentElement.style.setProperty('--' + a, b);
    estilo[a] = b
    localStorage.setItem(localestilo, JSON.stringify(estilo))
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
        mudaestilo(x[i].id + 'd', chroma(x[i].value).darken().hex())
        if (chroma.contrast(x[i].value, '#000000') >= 6) {
            mudaestilo(x[i].id + 'c', '#000000')
        } else {
            mudaestilo(x[i].id + 'c', '#ffffff')
        }
    }
}

var imageHeight = 0
var image = new Image();
var covery = 0
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

    image.src = x.split('url(')[1].replace(')', '')
    if (image.width > 0) {
        imageHeight = window.innerWidth * image.height / image.width
    } else { imageHeight = image.height }
    boler = false
    roda()
}


function coverposition1() {
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

function sublinhado() { }

function h1() {
    myCodeMirror.setSelection({ line: 6, ch: 0 }, { line: 7, ch: 0 })
    myCodeMirror.replaceSelection('#' + myCodeMirror.getSelection());
    roda()
}


function h2() { }


function h3() { }

function justificado() { }

function centraliza() { }

function alinhadodireita() { }

function lista() { }

function listaordenada() { }

function link() { }

function imagem() { }

function tabela() { }

function multiplaescolha() { }

function completaespaco() { }

function baixartxt() { }

function abrirlivro() { }

function compartilharlivro() { }

function selecionapalavra() {
    a1 = myCodeMirror.getCursor().line;
    a2 = myCodeMirror.getCursor().ch;

    b1 = myCodeMirror.findWordAt({ line: a1, ch: a2 }).anchor.ch;
    b2 = myCodeMirror.findWordAt({ line: a1, ch: a2 }).head.ch;

    myCodeMirror.extendSelection({ line: a1, ch: b1 }, { line: a1, ch: b2 }, false);
}