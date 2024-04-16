const characters_container = document.getElementById("characters");
const nav_menu_icon = document.querySelector(".nav-menu-icon");
const search_input = document.getElementById("search-input");
const nav_links = document.querySelector(".nav-links");
const url = "https://rickandmortyapi.com/api/character";
let next = "";
let prev = "";

nav_menu_icon.addEventListener("click", () => {
  nav_menu_icon.classList.toggle("responsive");
  nav_links.classList.toggle("hiden");
});

search_input.addEventListener("keydown", () => {
  const html_name_input = search_input.value;
  searchCharacter(html_name_input);
});

async function searchCharacter(name) {
  const url2 = "https://rickandmortyapi.com/api/character/?name=";

  try {
    const response = await fetch(url2 + name);
    const { results } = await response.json();
    characters_container.innerText = "";
    drawCharacter(results);
  } catch (error) {
    characters_container.innerHTML = `<h3 class="message-error-character">No existe el personaje.</h3> `;
  }
}

async function getCharacters(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { results, info } = data;
    prev = info.prev;
    next = info.next;
    drawCharacter(results);
  } catch (error) {
    if (error.code === 404) {
      characters_container.innerHTML = `<h3 class="message-error">${error}</h3>`;
    }
    characters_container.innerHTML = `<h3 class="message-error">No se pueden obtener los personajes.</h3> `;
  }
}

const drawCharacter = (characters) => {
  characters.map((character) => {
    const { image, name, status } = character;
    characters_container.innerHTML += `
            <div class = "character">
                <img src="${image}" class="character-image">
                <h2 class="character-name">${name}</h2>
                <p class="character-status"><span>${status}</span></p>
            </div>
        `;
  });
};

const Prev = () => {
  if (prev !== null) {
    characters_container.innerHTML = "";
    getCharacters(prev);
  } else {
    alert("No se puede hacer eso en este momento.");
  }
};

const Next = () => {
  characters_container.innerHTML = "";
  getCharacters(next);
};

getCharacters(url);
