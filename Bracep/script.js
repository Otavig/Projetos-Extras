const btn = document.getElementById('btn_enviar');
const e_div_CEP = document.getElementById("id_CEP");

btn.addEventListener("click", async () => {
    const cep = document.getElementById('info').value;
    var url_api = `https://viacep.com.br/ws/${cep}/json/`;
    let res = await fetch(url_api);
    let json = await res.json();
    console.log(json);
    
    let html =
        `<div class="col-xxl-3 col-xl-3 col-lg-4 col-6 px-3 py-3">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${json.cep}</h4>
                    <p class="card-text">${json.logradouro}</p>
                    <p class="card-text">${json.complemento}</p>
                    <p class="card-text">${json.bairro}</p>
                    <p class="card-text">${json.localidade}</p>
                    <p class="card-text">${json.uf}</p>
                </div>
            </div>
        </div>`;
        
    e_div_CEP.innerHTML = html;
});
