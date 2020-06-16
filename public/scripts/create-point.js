function populateSelectFromApi(combo, url) {
  fetch(url)
    .then((res) => res.json())
    .then((values) => {
      values.forEach((value) => {
        if (url.includes("municipios"))
          combo.innerHTML += `<option value='${value.nome}'>${value.nome}</option>`;
        else
          combo.innerHTML += `<option value='${value.id}'>${value.nome}</option>`;
      });
    });
}

function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  populateSelectFromApi(ufSelect, url);
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  citySelect.innerHTML = "";
  citySelect.disabled = true;
  populateSelectFromApi(citySelect, url);
  citySelect.disabled = false;
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const colectedItems = document.querySelector("input[name=items]");
let selecteditems = [];

//Função criada para manusear os items de coleta selecionados ou não
function handleSelectedItem(event) {
  const itemsLi = event.target;

  //add or remove a class with javascript
  itemsLi.classList.toggle("selected");

  const itemId = itemsLi.dataset.id;

  const alreadySelected = selecteditems.findIndex((item) => item == itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selecteditems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selecteditems = filteredItems;
  } else {
    selecteditems.push(itemId);
  }
  colectedItems.value = selecteditems;
}

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
