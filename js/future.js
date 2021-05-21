var entrada
var texto = 'memoria'
var localestilo = 'estilo'
var prefixo = `<div id="bm" onscroll="scrola()"></div><div id="progressbar"></div><div id='cover' onmousedown="coverposition1()" onmousemove="coverposition2()" onmouseup="boler = false"></div><div id="ss"><div id="sumario"></div><div id="sections" onscroll="scrola()"><section onscroll="scrola()">`
var posfixo = "</section></div></div>"
var etapa = 'etapa'
var preview = document.getElementById('preview')
var blocodenotas = document.getElementById('blocodenotas')
var sumario = ''
var vetvar = {}
var estilo = JSON.parse(localStorage.getItem('estilo'))
if (estilo.dm == undefined) { var dm = false } else { var dm = estilo.dm }
if (estilo.corA == null) { var corA = '' } else { var corA = estilo.corA }
if (estilo.corB == null) { var corB = '' } else { var corB = estilo.corB }
if (estilo.font1 == null) { var font1 = '' } else { var font1 = estilo.font1 }
if (estilo.font2 == null) { var font2 = '' } else { var font2 = estilo.font2 }
if (estilo.imgcoverurl == null) { var imgcoverurl = '' } else { var imgcoverurl = estilo.imgcoverurl }
if (estilo.covery == null) { var covery = 0 } else { var covery = estilo.covery }

depois = `<script type="module"> import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.mjs"; renderMathInElement(document.body); renderMathInElement( document.body, { delimiters: [ {left: "$$", right: "$$", display: true}, {left: "\\[",right: "\\]", display: true}, {left: "$", right: "$", display: false}, {left: "\\(", right: "\\)", display: false} ] } ); document.addEventListener("DOMContentLoaded", function() { renderMathInElement(document.body, { strict: false }); }); </script><script src="https://lucasrosas.github.io/future/js/javas.js"></script><script>estilo = ${JSON.stringify(estilo)}</script></body></html>`

function inicia() {
    mudacor(estilo.corA, estilo.corB)
    setacores()
    roda()
    ajustacontraste()
    addImage(estilo.imgcoverurl)
    mudaestilo('font1', font1)
    mudaestilo('font2', font2)
    mudaestilo('covery', covery + 'px')

}

function animacerto() {
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'sgv',
        loop: false,
        autoplay: true,
        path: 'data.json'

    })
}

function animafim() {
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('end'),
        renderer: 'sgv',
        loop: true,
        autoplay: true,
        path: 'data.json'

    })
}


function roda() {
    entrada = myCodeMirror.getValue('\n')
    localStorage.setItem(texto, entrada)
    entrada = imagem(link(tabela(complete(variaveis(entrada)))))
    entrada = formatxt(entrada, '-d', '<div class="divdd">', '</div>')
    entrada = formatxt(entrada, '-#', '<ol>', '</ol>')
    entrada = formatxt(entrada, '-A', '<ol type=A>', '</ol>')
    entrada = formatxt(entrada, '-I', '<ol type=I>', '</ol>')
    entrada = formatxt(entrada, '-a', '<ol type="a">', '</ol>')
    entrada = formatxt(entrada, '-m', `<div class='alternativas questao'>`, `</div>`)
    entrada = formatxt(entrada, '***', '<u>', '</u>')
    entrada = formatxt(entrada, '**', '<i>', '</i>')
    entrada = formatxt(entrada, '*', '<strong>', '</strong>')

    // agora entrada vira um vetor.
    entrada = entrada.split('\n')
    entrada = tags(entrada)

    preview.innerHTML = prefixo + entrada + posfixo
    dd()


    renderMathInElement(preview, {
        delimiters: [{
            left: "$$",
            right: "$$",
            display: true
        }, { left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }]
    })
    indice()
    botaocontinua(0)


}

