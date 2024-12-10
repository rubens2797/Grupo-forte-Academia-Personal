// Selecionando o formulário
const formAvaliacao = document.getElementById('formAvaliacao');

// Evento de envio do formulário
formAvaliacao.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar os dados do formulário
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    // Objetivos
    const objetivos = [...document.querySelectorAll('input[name="objetivo"]:checked')].map(input => input.value);

    // Nível de atividade
    const nivelAtividade = document.getElementById('nivel_atividade').value;

    // Histórico
    const historico = document.getElementById('historico').value;

    // Medidas Corporais
    const medidas = {
        "Bíceps Direito": document.getElementById('circunferencia_biceps_direito').value || 'Não Informada',
        "Bíceps Esquerdo": document.getElementById('circunferencia_biceps_esquerdo').value || 'Não Informada',
        "Ombro": document.getElementById('circunferencia_ombro').value || 'Não Informada',
        "Peito": document.getElementById('circunferencia_peito').value || 'Não Informada',
        "Abdômen": document.getElementById('circunferencia_abdomen').value || 'Não Informada',
        "Cintura": document.getElementById('circunferencia_cintura').value || 'Não Informada',
        "Glúteo": document.getElementById('circunferencia_gluteo').value || 'Não Informada',
        "Coxa Direita": document.getElementById('circunferencia_coxa_direita').value || 'Não Informada',
        "Coxa Esquerda": document.getElementById('circunferencia_coxa_esquerda').value || 'Não Informada',
        "Panturrilha Direita": document.getElementById('circunferencia_panturrilha_direita').value || 'Não Informada',
        "Panturrilha Esquerda": document.getElementById('circunferencia_panturrilha_esquerda').value || 'Não Informada'
    };

    // Exibir os dados na tela
    const dadosExibidos = `
        <h3>Ficha de Avaliação - Resumo</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Idade:</strong> ${idade} anos</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} cm</p>
        <p><strong>Objetivos:</strong> ${objetivos.join(', ')}</p>
        <p><strong>Nível de Atividade:</strong> ${nivelAtividade}</p>
        <p><strong>Histórico:</strong> ${historico}</p>
        <h4>Medidas Corporais:</h4>
        <ul>
            ${Object.entries(medidas).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
        </ul>
    `;

    // Exibir os dados preenchidos
    const divResumo = document.getElementById('resumo');
    divResumo.innerHTML = dadosExibidos;
});

// Função para enviar por WhatsApp
function enviarWhatsapp() {
    const nome = document.getElementById('nome').value;
    const mensagem = `Ficha de Avaliação do Aluno:\n\nNome: ${nome}\n\nClique aqui para enviar a ficha:\nhttps://wa.me/?text=${encodeURIComponent(document.getElementById('resumo').innerText)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
}

// Função para enviar por E-mail
function enviarEmail() {
    const nome = document.getElementById('nome').value;
    const mensagem = `
        Ficha de Avaliação do Aluno:
        Nome: ${nome}
        ${document.getElementById('resumo').innerText}
    `;
    const url = `mailto:email@exemplo.com?subject=Ficha de Avaliação&body=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Função para imprimir a ficha
function imprimirFicha() {
    const divResumo = document.getElementById('resumo');
    const janela = window.open('', '', 'width=800, height=600');
    janela.document.write(`<html><head><title>Ficha de Avaliação</title></head><body>${divResumo.innerHTML}</body></html>`);
    janela.document.close();
    janela.print();
}
