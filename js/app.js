const container = document.querySelector(".pokemon__container"); 
const inputSearch = document.querySelector("#search"); 
const btn = document.querySelector("#btn"); 
const btnSeeAll = document.querySelector("#btnSeeAll"); 
const btnNext = document.querySelector("#next"); 
let btnPrev = document.querySelector("#prev");
const btnContainer = document.querySelector("#btnContainer"); 
const formSearch = document.querySelector("#formSearch"); 
let card = null; 
const error = document.querySelector("#error");

const api = 'https://pokeapi.co/api/v2/pokemon';
let isFirstLoad = false;

const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const maxPokemons = 150;
let resultItemsCounter = 0; 
let counter = 0;


formSearch.addEventListener("submit", (e) => {
    e.preventDefault(); 
    searchPokemonByName(inputSearch.value); 
});


btnSeeAll.addEventListener("click", async () => {
    getAllPokemons();
});


btn.addEventListener("click", async () => {
    searchPokemonByName(inputSearch.value);
});


btnNext.addEventListener("click", async () => {
    if (counter >= 0 && counter <= maxPokemons) {
        counter += 1;
        getPokemonById(counter);
    }
});


btnPrev.addEventListener("click", async () => {
    if (counter !== 0 && counter <= maxPokemons) {
        counter -= 1;
    }
    if (counter !== 0 && counter <= maxPokemons) {
        getPokemonById(counter);
    }
});


const searchPokemonByName = async (name) => {
    try {
        const response = await fetch(`${api}/${name}`); 
        const data = await response.json(); 
        const results = [data]; 

        error.style.display = "none"; 
        createCards(results); 
        counter = data.id; 
        resultItemsCounter = results.length; 
        hideNextPrevButtons(); 
        isFirstLoad = true;
    } catch (err) {
        error.style.display = "flex"; 
        createCards([]); 
        hideNextPrevButtons(); 
        btnContainer.style.display = "none"; 
        return;
    }
};

const getAllPokemons = async () => {
    try {
        const response = await fetch(`${api}?limit=${maxPokemons}&offset=0`); 
        const data = await response.json();
        const { results } = data; 
        resultItemsCounter = results.length;
        hideNextPrevButtons();

        results.forEach(async (pokemon) => {
            const response = await fetch(pokemon.url); 
            const data = await response.json();
            const results = [data];
            createCards(results, true); 
            error.style.display = "none"; 
        });
    } catch (error) {
        createCards([], true); 
    }
};

const getPokemonById = async (id) => {
    const response = await fetch(`${api}/${id}`); 
    const data = await response.json();
    const results = [data];
    createCards(results); 
    resultItemsCounter = results.length;
    hideNextPrevButtons();
};

const hideNextPrevButtons = () => {
    if (resultItemsCounter === 1) {
        btnContainer.style.display = "flex"; 
    } else {
        btnContainer.style.display = "none"; 
    }

    if (counter === 1) {
        btnPrev.style.display = "none"; 
    } else {
        btnPrev.style.display = "block"; 
    }
};

hideNextPrevButtons();

const createCards = async (pokemons, newCard = false) => {
    if (newCard === false) {
        container.innerHTML = ""; 
    }

    pokemons?.forEach(pokemon => {
        const card = document.createElement("div"); 
        card.classList.add("pokemon__card", pokemon.types[0].type.name); 

        card.innerHTML = `
            <div class="img__container">
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
            <div class="info">
                <h3 class="name">${capitalizeFirstLetter(pokemon.name)}</h3>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `./pokemon.html?id=${pokemon.id}&pokemon=${pokemon.name}`; 
        });

        container.appendChild(card); 
    });
};