function tags(x) {
    for (i = 0; i < x.length; i++) {
        inicio = x[i].substring(0, 1)
        switch (inicio) {
            case '_':
                if (x[i] === '_') {
                    x[i] = `</section><section style="display: none">`
                }
                break

            case 'i':
                if (x[i].substring(0, 3) === 'img') {

                    x[i] = `<img class='esquerda' src='${x[i].split('img')[1].split(',')[0]}' height='${x[i].split('img')[1].split(',')[1]}'>`
                } else {
                    x[i] = `<p>${x[i]}</p>`
                }
                break
            case ' ':
                if (x[i].substring(0, 13) === '  img{oculta}') {
                    x[i] = `
                    <div class="divimgocult" onclick="mostra(this)">
                    <div class="imgbotao">Mostrar</div>
                    <img class="imgocult ocult" src="${x[i].split('  img{oculta}')[1].split(',')[0]}" height="${x[i].split('  img{oculta}')[1].split(',')[1]}"/></div>`
                } else if (x[i].substring(0, 6) === '   img') {
                    x[i] = `<img class='direita' src='${x[i].split('   img')[1]}'>`
                } else if (x[i].substring(0, 5) === '  img') {
                    x[i] = `<img class='centro' src='${x[i].split('  img')[1]}'>`
                } else if (x[i].substring(0, 4) === ' img') {
                    x[i] = `<img class='esquerda' src='${x[i].split('img')[1]}'>`
                } else if (x[i].substring(0, 3) === '   ') {
                    x[i] = `<p style="text-align: right; text-indent:0px">${x[i].split('   ')[1]}</p>`
                } else if (x[i].substring(0, 2) === '  ') {
                    x[i] = `<p style="text-align: center; text-indent:0px">${x[i].split('  ')[1]}</p>`
                } else {
                    x[i] = `<p>${x[i]}</p>`
                }
                break
            case '<':
                break
            case '#':
                if (x[i].substring(0, 3) === '###') {
                    x[i] = `<h3>${x[i].split('###')[1]}</h3>`
                } else if (x[i].substring(0, 2) === '##') {
                    x[i] = `<h2>${x[i].split('##')[1]}</h2>`
                } else {
                    x[i] = `<h1>${x[i].split('#')[1]}</h1>`
                }
                break
            case '-':
                if (x[i].substring(0, 2) === '--') {
                    x[i] = `<li class='certa' onclick='marcou(this)'>${x[i].split('--')[1]}</li>`
                } else {
                    x[i] = `<li onclick='marcou(this)'>${x[i].split('-')[1]}</li>`
                }
                break
            default:
                x[i] = `<p>${x[i]}</p>`


        }

    }
    return x.join('')

}

function variaveis(x) {
    vetvar = []
    calculos = []
    calqulos = []
    a = x.split("${")
    for (i = 1; i < a.length; i++) {
        vari = a[i].split('}')[0]
        if (vari.substring(0, 1) == 'x' && !isNaN(Number(vari.replace('x', '')))) {
            vetvar.push(eval(`${vari} = 0`))
            a[i] = a[i].replace(vari + '}', `<input class='var' id='${vari}' onchange="calcula(this)">`)
        } else {
            vetvar.push(NaN)
            a[i] = a[i].replace(vari + '}', `<span class='ERR'>NOME INVÁLIDO PARA INCÓGNITA</span>`)
        }
    }
    a = a.join('')
    a = a.split("$={")
    for (i = 1; i < a.length; i++) {
        calc = a[i].split('}')[0]
        calculos.push(`eval(Math.max(${calc}))`)
        a[i] = a[i].replace(calc + '}', `<span class='svar svarvazia'></span>`)
    }
    a = a.join('')
    a = a.split("$?={")
    for (i = 1; i < a.length; i++) {
        calq = a[i].split('}')[0]
        calqulos.push(`eval(Math.max(${calq}))`)
        a[i] = a[i].replace(calq + '}', `<span class='qsvar questao'></span>`) /* continuar daqui */
    }
    a = a.join('')
    return a
}

