const form = document.getElementById("pokemon-form");
const input = document.getElementById("pokemon-name");
const infoContainer = document.getElementById("pokemon-info");

async function getPokemon(event) {
  event.preventDefault();

  const pokemonName = input.value.trim().toLowerCase();
  input.value = "";

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Pokemon not found!");
    }

    const pokemon = await response.json();

    infoContainer.innerHTML = `
            <div class="card">
            <!-- .other["official-artwork"] fã art-->
                <img class="card-img" src="${
                  pokemon.sprites.front_default
                }" alt="${pokemon.name}" >
                <div class="card-aside">
                    <h3>#${pokemon.order}</h3>
                    <h2>${pokemon.name}</h2>
                    <p><strong>Height:</strong>${pokemon.height / 10} m</p>
                    <p><strong>Weight:</strong>${pokemon.weight / 10} kg</p>
                    <p><strong>Types:</strong>${pokemon.types
                      .map((type) => type.type.name)
                      .join(", ")}</p>
                </div>
                </div>
        `;
  } catch (error) {
    console.error("Error", error);

    infoContainer.innerHTML = `
        <p>Erro: Pokemon not found, try again in a few minutes...</p>
        `;
  }
}

form.addEventListener("submit", getPokemon);
