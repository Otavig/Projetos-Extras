const criarAmbiente3D = () => {
    // Criar o renderizador
    const renderizador = new THREE.WebGLRenderer();
    renderizador.setSize(window.innerWidth, window.innerHeight); // Definir o tamanho do renderizador
    document.body.appendChild(renderizador.domElement); // Adicionar o renderizador ao corpo do documento

    // Configuração da câmera
    const campoDeVisao = 75;
    const proporcao = window.innerWidth / window.innerHeight;
    const perto = 0.1;
    const longe = 1000;
    const camera = new THREE.PerspectiveCamera(campoDeVisao, proporcao, perto, longe);
    camera.position.z = 2; // Posicionar a câmera para trás para visualizar o cubo

    // Configuração da cena
    const cena = new THREE.Scene();

    // Criar um cubo
    const geometria = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xc2c5cc });
    const cubo = new THREE.Mesh(geometria, material);
    cena.add(cubo);

    // Loop de animação
    const animar = (tempo) => {
        tempo *= 0.001; // Converter o tempo para segundos
        cubo.rotation.x = tempo; // Rotacionar o cubo no eixo X
        cubo.rotation.y = tempo; // Rotacionar o cubo no eixo Y

        renderizador.render(cena, camera); // Renderizar a cena
        requestAnimationFrame(animar); // Continuar o loop de animação
    };

    requestAnimationFrame(animar);

    // Ajustar ao redimensionar a janela
    window.addEventListener("resize", () => {
        renderizador.setSize(window.innerWidth, window.innerHeight); // Ajustar o tamanho do renderizador
        camera.aspect = window.innerWidth / window.innerHeight; // Atualizar a proporção da câmera
        camera.updateProjectionMatrix(); // Atualizar a matriz de projeção
    });
};

// Chamar a função para criar o ambiente 3D
criarAmbiente3D();