function calcula(x) {
    eval(`${x.id} = ${Number(String(x.value).replace(',','.'))}`)
    svar = document.getElementsByClassName('svar')
    for (i = 0; i < svar.length; i++) {
        if (!isNaN(eval(calculos[i]))) {
            svar[i].innerHTML = String(eval(calculos[i])).replace('.', ',')
            svar[i].classList.remove('svarvazia')
        } else {
            svar[i].classList.add('svarvazia')
            svar[i].innerHTML = ''
        }
    }

    qsvar = document.getElementsByClassName('qsvar')
    for (i = 0; i < qsvar.length; i++) {
        if (!isNaN(eval(calqulos[i]))) {
            if (eval(calqulos[i]) == 1) {
                qsvar[i].classList.add('certo')
                continua(x)

            }

        } else {
            qsvar[i].innerHTML = ''
        }
    }

}



function complete(x) {
    a = x.split('[[')
    resp = []
    ii = 0

    for (i = 1; i < a.length; i++) {
        me = false
        intervalo = false
        k = -1
        certas = a[i].split(']]')[0].split('|')
        largura = 0
        for (j = 0; j < certas.length; j++) {
            if (certas[j].substring(0, 1) == '[') {
                me = true
                k = j
            }
            if (largura < certas[j].length) {
                largura = certas[j].length
            }
            if (certas[j].includes('<<')) {
                intervalo = true
            }

        }
        if (me) {

            certas[k] = certas[k].replace('[', '').replace(']', '')
            a[i] = `<marc class='marc questao' id="marc${i}" onmouseover="posiciona(this)">???<span class='me'><span onclick='escolheu(this)'>${certas.join("</span><span onclick='escolheu(this)'>")}</span></marc><span class='spanx'">X</span>` + a[i].replace(a[i].split(']]')[0] + ']]', '')
            resp.push([certas[k]])

        } else if (intervalo) {
            a[i] = `<input class='complete questao intervalo' type="text" name ="complete" size="${largura}" id="complete${i}" value="???" onclick = "zera(this)" onchange = "verifica(this)"> <span class='spanx'">:</span>` + a[i].replace(a[i].split(']]')[0] + ']]', '')
            resp.push(certas)

        } else {


            a[i] = `<input class='complete questao' type="text" name ="complete" size="${largura}" id="complete${i}" value="???" onclick = "zera(this)" onchange = "verifica(this)"> <span class='spanx'">:</span>` + a[i].replace(a[i].split(']]')[0] + ']]', '')
            resp.push(certas)
        }
    }

    x = a.join('')

    return x
}

function formatxt(x, sinal, antes, depois) {
    if (sinal.substring(0, 1) != '-') {
        x = x.split(sinal)
        for (i = 1; i < x.length; i++) {
            if (i % 2 == 1) {
                x[i] = antes + x[i] + depois
            }
        }
    } else {
        x = x.split('\n' + sinal + '\n')

        for (i = 1; i < x.length; i++) {
            if (i % 2 == 1) {
                x[i] = antes + '\n' + x[i] + depois + '\n'
            }
        }
    }
    return x.join('')

}

function imagem(x) {
    x = x.split('img_')

    for (i = 1; i < x.length; i++) {
        url = x[i].split(',')[0]
        altura = x[i].split(',')[1].split('_!')[0]
        x[i] = `<img src="${url}" class="imgmiddle" dragable="false" style="height: ${altura}">${x[i].split('_!')[1]}`
    }
    return x.join('')
}

function link(x) {
    x = x.split('~')
    for (i = 1; i < x.length; i++) {
        if (i % 2 == 1) {
            if (x[i].split('[')[1] != null) {
                a = x[i].substring(0, x[i].indexOf('['))
                b = x[i].substring(x[i].indexOf('[') + 1)
                c = b.substring(0, b.length - 1)
                x[i] = `<def onmouseover="posiciona(this)">${a}<span class="def">${c}</span></def>`
            } else {
                x[i] = '<a href="' + x[i].replace(',', '" target="_blank">') + '</a>'
            }
        }
    }
    return x.join('')
}

