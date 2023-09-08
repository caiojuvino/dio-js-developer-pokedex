const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

const detailList = {};

function convertPokemonToLi(pokemon) {
  detailList[pokemon.number] = pokemon.moreDetails;

  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
var close = document.getElementById("close");

close.onclick = function () {
  document.querySelector(".modal-content div img").src = "";
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    document.querySelector(".modal-content div img").src = "";
    modal.style.display = "none";
  }
};

pokemonList.addEventListener("click", function (event) {
  const clickedPokemon = event.target.closest(".pokemon");
  if (clickedPokemon) {
    modal.style.display = "block";
    const pokeNumber = clickedPokemon.childNodes[1].innerText.slice(1);
    const detail = detailList[pokeNumber];
    document.querySelector(".modal-content div img").src = detail.img;
    document.getElementById("modal_name").innerText = detail.name;

    inner = `
    Types: ${detail.types.join(", ")}<br>
    Abilities: ${detail.abilities.join(", ")}<br>
    Height: ${detail.height}<br>
    Weight: ${detail.weight}`;
    document.getElementById("modal_info").innerHTML = inner;

    for (let stat of detail.stats) {
      document.getElementById(stat[0]).value = stat[1];
    }

    cList = modalContent.classList;
    if (cList.length > 1) {
      cList.replace(cList[1], detail.type);
    }
    cList.add(detail.type);
    //console.log(detail);
  }
});
