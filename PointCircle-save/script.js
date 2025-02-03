// Tela do jogo
let area_do_jogo = document.getElementById('tela');
let largura = area_do_jogo.clientWidth;
let altura = area_do_jogo.clientHeight;

// Configurações do jogo
let quantidade = 0;
let pontos = 0;
let intervalo;
let duracaoJogo = 30000; // Duração padrão do jogo
let tempoInicial;
let tempoRestante = duracaoJogo; // Inicializa com a duração do jogo para evitar NaN
// let contadorErro = 0;

// Funções principais
function gerarPosicao(max, tamanho) {
    return Math.floor(Math.random() * (max - tamanho));
}

function gerarPosY(min, max) {
    return Math.random() * (max - min) + min;
}

function gerarNovoCirculo() {
    if (quantidade === 0) {
        quantidade = 1;
        let x = gerarPosicao(largura, 100);
        let y = gerarPosicao(altura, 100);
        let html = `<div id="forClick" onclick="aoClique()" class="circle_spawn" style="left: ${x}px; top: ${(y + gerarPosY(600, 100))}px; width: 100px; height: 100px;"></div>`;
        area_do_jogo.innerHTML += html;
    }
}

function aoClique() {
    const elemento = document.querySelector("#forClick");
    if (elemento) {
        quantidade = 0;
        pontos++;
        elemento.remove();
        gerarNovoCirculo(); // Gerar nova bolinha imediatamente após clicar
        atualizarContador(); // Atualiza o contador na tela
    }
}

// // Adiciona um listener para cliques no fundo da tela
// area_do_jogo.addEventListener('click', function(event) {
//     if (!event.target.classList.contains('circle_spawn')) { // Verifica se o clique não foi na bolinha
//         contadorErro++;
//         atualizarContador(); // Atualiza o contador na tela em caso de erro
//     }
// }, true);

function atualizarRelogio() {
    const tempoAtual = Date.now();
    const tempoDecorrido = tempoAtual - tempoInicial;
    tempoRestante = Math.max(0, duracaoJogo - tempoDecorrido);
    
    const minutos = Math.floor(tempoRestante / 60000);
    const segundos = Math.floor((tempoRestante % 60000) / 1000);
    
    const tempoElemento = document.getElementById('tempo');
    if (tempoElemento) {
        tempoElemento.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')} | ${pontos} pontos`; //| ${contadorErro} erros
    }
    
    if (tempoRestante <= 0) {
        clearInterval(intervalo);
        salvarPontuacao();
        resultados();
    }
}

// Função para atualizar o estado do jogo
function atualizarJogo() {
    atualizarRelogio();
}

function salvarPontuacao() {
    let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || { 10000: 0, 30000: 0, 60000: 0 };

    console.log('Pontuações atuais:', pontuacoes);
    console.log('Pontuação atual:', pontos);

    if (pontos > pontuacoes[duracaoJogo]) {
        pontuacoes[duracaoJogo] = pontos;
        console.log('Nova pontuação salva para duração', duracaoJogo, ':', pontos);
    } else {
        console.log('Pontuação não é maior. Não atualizou para duração', duracaoJogo);
    }

    localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));
    console.log('Pontuações salvas no localStorage:', localStorage.getItem('pontuacoes'));
}

// Tela do menu principal
function menu() {
    area_do_jogo.innerHTML = `
    <div class="menu-container">
        <div class="menu">
            <img src="imgs/icon.jpg"/>
            <h1>PointCircle</h1>
            <button id="start-game">Iniciar Jogo</button>
            <button id="show-scores" class="scores" >Ver Melhores Pontuações</button>
        </div>
    </div>
    <div class="footer-text"><a href="https://github.com/otavig">Criador Otavig</a></div>
    `;

    document.getElementById("start-game")?.addEventListener('click', () => mostrarSelecaoTempo());
    document.getElementById("show-scores")?.addEventListener('click', () => mostrarPontuacoes());
}

