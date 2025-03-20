const colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
}

const pokemonStatsTranslations = [
    { stat: 'hp', statName: 'Puntos de Salud' },
    { stat: 'attack', statName: 'Ataque' },
    { stat: 'defense', statName: 'Defensa' },
    { stat: 'special-attack', statName: 'Ataque Especial' },
    { stat: 'special-defense', statName: 'Defensa Especial' },
    { stat: 'speed', statName: 'Velocidad' }
];


const pokemonTypesTranslations = [
    { type: 'normal', name: 'Normal' },
    { type: 'fire', name: 'Fuego' },
    { type: 'water', name: 'Agua' },
    { type: 'electric', name: 'Eléctrico' },
    { type: 'grass', name: 'Planta' },
    { type: 'ice', name: 'Hielo' },
    { type: 'fighting', name: 'Lucha' },
    { type: 'poison', name: 'Veneno' },
    { type: 'ground', name: 'Tierra' },
    { type: 'flying', name: 'Volador' },
    { type: 'psychic', name: 'Psíquico' },
    { type: 'bug', name: 'Bicho' },
    { type: 'rock', name: 'Roca' },
    { type: 'ghost', name: 'Fantasma' },
    { type: 'dragon', name: 'Dragón' },
    { type: 'dark', name: 'Siniestro' },
    { type: 'steel', name: 'Acero' },
    { type: 'fairy', name: 'Hada' }
];



// API de la PokéAPI
const api = 'https://pokeapi.co/api/v2/pokemon';
const params = new URLSearchParams(window.location.search);
let pokemonData = null;
let id = null;
const pokemonName = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonAbilities = document.getElementById('pokemonAbilities');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonStats = document.getElementById('pokemonStats');
const pokemonMoves = document.getElementById('pokemonMoves');
const header = document.getElementById('header');


const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const renderPokemon = () => {
    const [pokemon] = pokemonData;
    header.style.backgroundColor = colors[pokemon.types[0].type.name];
    pokemonName.innerText = capitalizeFirstLetter(pokemon.name);
    pokemonNumber.innerText = `# ${String(pokemon.id).padStart(3, "0")}`;
    pokemonImage.src = pokemon.sprites.other.dream_world.front_default;
    pokemonHeight.innerText = pokemon.height / 10 + ' M';
    pokemonWeight.innerText = pokemon.weight / 10 + ' KG';
    pokemonTypes.innerHTML = '';
    pokemon.types.forEach((type) => {
        const div = document.createElement('div');
        div.classList.add('badge');
        div.style.backgroundColor = colors[type.type.name];
        // div.innerText = type.type.name;
        div.innerText = pokemonTypesTranslations.filter((el) => type.type.name === el.type)[0].name;
        pokemonTypes.appendChild(div);
    });
    pokemonStats.innerHTML = '';
    pokemon.stats.forEach((stat, i) => {
        const card = document.createElement("div"); // Crea un div para la tarjeta
        card.classList.add("progress-bar"); // Agrega clases
        card.innerHTML = `
                <span class="progress-bar__text">${pokemonStatsTranslations.filter((el) => stat.stat.name === el.stat)[0].statName}</span>
                <div class="progress-bar__container">
                    <div class="progress-bar__progress" style="width: ${stat.base_stat}%; background-color: ${Object.values(colors)[i]}">
                        <span class="progress-bar__progress__info">
                            <strong>${stat.base_stat}</strong>
                        </span>
                    </div>
                </div>
        `;
        pokemonStats.appendChild(card);
    });
}

// Función para buscar un Pokémon por nombre
const searchPokemonByName = async (name) => {
    const response = await fetch(`${api}/${name}`); // Llama a la API con el nombre del Pokémon
    const data = await response.json(); // Convierte la respuesta en JSON
    const results = [data]; // Crea un array con el resultado
    console.log('results', results);
    pokemonData = results;
    renderPokemon();
};

params.forEach((value, key) => {
    console.log(`${key}: ${value}`);
    if (key === 'id') {
        console.log('selected id', value);
        id = value;
    }
    if (key === 'pokemon') {
        console.log('selected name', value);
        searchPokemonByName(value);
    }
});

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
    window.history.back();
});




