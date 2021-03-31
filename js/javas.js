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