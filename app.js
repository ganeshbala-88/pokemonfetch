async function fetchPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayPokemon(id) {
  const pokemonData = await fetchPokemon(id);
  const pokedex = document.getElementById('pokedex');

  const card = document.createElement('li');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = pokemonData.sprites.front_default;
  img.onload = function() {
    card.classList.add('loaded');
  };

  const name = document.createElement('h3');
  name.textContent = pokemonData.name;

  const type = document.createElement('p');
  type.className = "para";
  type.textContent = "Type: " + pokemonData.types.map((type) => type.type.name).join(', ');

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(type);

  pokedex.appendChild(card);
}

let loadedPokemon = 0;
const limit = 20;

async function loadPokemon() {
  for (let i = loadedPokemon + 1; i <= loadedPokemon + limit; i++) {
    if (i > 250) break; 
    await displayPokemon(i);
    loadedPokemon++;
  }
}

function search_pokemon() {
  let input = document.getElementById('searchbar').value;
  input = input.toLowerCase();

  let cards = document.getElementsByClassName('card');

  for (let i = 0; i < cards.length; i++) {
    if (!cards[i].querySelector('h3').textContent.toLowerCase().includes(input)) {
      cards[i].style.display = "none";
    } else {
      cards[i].style.display = "block";
    }
  }
}

window.addEventListener('scroll', () => {
  const pokedex = document.getElementById('pokedex');
  const lastCard = pokedex.querySelector('.card:last-child');
  const distanceToBottom = document.documentElement.clientHeight - lastCard.getBoundingClientRect().bottom;

 
});

loadPokemon(); 