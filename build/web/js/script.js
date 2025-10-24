//----------------------------------FORMATAÇÕES-----------------------------\\

// Formatação do campo RG: xx.xxx.xxx-x
document.getElementById('rg')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

// Formatação do campo CPF: xxx.xxx.xxx-xx 
document.getElementById('cpf')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

// Formatação do campo Título de Eleitor: xxxx.xxxx.xxxx 
document.getElementById('titulo')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(\d)/, '$1.$2');
    value = value.replace(/(\d{4})(\d)/, '$1.$2');
    value = value.replace(/(\d{4})(\d)/, '$1.$2');
    e.target.value = value;
});

// Formatação do campo Celular: (xx)x xxxx-xxxx 
document.getElementById('celular')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    }
    if (value.length > 6) {
        value = value.replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3');
    }
    e.target.value = value;
});

//--------------------------------------------------------------------------\\


//--------------------------------------------------------------------------\\

function updateDocumentoUnico(event) {
    const documentoElement = document.getElementById('documentoUnico');
    const botaoElement = document.getElementById('gerarDocumento');
    const onlyLetters = /^[a-zA-Z\u00C0-\u00FF\s]*$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const nomeDuElement = document.getElementById('Nome').value.trim();
    const rgDuElement = document.getElementById('rg').value.replace(/\D/g, '');
    const cpfDuElement = document.getElementById('cpf').value.replace(/\D/g, '');
    const tituloDuElement = document.getElementById('titulo').value.replace(/\D/g, '');
    const celularDuElement = document.getElementById('celular').value.replace(/\D/g, '');
    const nDuElement = document.getElementById('numero').value;
    const enderecoDuElement = document.getElementById('endereco').value.trim();
    const bairroDuElement = document.getElementById('bairro').value.trim();
    const cidadeDuElement = document.getElementById('cidade').value.trim();
    const emailDuElement = document.getElementById('email').value.trim();
    const cEmailDuElement = document.getElementById('confirma-email').value.trim();
    const senhaDuElement = document.getElementById('senha').value.trim();
    const cSenhaDuElement = document.getElementById('confirma-senha').value.trim();
    let du = '';

    //--------------------------------VALIDAÇÕES--------------------------------\\
    if (nomeDuElement.length < 3) {
        event.preventDefault();
        alert('O campo "Nome" deve ter pelo menos 3 caracteres.');
        return;
    }

    if (!onlyLetters.test(nomeDuElement)) {
        event.preventDefault();
        alert('O campo "Nome" deve conter apenas letras e espaços.');
        return;
    }

    if (rgDuElement.length !== 9) {
        event.preventDefault();
        alert('O campo "RG" deve ter 9 dígitos.');
        return;
    }

    if (cpfDuElement.length !== 11) {
        event.preventDefault();
        alert('O campo "CPF" deve ter 11 dígitos.');
        return;
    }

    if (tituloDuElement.length !== 12) {
        event.preventDefault();
        alert('O campo "Título de Eleitor" deve ter 12 dígitos.');
        return;
    }

    if (celularDuElement.length !== 11) {
        event.preventDefault();
        alert('O campo "Celular" deve ter 11 dígitos.');
        return;
    }

    if (enderecoDuElement.length < 5) {
        event.preventDefault();
        alert('O campo "Endereço" deve ser preenchido.');
        return;
    }

    if (nDuElement.length === 0) {
        event.preventDefault();
        alert('O campo "Nº" deve ser preenchido.');
        return;
    }

    if (bairroDuElement.length < 5) {
        event.preventDefault();
        alert('O campo "Bairro" deve ser preenchido.');
        return;
    }

    if (cidadeDuElement.length < 5) {
        event.preventDefault();
        alert('O campo "Cidade" deve ser preenchido.');
        return;
    }

    if (emailDuElement.length < 5) {
        event.preventDefault();
        alert('O campo "Email" deve ser preenchido.');
        return;
    }

    if (cEmailDuElement !== emailDuElement) {
        event.preventDefault();
        alert('O campo "Confirme seu Email" deve ser igual ao Email.');
        return;
    }

    if (!senhaRegex.test(senhaDuElement)) {
        event.preventDefault();
        alert('Senha inválida! Crie uma senha válida.');
        return;
    }

    if (cSenhaDuElement !== senhaDuElement) {
        event.preventDefault();
        alert('O campo "Confirme sua Senha" deve ser igual à Senha.');
        return;
    }

    //--------------------------------------------------------------------------\\
    
    // Gera número único
    for (let i = 0; i < 22; i++) {
        du += Math.floor(Math.random() * 10);
    }

    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')
        }/${date.getFullYear()}`;

    document.getElementById('dataDu').textContent = formattedDate;
    document.getElementById('displayNome').textContent = nomeDuElement;
    documentoElement.textContent = du;
    documentoElement.style.display = 'block';
    botaoElement.disabled = true;
    alert('Documento Único gerado com sucesso!');
}

document.getElementById('gerarDocumento')?.addEventListener('click', updateDocumentoUnico);

//--------------------------------------------------------------------------\\
//---------------------- LOGIN E RECUPERAÇÃO DE SENHA ----------------------\\

// Função dos botões 'Login' e 'Esqueci a Senha'
document.addEventListener('DOMContentLoaded', function () {
    const esqueci = document.getElementById('esqueci');
    const entrar = document.getElementById('entrar');

    if (esqueci) {
        esqueci.addEventListener('click', function (event) {
            event.preventDefault();
            const cpf = document.getElementById('cpf')?.value.trim();
            if (cpf) {
                alert('Um e-mail foi encaminhado para o CPF: ' + cpf);
            } else {
                alert('Por favor, informe o CPF antes de recuperar a senha.');
            }
        });
    }

    if (entrar) {
        entrar.addEventListener('click', function (event) {
            event.preventDefault();
            alert('Usuário não encontrado!');
        });
    }
});

//--------------------------------------------------------------------------\\
//---------------------- VISUALIZAR EM TELA CHEIA----------------------\\

// Função do botão 'Visualizar em Tela Cheia'
document.getElementById('visualizar')?.addEventListener('click', function () {
    const documentoUnico = document.getElementById('documentoUnico').textContent;
    const nome = document.getElementById('displayNome').textContent;
    const data = document.getElementById('dataDu').textContent;

    if (!documentoUnico || !nome || !data) {
        alert('Por favor, gere o Documento Único primeiro!');
        return;
    }

    const params = new URLSearchParams({
        documento: documentoUnico,
        nome: encodeURIComponent(nome),
        data: encodeURIComponent(data)
    });

    window.location.href = 'telacheia.html?' + params.toString();
});

// Obter parâmetros da URL
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const documento = urlParams.get('documento');
    const nome = decodeURIComponent(urlParams.get('nome') || '');
    const data = decodeURIComponent(urlParams.get('data') || '');

    if (documento && nome && data) {
        document.getElementById('documentoUnico').textContent = documento;
        document.getElementById('displayNome').textContent = nome;
        document.getElementById('dataDu').textContent = data;
    }
});
