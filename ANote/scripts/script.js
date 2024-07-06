let list = [];
let enviar = document.getElementById('enviar');
let remover = document.getElementById('remover');
let detailsContainer = document.getElementById('detailsContainer');
let modal = document.getElementById('myModal');
let modalInput = document.getElementById('modalInput');
let modalDescription = document.getElementById('modalDescription');
let modalSubmit = document.getElementById('modalSubmit');
let cardDetail = document.getElementById('cardDetail');

cardDetail.style.display = "block";
cardDetail.style.display = "none";
modal.style.display = "none";

if (localStorage.getItem('lista')) {
    list = JSON.parse(localStorage.getItem('lista'));
}

exibirDetalhes(list);

enviar.addEventListener('click', () => {
    try {
        if (cardDetail.style.display !== "none") {
            return; 
        }
        modal.style.display = "block";
        document.getElementById('modalTitle').textContent = "Adicionar Item";
        modalInput.value = "";
        modalDescription.value = "";
    } catch (error) {
        console.log(`O erro foi ${error}`);
    }
});

remover.addEventListener('click', async () => {
    try {
        if (cardDetail.style.display !== "none") {
            return;
        }
        modal.style.display = "block";
        document.getElementById('modalTitle').textContent = "Remover Item";
        modalInput.value = "";
        modalDescription.style.display = "none";
    } catch (error) {
        console.log(`O erro foi ${error}`);
    }
});

document.getElementById('closeModal').onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onload = function() {
    document.getElementById('enviar').click();
}

modalSubmit.addEventListener('click', () => {
    try {
        let input = modalInput.value;
        let description = modalDescription.value;
        if (modalTitle.textContent === "Adicionar Item") {
            list.push({ item: input, description: description });
        } else if (modalTitle.textContent === "Remover Item") {
            let index = list.findIndex(el => el.item === input);
            if (index !== -1) {
                list.splice(index, 1);
            } else {
                alert("Item não encontrado na lista.");
            }
        }
        localStorage.setItem('lista', JSON.stringify(list));
        exibirDetalhes(list);
        modal.style.display = "none";
    } catch (error) {
        console.log(`O erro foi ${error}`);
    }
});

function showFullCard(item, description) {
    cardDetail.innerHTML = `
        <div class="card-header">${item}<span id="closeDetail">&times;</span></div>
        <div class="card-body">${description}</div>
    `;

    cardDetail.style.display = "block";

    document.getElementById('closeDetail').onclick = function() {
        cardDetail.style.display = "none";
        enviar.disabled = false; 
        remover.disabled = false;
    };

    enviar.disabled = true;
    remover.disabled = true;
}

function exibirDetalhes(list) {
    detailsContainer.innerHTML = "";
    list.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('cardzin');
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.textContent = item.item;
        card.appendChild(cardBody);
        card.addEventListener('click', () => {
            showFullCard(item.item, item.description);
        });

        let trashIcon = document.createElement('span');
        trashIcon.innerHTML = '&times;';
        trashIcon.classList.add('trash-icon');
        trashIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            removerItem(item.item);
        });
        card.appendChild(trashIcon);

        detailsContainer.appendChild(card);
    });
}

function removerItem(itemName) {
    let index = list.findIndex(el => el.item === itemName);
    if (index !== -1) {
        list.splice(index, 1);
        localStorage.setItem('lista', JSON.stringify(list));
        exibirDetalhes(list);
    } else {
        alert("Item não encontrado na lista.");
    }
}
