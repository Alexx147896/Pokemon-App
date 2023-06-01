const pokemonList = document.querySelector("#pokemonList");
const headerButtons = document.querySelectorAll(".btn-header");
let url = "https://pokeapi.co/api/v2/pokemon/"

for(let i = 1; i <= 151; i++) {
    fetch(url + i)
        .then((response) => response.json())
        .then(data => showPokemons(data))
}

function showPokemons(poke) {
    
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);

    tipos = tipos.join('');    
    
    
    let pokeId = poke.id.toString();
    if(pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    
    
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    
        <p class="pokemon-id-back">${pokeId}</p>
                        <div class="pokemon-image">
                            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
                        </div>
                        <div class="pokemon-info">
                            <div class="container-name">
                                <p class="pokemon-id">#${pokeId}</p>
                                <h2 class="pokemon-name">${poke.name}</h2>
                            </div>
                            <div class="pokemon-types">
                                ${tipos}
                            </div>
                            <div class="pokemon-stats">
                                <p class="height">${poke.height} m</p>
                                <p class="weight">${poke.weight} kg</p>
                            </div>
                        </div>
                    </div> 
        
    `;
    pokemonList.append(div);
}

headerButtons.forEach(boton => boton.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id;

    pokemonList.innerHTML = "";

    for(let i = 1; i <= 151; i++) {
        fetch(url + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "see-all")  {
                    showPokemons(data);
                } else {
                    
                const pokemonTypes = data.types.map(type => type.type.name);
                if(pokemonTypes.some(pokemonTypes => pokemonTypes.includes(botonId))) {
                    showPokemons(data);
                }
                }
            })
    }
}))