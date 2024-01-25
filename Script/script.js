let textoCriptografado = '';

document.addEventListener('DOMContentLoaded', function () {
    const textoOriginal = document.getElementById('texto');
    const resultado = document.getElementById('resultado');
    const botaoCriptografar = document.getElementById('criptografarBtn');
    const botaoDescriptografar = document.getElementById('descriptografarBtn');

    if (textoOriginal && resultado && botaoCriptografar && botaoDescriptografar) {
        botaoCriptografar.addEventListener('click', function () {
            processar('criptografar');
        });

        botaoDescriptografar.addEventListener('click', function () {
            processar('descriptografar');
        });

        textoOriginal.addEventListener('focus', function () {
            mostrarMensagem();
        });
    }
});

let clipboardContent = '';
let clipboardTimer = null; // Variável para armazenar o temporizador

document.addEventListener('keydown', function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        clipboardContent = navigator.clipboard.readText().then(text => text);

        // Limpa o temporizador existente, se houver
        if (clipboardTimer) {
            clearTimeout(clipboardTimer);
        }

        // Define um novo temporizador para verificar após alguns segundos
        clipboardTimer = setTimeout(checkClipboard, 5000); // 5000 milissegundos (5 segundos)
    }
});

function checkClipboard() {
    navigator.clipboard.readText().then(text => {
        if (text !== clipboardContent) {
            if (resultado) {
                resultado.value = '';
            }
            limparTextoOriginal();
            clipboardContent = text;
        }
    });
}

function mostrarMensagem() {
    const caixaTexto = document.getElementById('texto');
    caixaTexto.value = '';
    caixaTexto.placeholder = 'Digite seu texto em letra minúscula e sem acentuação';
    caixaTexto.style.color = 'gray';
}

function processar(operacao) {
    const textoOriginal = document.getElementById('texto').value;
    let resultado = '';

    if (operacao === 'criptografar') {
        resultado = criptografar(textoOriginal);
        textoCriptografado = resultado;
        limparTextoOriginal();
    } else if (operacao === 'descriptografar') {
        resultado = descriptografar(textoCriptografado);
        limparTextoOriginal();
    }

    if (resultado) {
        document.getElementById('resultado').value = resultado;
    }
}

function limparTextoOriginal() {
    const textoOriginal = document.getElementById('texto');
    if (textoOriginal) {
        textoOriginal.value = '';
    }
}

function criptografar(texto) {
    return texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function descriptografar(texto) {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}