function tabela(x) {
    x = x.split('-t\n')
    for (i = 0; i < x.length; i++) {

        if (i % 2 == 1) {
            table = x[i].split('\n')
            tabela0 = []
            for (j = 0; j < table.length - 1; j++) {
                tabela0.push(table[j])
                tabela0[j] = tabela0[j].split('|')
            }
            for (j = 1; j < tabela0.length; j++) {
                for (k = 0; k < tabela0[j].length; k++) {
                    if (tabela0[j][k] == '..') {
                        g = 2
                        f = 1
                        while (j + f < tabela0.length && tabela0[j + f][k] == '..') {
                            g = g + f
                            tabela0[j + f][k] = '#$#$'
                            f++
                        }
                        if (j == 1) {
                            tabela0[j - 1][k] = '<th rowspan="' + g + '">' + tabela0[j - 1][k] + '</th>'
                        } else {
                            tabela0[j - 1][k] = '<td rowspan="' + g + '">' + tabela0[j - 1][k] + '</td>'
                        }
                    }

                }
            }

            for (j = 0; j < tabela0.length; j++) {
                for (k = 1; k < tabela0[j].length; k++) {
                    if (tabela0[j][k] == '>>') {
                        g = 2
                        f = 1
                        while (k + f < tabela0[j].length && tabela0[j][k + f] == '>>') {
                            g = g + f
                            tabela0[j][k + f] = '#$#$'
                            f++
                        }
                        if (j == 0) {
                            tabela0[j][k - 1] = '<th colspan="' + g + '">' + tabela0[j][k - 1] + '</th>'
                        } else {
                            tabela0[j][k - 1] = '<td colspan="' + g + '">' + tabela0[j][k - 1] + '</td>'
                        }
                    }

                }
            }
            saida = '<table>'
            td = 'th'
            for (j = 0; j < tabela0.length; j++) {
                saida = saida + '<tr>'
                for (k = 0; k < tabela0[j].length; k++) {
                    if (tabela0[j][k] == '-') {
                        td = 'td'
                        j++
                    }
                    if (tabela0[j][k] != '>>' && tabela0[j][k] != '..' && tabela0[j][k] != '#$#$') {
                        if (tabela0[j][k].substring(0, 1) != '<') {
                            saida = `${saida}<${td}>${tabela0[j][k]}</${td}>`
                        } else {
                            saida = saida + tabela0[j][k]
                        }
                    }
                }
                saida = saida + '</tr>'
            }
            x[i] = saida + '</table>\n'

        }

    }


    x = x.join('')
    return x
}


function marcou(x) {
    y = x.parentElement
    if (y.classList.contains('alternativas')) {

        if (x.classList.contains('certa')) {
            x.classList.add('acertou')

        } else {
            x.classList.add('errou')
        }
        if (y.getElementsByClassName('certa').length == y.getElementsByClassName('acertou').length) {
            y.classList.add('certo')
        }
    }
    continua(x)

}

function escolheu(x) {
    avo = x.parentElement.parentElement

    alternativaescolhida = x.innerText
    pergunta = Number(avo.id.replace('marc', ''))
    if (alternativaescolhida == resp[pergunta - 1][0]) {
        avo.innerHTML = alternativaescolhida
        avo.classList.add('certo')
        avo.classList.remove('marc')
        avo.nextElementSibling.classList.remove('xis')
        continua(avo)
    } else {
        x.style.backgroundColor = 'darkred'
        avo.nextElementSibling.classList.add('xis')

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
        botaocontinua(Array.from(document.getElementsByTagName('section')).indexOf(y) + 1)
        k = Array.from(document.getElementsByClassName('botaocontinua')).indexOf(x) + 1

        if (localStorage.getItem('etapa') < k) {
            localStorage.setItem('etapa', k)
        }
    }
}

function confere(y) {
    ncomplete = y.getElementsByClassName('questao').length
    ncerto = y.getElementsByClassName('certo').length
    if (ncomplete == ncerto) {
        y.classList.add('completo')
    }
}

function zera(x) {
    x.value = ''
    x.style.backgroundColor = 'var(--cor9)'
}




