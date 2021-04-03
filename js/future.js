var entrada
var texto = 'memoria'
var prefixo = `<section class='completo'>`
var posfixo = '</section>'
var etapa = 'etapa'
var efeitos = true


function efeito(x) {
    if (efeitos) {
        efeitos = false
        x.textContent = 'desativar efeitos'
        localStorage.setItem('etapa', 0)
        mudaestilo('dist', '100px')
        roda()
    } else {
        efeitos = true;
        x.textContent = 'ativar efeitos'
        mudaestilo('dist', '0px')
    }
    console.log(efeitos);
}

function cornome(x) {
    x.nextElementSibling.value = x.value
    x.nextElementSibling.style.color = x.value
    mudaestilo(x.id, x.value)
}

function corvalor(x) {
    document.getElementById('c' + x.id).value = x.value
}

function savetxt() {
    var blob = new Blob([document.getElementById('blocodenotas').innerText], { type: "text/plain;charset=utf-8" });
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

function ajustar() {
    roda()
    x = document.getElementById('blocodenotas')
    x.innerHTML = '<p>' + x.innerText.replaceAll('<br>', '</p><p>').replaceAll('\n', '</p><p>').replaceAll('div>', 'p>')
    marcaiframe()
    roda()
}

function config(y) {
    x = document.getElementById('configuracoes')
    a = document.getElementsByClassName('botoesf')

    if (y.innerText === 'configurações') {
        y.innerText = 'Salvar e fechar'
        x.classList.remove('desativo')
        x.classList.add('ativo')
        y.style.backgroundColor = 'rgba(190, 62, 62, 0.3)'

    } else {
        y.innerText = 'configurações'
        x.classList.add('desativo')
        x.classList.remove('ativo')


        y.style.backgroundColor = 'rgba(58, 58, 58, 0.3)'

    }

}

function cort(x) {
    x.nextElementSibling.value = x.value
    x.nextElementSibling.focus()
}

function corc(x) {
    document.getElementById(x.id + 't').value = x.value
}



function marcaiframe() {
    x = document.getElementById('blocodenotas')
    x.innerHTML = x.innerHTML.replaceAll('<p>iframe_', '<p class="iframe">iframe_')
    document.getElementsByClassName('iframe')[0].innerText = 'iframe_{' + code[0] + '}'

}

function continua(x) {
    confere(x)
    if (x.parentElement.classList.contains('completo')) {
        x.parentElement.nextElementSibling.style.display = 'block'
        x.style.display = 'none'
        k = Array.from(document.getElementsByClassName('botaocontinua')).indexOf(x) + 1
        console.log(k);
        if (localStorage.getItem('etapa') < k) {
            localStorage.setItem('etapa', k)
        }
    } else {
        alert('Complete todas as Quests para continuar')
    }
}

function confere(x) {
    ncomplete = x.parentElement.getElementsByClassName('complete').length
    ncerto = x.parentElement.getElementsByClassName('certo').length
    if (ncomplete == ncerto) {
        x.parentElement.classList.add('completo')
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

function complete(x) {
    a = x.split('*(')
    resp = []

    for (i = 1; i < a.length; i++) {
        certas = a[i].split(')*')[0].split(',')
        largura = 0
        for (j = 0; j < certas.length; j++) {
            if (largura < certas[j].length) {
                largura = certas[j].length
            }
        }

        a[i] = `<input class='complete' type="text" name ="complete" size="${largura}" id="complete${i}" value="???" onclick = "this.value=''" onchange = "verifica(this)"> <span class='spanx'">:</span>` + a[i].replace(a[i].split(')*')[0] + ')*', '')
        resp.push(certas)
    }

    x = a.join('')

    return x
}

function verifica(x) {
    resposta = x.value;
    pergunta = Number(x.id.replace('complete', ''))
    if (resp[pergunta - 1].includes(resposta)) {
        x.style.display = 'none';
        x.nextElementSibling.style.display = 'inline';
        x.nextElementSibling.textContent = resposta;
        x.nextElementSibling.classList.add('certo')
    } else {
        x.style.backgroundColor = 'darkred';
    }
}

function tag(x, sinal, inicio, fim) {
    x = x.split('<p>' + sinal)
    for (i = 1; i < x.length; i++) {
        x[i] = x[i].replace('</p>', fim)
    }
    return x.join(inicio)
}

function imagem(x) {
    x = x.split('img_')
    for (i = 1; i < x.length; i++) {
        x[i] = x[i].replace('_!', '">')
    }

    return x.join('<img class="imgmiddle" src="')

}



function txt(x, tag, inicio, fim) {
    x = x.split(tag)
    for (i = 1; i < x.length; i++) {
        if (i % 2 == 1) {
            x[i] = inicio + x[i] + fim
        }
    }
    return x.join('')
}

function link(x) {
    x = x.split('~')
    for (i = 1; i < x.length; i++) {
        if (i % 2 == 1) {
            x[i] = x[i].replace(',', '" target="_blank">')
            x[i] = '<a href="' + x[i] + '</a>'
        }
    }
    return x.join('')
}

function tabela(x) {
    x = x.split('<p>||</p>')
    for (i = 1; i < x.length; i++) {
        if (i % 2 == 1) {
            x[i] = '<table>' + x[i] + '</table>'

        }
    }
    x = x.join('').replaceAll('<p>|', '<tr><td>').replaceAll('|</p>', '</td></tr>').replaceAll('|', '</td><td>')
    return x
}

if (localStorage.getItem(texto).length > 40) {
    document.getElementById('blocodenotas').innerHTML = localStorage.getItem(texto)
} else { document.getElementById('blocodenotas').innerHTML = '<p>que isso?</p>' }

roda()


function mudaestilo(a, b) {
    document.documentElement.style.setProperty('--' + a, b);

}

function abre(n) {
    console.log(n);
    for (i = 0; i <= n; i++) {
        document.getElementsByClassName('botaocontinua')[i].style.display = 'none'
        document.getElementsByTagName('section')[i].style.display = 'block'
    }
    document.getElementsByClassName('botaocontinua')[n].style.display = 'inline'
}


function roda() {
    entrada = document.getElementById('blocodenotas').innerHTML.replaceAll('<span style="text-indent: 1.5em;">', '').replaceAll('</span>', '')
    localStorage.setItem(texto, entrada)
    entrada = entrada.replaceAll('div>', 'p>').replaceAll('<p>iframe_', '<p class="iframe">iframe_').replaceAll('<p>_</p>', `<button class='botaocontinua' onclick="continua(this)">Continuar</button></section><section style="display:none">`)
    let resp = []
    entrada = complete(entrada)
    let code = []
    entrada = iframe(entrada)

    entrada = tag(entrada, '###', '<h3>', '</h3>')
    entrada = tag(entrada, '##', '<h2>', '</h2>')
    entrada = tag(entrada, '#', '<h1>', '</h1>')
    entrada = tag(entrada, '      ', `<p style="text-align: right; text-indent:0px">`, '</p>')
    entrada = tag(entrada, '   ', `<p style="text-align: center; text-indent:0px">`, '</p>')
    entrada = txt(entrada, '<p>-#</p>', '<ol>', '</ol>')
    entrada = tag(entrada, '-', '<li>', '</li>')

    entrada = tag(entrada, 'img',
        '<img src="', '">')
    entrada = txt(entrada, '***', '<u>', '</u>')
    entrada = txt(entrada, '**', '<i>', '</i>')
    entrada = txt(entrada, '*', '<strong>', '</strong>')
    entrada = link(entrada)
    entrada = tabela(entrada)
    entrada = imagem(entrada)


    document.getElementById('preview').innerHTML = prefixo + entrada + posfixo
    chamaiframe()
    abre(localStorage.getItem('etapa'))
    renderMathInElement(document.getElementById('preview'), {
        delimiters: [{
            left: "$$",
            right: "$$",
            display: true
        }, { left: "\\[", right: "\\]", display: true }, { left: "$", right: "$", display: false }, { left: "\\(", right: "\\)", display: false }]
    })

}