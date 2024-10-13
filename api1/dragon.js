let currentPage = 1; // Página actual
const limit = 10; // Número de personajes por página
const container = document.getElementById('character-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const searchInput = document.getElementById('search-input');
let allCharacters = []; // Almacena todos los personajes

// Función para obtener y mostrar personajes
function fetchCharacters(page) {
    fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            allCharacters = data.items; // Almacena todos los personajes
            displayCharacters(allCharacters); // Muestra los personajes almacenados
            updatePagination(data.meta.currentPage, data.meta.totalPages);
        })
        .catch(error => {
            console.error('Error al obtener los personajes:', error);
        });
}

// Función para mostrar personajes
function displayCharacters(characters) {
    container.innerHTML = ''; // Limpiar el contenedor de personajes

    characters.forEach(character => {
        // Crear una tarjeta para cada personaje
        const card = document.createElement('div');
        card.classList.add('character-card');

        // Imagen del personaje
        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;
        img.classList.add('character-image');
        card.appendChild(img);

        // Nombre del personaje
        const name = document.createElement('h2');
        name.textContent = character.name;
        name.classList.add('character-name');
        card.appendChild(name);

        // Raza del personaje
        const race = document.createElement('p');
        race.innerHTML = `Raza: <span>${character.race}</span>`;
        race.classList.add('character-info');
        card.appendChild(race);

        // Ki del personaje
        const ki = document.createElement('p');
        ki.innerHTML = `Ki: <span>${character.ki}</span>`;
        ki.classList.add('character-info');
        card.appendChild(ki);

        // Añadir la tarjeta al contenedor
        container.appendChild(card);
    });
}

// Función para actualizar los botones de paginación
function updatePagination(currentPage, totalPages) {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

// Eventos para los botones de paginación
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
});

// Función para filtrar personajes según la búsqueda
function filterCharacters() {
    const searchTerm = searchInput.value.toLowerCase(); // Obtener el texto de búsqueda
    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm) // Filtrar por nombre
    );
    displayCharacters(filteredCharacters); // Mostrar personajes filtrados
}

// Evento para la entrada de búsqueda
searchInput.addEventListener('input', filterCharacters);

// Cargar la primera página de personajes al iniciar
fetchCharacters(currentPage);