function verifica(x) {
    respostaaluno = x.value
    resposta = x.value.replaceAll(',', '.');
    pergunta = Number(x.id.replace('complete', ''))
    if (resp[pergunta - 1].includes(resposta)) {
        x.style.display = 'none';
        x.nextElementSibling.style.display = 'inline';
        x.nextElementSibling.textContent = respostaaluno;
    } else {
        x.style.backgroundColor = 'darkred';
    }
}
var dm = false

function coverposition1() {}

function coverposition2() {}

function inicia() {
    mudacor(estilo.corA, estilo.corB)
    mudaestilo('covery', estilo.covery)
    var dm = estilo.dm
    mudaestilo('font1', estilo.font1)
    mudaestilo('font2', estilo.font2)
    mudaestilo('imgcoverurl', estilo.imgcoverurl)
}

function mudaestilo(a, b) {

    document.documentElement.style.setProperty('--' + a, b);
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


function scrola() {
    sum = document.getElementById('sumario2')
    bts = document.getElementById('btsumarioa')
    if (document.documentElement.scrollTop > 200) {
        sum.classList.add('azul')
        bts.classList.add('btsazul')

    } else {
        sum.classList.remove('azul')
        bts.classList.remove('btsazul')

    }
}

function posiciona(m) {

    x = m.getBoundingClientRect().left
    y = m.getBoundingClientRect().top + 20
    mudaestilo('leftdef', x + 'px')
    mudaestilo('topdef', y + 'px')
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