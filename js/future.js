var entrada


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

function marcaiframe() {
    x = document.getElementById('blocodenotas')
    x.innerHTML = x.innerHTML.replaceAll('<p>iframe_', '<p class="iframe">iframe_')
    document.getElementsByClassName('iframe')[0].innerText = 'iframe_{' + code[0] + '}'

}

var texto = 'memoria'
var prefixo = '<section>'
var posfixo = '</section>'

function roda() {
    entrada = document.getElementById('blocodenotas').innerHTML.replaceAll('<span style="text-indent: 1.5em;">', '').replaceAll('</span>', '')
    localStorage.setItem(texto, entrada)
    entrada = entrada.replaceAll('div>', 'p>').replaceAll('<p>iframe_', '<p class="iframe">iframe_').replaceAll('<p>_</p>', '</section><section>')
    let resp = []
    entrada = complete(entrada)
    let code = []
    entrada = iframe(entrada)

    entrada = tag(entrada, '###', '<h3>', '</h3>')
    entrada = tag(entrada, '##', '<h2>', '</h2>')
    entrada = tag(entrada, '#', '<h1>', '</h1>')
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
    renderMathInElement(document.getElementById('preview'), {
        delimiters: [{
            left: "$$",
            right: "$$",
            display: true
        }, { left: "\\[", right: "\\]", display: true }, { left: "$", right: "$", display: false }, { left: "\\(", right: "\\)", display: false }]
    })

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