function verifica(x) {
    resposta = x.value;
    pergunta = Number(x.id.replace('complete', ''))
    if (x.classList.contains('intervalo')) {
        iI = String(resp[pergunta - 1]).split('<<')[0]
        iF = String(resp[pergunta - 1]).split('<<')[1]

        if (resposta > iI && resposta < iF) {
            x.style.display = 'none';
            x.nextElementSibling.style.display = 'inline';
            x.nextElementSibling.textContent = resposta;
            x.nextElementSibling.classList.add('certo')
            continua(x)
        } else { x.style.backgroundColor = 'darkred'; }
    } else if (resp[pergunta - 1].includes(resposta)) {
        x.style.display = 'none';
        x.nextElementSibling.style.display = 'inline';
        x.nextElementSibling.textContent = resposta;
        x.nextElementSibling.classList.add('certo')
        continua(x)
    } else {
        x.style.backgroundColor = 'darkred';
    }

}

function mostra(x) {
    x.getElementsByClassName('imgbotao')[0].style.display = 'none'
    x.getElementsByClassName('ocult')[0].classList.remove('ocult')
}


function botaocontinua(n) {
    sections = document.getElementsByTagName('SECTION')
    if (n + 1 == sections.length) {
        var divfim = document.createElement('div')
        divfim.setAttribute("id", "end");
        sections[n].parentNode.insertBefore(divfim, sections[n].nextElementSibling)
        animafim()
    }
    btncontinua = document.createElement('button')
    btncontinua.innerHTML = "Continuar"
    btncontinua.classList.add('botaocontinua')
    btncontinua.onclick = function(event) {
        this.previousElementSibling.classList.add('completo')
        this.nextElementSibling.style.display = 'block'
        this.style.display = 'none'

        botaocontinua(n + 1)

    }
    if (sections[n].nextElementSibling != null) {
        if (sections[n].nextElementSibling.tagName != 'BUTTON' && n != sections.length && (sections[n].getElementsByClassName('questao')[0] == null || sections[n].getElementsByClassName('completo')[0] != null)) {
            sections[n].parentNode.insertBefore(btncontinua, sections[n].nextElementSibling)
        }
    }
}

function dd() {
    divdds = document.getElementsByClassName('divdd')
    for (i = 0; i < divdds.length; i++) {
        conteudo2 = []
        conteudo = String(divdds[i].innerHTML).split('[(')
        for (j = 1; j < conteudo.length; j++) {
            conteudo2.push(`<sdrag draggable="true" aria-label="Arraste-me para uma caixa" data-balloon-pos="up" ondragstart="dragstart_handler(event)" ondragend="dragend_handler(event)"class="s-drag" id="drag${i}-${j}">${conteudo[j].split(')]')[0]}</sdrag>`)
            conteudo[j] = `<sdrop ondrop="drop_handler(event)" ondragover="dragover_handler(event)" ondragleave="dragleave_handler(event)" class="s-drop questao drop${i}-${j}"></sdrop><span class="oc">${conteudo[j].split(')]')[0]}</span>${conteudo[j].split(')]')[1]}`
        }
        conteudo = conteudo.join('')
        conteudo2 = shuffleArr(conteudo2).join('')
        divdds[i].innerHTML = `<div class="divdrop">${conteudo}</div><div class="divdrag">${conteudo2}</div>`
    }

    alt = document.getElementsByClassName('alternativas')
    for (i = 0; i < alt.length; i++) {
        nli = alt[i].getElementsByTagName('li').length
        if (nli > 10) {
            alt[i].classList.add('col3')
        } else if (nli > 5) {
            alt[i].classList.add('col2')
        }
    }


}

function shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array
}

