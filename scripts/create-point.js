
function populateSelectFromApi(combo, url){
    fetch(url)
    .then(res=> res.json())
    .then(values => {
        values.forEach(value => {
            combo.innerHTML += `<option value="${value.id}">${value.nome}</option>`
        });
    })
}

function populateUfs(){
    const ufSelect = document
    .querySelector("select[name=uf]")
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    populateSelectFromApi(ufSelect, url)
}



populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    citySelect.innerHTML = '';
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    populateSelectFromApi(citySelect, url)
    citySelect.disabled = false;
}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities)

//Exemplo
// function populateUfs(){
//     const ufSelect = document
//     .querySelector("select[name=uf]")

//     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
//     .then(res=> res.json())
//     .then(states => {
//         states.forEach(uf => {
//             ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`
//         });
//     })
// }