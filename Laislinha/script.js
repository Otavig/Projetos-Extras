var imageIndex = 0;
var images = [
    "imgs/img1.jpg",
    "imgs/img2.jpg", // Adicione aqui os caminhos das suas imagens
    "imgs/img3.jpg",  // Adicione aqui os caminhos das suas imagens
    "imgs/img4.jpg"  // Adicione aqui os caminhos das suas imagens
];

function showImage() {
    var button = document.getElementById("romantic-button");
    var imageContainer = document.getElementById("image-container");
    var heartContainer = document.getElementById("heart-container");

    // Esconde o botão
    button.style.display = "none";

    // Exibe o contêiner da imagem com o texto
    imageContainer.style.display = "block";

    // Adiciona imagem caindo no fundo
    for (var i = 0; i < 10; i++) {
        var img = document.createElement("img");
        img.src = "imgs/coracao.png"; // Imagem a ser usada
        img.classList.add("falling-image");
        img.style.left = Math.random() * window.innerWidth + "px";
        img.style.animationDuration = Math.random() * 3 + 2 + "s";
        heartContainer.appendChild(img);
    }

    // Inicia o intervalo para trocar a imagem principal
    setInterval(changeImage, 4000); // Troca a cada 4 segundos
}

function changeImage() {
    var mainImage = document.querySelector("#image-container img");
    imageIndex = (imageIndex + 1) % images.length; // Avança para a próxima imagem
    mainImage.src = images[imageIndex]; // Define o src da imagem principal para a próxima imagem na lista
}
