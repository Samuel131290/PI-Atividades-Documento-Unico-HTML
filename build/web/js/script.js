//----------------------------------FORMATAÇÕES-----------------------------\\

// Formatação do campo RG: xx.xxx.xxx-x
document.getElementById('rg').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{2})(\d)/, '$1.$2'); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen
    e.target.value = value;
});

// Formatação do campo CPF: xxx.xxx.xxx-xx 
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

// Formatação do campo Titulo de Eleitor: xxxx.xxxx.xxxx 
document.getElementById('titulo').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(\d)/, '$1.$2');
    value = value.replace(/(\d{4})(\d)/, '$1.$2');
    value = value.replace(/(\d{4})(\d)/, '$1.$2');
    e.target.value = value;
});

// Formatação do campo Celular: (xx)x xxxx-xxxx 
document.getElementById('celular').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    if (value.length > 0) {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2'); // Coloca os parênteses no DDD e o espaço depois
    }
    if (value.length > 6) {
        value = value.replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3'); // Coloca o hífen depois dos primeiros 5 dígitos
    }
    e.target.value = value;
});

//--------------------------------------------------------------------------\\

function updateDocumentoUnico(event) {
    const documentoElement = document.getElementById('documentoUnico');
    const botaoElement = document.getElementById('gerarDocumento');
    const onlyLetters = /^[a-zA-Z\u00C0-\u00FF\s]*$/; 
    var senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

    // Validação de quantidade mínima de caracteres do campo Nome
    if (nomeDuElement.length < 3) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Nome" deve ter pelo menos 3 caracteres.');
        return; // Sai da função se o nome for inválido
    }

    // Validação de apenas letras
    if (!onlyLetters.test(nomeDuElement)) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Nome" deve conter apenas letras e espaços.');
        return; // Sai da função se o nome for inválido
    }
    
    // Validação de quantidade mínima de números do campo RG
    if (rgDuElement.length !== 9) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "RG" deve ter 9 dígitos.');
        return; // Sai da função se o RG for inválido
    } 
    
    // Validação de quantidade mínima de números do campo CPF
    if (cpfDuElement.length !== 11) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "CPF" deve ter 11 dígitos.');
        return; // Sai da função se o CPF for inválido
    } 
    
    // Validação de quantidade mínima de números do campo Título de Eleitor
    if (tituloDuElement.length !== 12) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Título de Eleitor" deve ter 14 dígitos.');
        return; // Sai da função se o Título de Eleitor for inválido
    } 
    
     // Validação de quantidade mínima de números do campo Celular
    if (celularDuElement.length !== 11) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Celular" deve ter 11 dígitos.');
        return; // Sai da função se o Celular for inválido
    }
    
    // Validação de quantidade mínima de caracteres do campo Endereço
    if (enderecoDuElement.length < 5) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Endereço" deve ser preenchido.');
        return; // Sai da função se o Endereço for inválido
    }
    
    // Validação do campo Nº
    if (nDuElement.length === 0) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Nº" deve ser preenchido.');
        return; // Sai da função se o Nº for inválido
    }
    
    // Validação de quantidade mínima de caracteres do campo Bairro
    if (bairroDuElement.length < 5) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Bairro" deve ser preenchido.');
        return; // Sai da função se o Bairro for inválido
    }
    
    // Validação de quantidade mínima de caracteres do campo Cidade
    if (cidadeDuElement.length < 5) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Cidade" deve ser preenchido.');
        return; // Sai da função se o Cidade for inválido
    }
    
    // Validação de quantidade mínima de caracteres do campo Email
    if (emailDuElement.length < 5) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Email" deve ser preenchido.');
        return; // Sai da função se o Email for inválido
    }
    
    // Validação do campo Confirmar Email
    if (cEmailDuElement !== emailDuElement) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Confirme seu Email" deve ser igual ao Email.');
        return; // Sai da função se o Confirmar Email for inválido
    }
    
    if (!senhaRegex.test(senhaDuElement)) {
        event.preventDefault(); // Impede o envio do formulário
        alert('Senha inválida! Crie uma senha válida.');
        return; // Sai da função se o Confirmar Email for inválido
    }
    
    // Validação do campo Confirmar Senha
    if (cSenhaDuElement !== senhaDuElement) {
        event.preventDefault(); // Impede o envio do formulário
        alert('O campo "Confirme seu Senha" deve ser igual á Senha.');
        return; // Sai da função se o Confirmar Senha for inválido
    }

//---------------------------------------------------------------------------\\
  
    // Gera um número único
    for (let i = 0; i < 22; i++) {
        let digito = Math.floor(Math.random() * 10);
        du += digito;
    }
  
    // Gera uma data
    const date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let formattedDate = `${day}/${month}/${year}`;


    // Atualiza o conteúdo da página
    document.getElementById('dataDu').textContent = formattedDate; // Atualiza a data formatada
    document.getElementById('displayNome').textContent = nomeDuElement;
    documentoElement.textContent = du;
    documentoElement.style.display = 'block';
    botaoElement.disabled = true;
    alert('Documento Único gerado com sucesso!');
}

document.getElementById('gerarDocumento').addEventListener('click', updateDocumentoUnico);