// Tela de seleção de tempo
function mostrarSelecaoTempo() {
    area_do_jogo.innerHTML = `
    <div class="menu-container">
        <div class="time-selection">
            <h1>Escolha o Tempo</h1>
            <button id="start-game-10">10 segundos</button>
            <button id="start-game-30">30 segundos</button>
            <button id="start-game-60">60 segundos</button>
            <button id="back-menu">Voltar ao Menu</button>
        </div>
    </div>
    `;

    document.getElementById("start-game-10")?.addEventListener('click', () => iniciarJogo(10000));
    document.getElementById("start-game-30")?.addEventListener('click', () => iniciarJogo(30000));
    document.getElementById("start-game-60")?.addEventListener('click', () => iniciarJogo(60000));
    document.getElementById("back-menu")?.addEventListener('click', () => menu());
}

// Função para remover o menu
function delete_menu() {
    let area = document.querySelector('.menu-container');
    if (area) {
        area.remove();
    }
}

function iniciarJogo(duracao) {
    delete_menu();
    pontos = 0;
    // contadorErro = 0;
    duracaoJogo = duracao;
    tempoInicial = Date.now();
    tempoRestante = duracaoJogo; 
    intervalo = setInterval(atualizarJogo, 1000);
    gerarNovoCirculo(); 
    
    area_do_jogo.innerHTML += `<div id="tempo" class="contador-tempo"></div>`;
    atualizarContador();
}

// Função para atualizar o contador de tempo e pontos na tela
function atualizarContador() {
    const tempoElemento = document.getElementById('tempo');
    if (tempoElemento) {
        const minutos = Math.floor(tempoRestante / 60000);
        const segundos = Math.floor((tempoRestante % 60000) / 1000);
        tempoElemento.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')} | ${pontos} pontos`; //| ${contadorErro} erros
    }
}

// Tela de resultados
function resultados() {
    // Obtém as pontuações do localStorage ou define valores padrão
    let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || { 10000: 0, 30000: 0, 60000: 0 };
    
    // Mensagem de depuração
    console.log('Pontuações recuperadas:', pontuacoes);
    
    area_do_jogo.innerHTML = `
    <div class="menu-container">
        <div class="menu">
            <h1>Fim do Jogo!</h1>
            <p>Pontos: ${pontos}</p>
            <h2>Melhor Pontuação por Duração:</h2>
            <ul>
                <li>10 segundos: ${pontuacoes[10000]}</li>
                <li>30 segundos: ${pontuacoes[30000]}</li>
                <li>60 segundos: ${pontuacoes[60000]}</li>
            </ul>
            <button id="restart-game">Jogar Novamente</button>
            <button id="back-menu">Voltar ao Menu</button>
        </div>
    </div>
    `; //<p>Erros: ${contadorErro}</p>
    
    quantidade = 0;

    document.getElementById('restart-game')?.addEventListener('click', () => {
        iniciarJogo(duracaoJogo); // Recomeça o jogo com a mesma duração
    });

    document.getElementById('back-menu')?.addEventListener('click', () => {
        menu();
    });
}

function mostrarPontuacoes() {
    let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || { 10000: 0, 30000: 0, 60000: 0 };

    console.log('Pontuações para exibição:', pontuacoes);

    area_do_jogo.innerHTML = `
    <div class="menu-container">
        <div class="menu">
            <h1>Melhores Pontuações</h1>
            <ul>
                <li>10 segundos: ${pontuacoes[10000] || 0}</li>
                <li>30 segundos: ${pontuacoes[30000] || 0}</li>
                <li>60 segundos: ${pontuacoes[60000] || 0}</li>
            </ul>
            <button id="back-menu">Voltar ao Menu</button>
        </div>
    </div>
    `;

    document.getElementById('back-menu')?.addEventListener('click', () => {
        menu();
    });
}

// Iniciar o menu quando a página carrega
menu();