function dragstart_handler(ev) {
    ev.currentTarget.setAttribute('data-balloon-h', '')
    ev.currentTarget.style.opacity = "0.2";
    ev.dataTransfer.setData("text", ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "move";
}

function dragover_handler(ev) {
    // Change the target element's border to signify a drag over event
    // has occurred
    ev.currentTarget.classList.add('drop-dragOver')
    ev.currentTarget.classList.remove('drop-dragOver-errou')

    ev.preventDefault();
}

function dragleave_handler(ev) {
    ev.currentTarget.classList.remove('drop-dragOver')


}

function drop_handler(ev) {
    ev.currentTarget.classList.remove('drop-dragOver')


    ev.preventDefault();
    // Get the id of drag source element (that was added to the drag data
    // payload by the dragstart event handler)
    var id = document.getElementById(ev.dataTransfer.getData("text"))
    var di = ev.target.nextElementSibling.innerHTML
        // Only Move the element if the source and destination ids are both "move"
    if (id.innerHTML == di) {
        ev.target.nextElementSibling.style.display = 'inline'
        ev.target.style.display = 'none'
        id.style.display = 'none'
        id.classList.add('certo')
        continua(ev.currentTarget)
    } else {
        ev.currentTarget.classList.add('drop-dragOver-errou')
    }
}

function dragend_handler(ev) {
    // Restore source's border
    ev.currentTarget.style.opacity = "1";
    // Remove all of the drag data
    ev.dataTransfer.clearData();
}






function indice() {
    sumario = ``
    elems = preview.getElementsByTagName('*')
    k = 0
    for (i = 0; i < elems.length; i++) {
        if (elems[i].tagName == 'H1' || elems[i].tagName == 'H2' || elems[i].tagName == 'H3') {
            elems[i].id = `hk${k}`
            if (elems[i].tagName == 'H1') {
                sumario = `${sumario}<a href='#hk${k}'><div class='sh1' >${elems[i].innerHTML}</div></a>`
            } else if (elems[i].tagName == 'H2') {
                sumario = `${sumario}<a href='#hk${k}'><div class='sh2' >${elems[i].innerHTML}</div></a>`
            } else {
                sumario = `${sumario}<a href='#hk${k}'><div class='sh3' >${elems[i].innerHTML}</div></a>`
            }
            k++


        }
    }
    document.getElementById('sumario').innerHTML = `<div id='btsumarioa' onclick='abresumario()'><i class="fas fa-bars"></i></div> <div id="sumario2">${sumario}<div id="btlibera">Abrir todas as seções</div></div>`

}


function scrola(x) {
    sum = document.getElementById('sumario2')
    bts = document.getElementById('btsumarioa')
    document.documentElement.style.setProperty('--wbar', `${x.scrollTop / preview.getElementsByTagName('p').length}% `);
    if (x.scrollTop > 250) {
        sum.classList.add('azul')
        bts.classList.add('btsazul')

    } else {
        sum.classList.remove('azul')
        bts.classList.remove('btsazul')

    }
}



function abresumario() {

    if (document.getElementById('btsumarioa').innerHTML == `<i class="fas fa-bars" aria-hidden="true"></i>`) {
        document.getElementById('sections').classList.add("sectionsr")
        document.getElementById('sumario2').classList.add("sumarioaberto")
        document.getElementById('btsumarioa').innerHTML = '<i class="fas fa-times"></i>'
        document.getElementById('btsumarioa').classList.add('fechar')
    } else {
        document.getElementById('btsumarioa').innerHTML = '<i class="fas fa-bars"></i>'
        document.getElementById('sections').classList.remove("sectionsr")
        document.getElementById('sumario2').classList.remove("sumarioaberto")
        document.getElementById('btsumarioa').classList.remove('fechar')
    }
}

function titulo(x) {
    title = x.innerText
    console.log(title);
}


function savetxt() {
    var blob = new Blob([myCodeMirror.getValue('\n')], { type: "text/plain;charset=utf-8" });
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

    var blob = new Blob([`${antes + preview.innerHTML + posfixo}<script>${varresp}</script>${depois}`], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "index.html");
}


function altura() {
    let alturaf = document.documentElement.clientHeight
    let altura = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    a = window.pageYOffset
    b = altura - alturaf + 1
    c = 100 * a / 14915
    document.getElementById('progressbar').style.width = c + '%'
}




window.onscroll = function() { altura() };