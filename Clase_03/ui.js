// Funciones de interfaz y renderizado

// Renderizar resultados
function renderResults(pokemonList) {
    if (!pokemonList || pokemonList.length === 0) {
        showNoResults('No se encontraron Pokémon con los criterios especificados');
        return;
    }
    
    const resultsHTML = pokemonList.map(pokemon => createPokemonCard(pokemon)).join('');
    
    elements.resultsContent.innerHTML = `
        <div class="pokemon-grid">
            ${resultsHTML}
        </div>
    `;
    
    elements.resultsCount.textContent = pokemonList.length;
    elements.resultsSection.style.display = 'block';
    announceStatus(`Se encontraron ${pokemonList.length} Pokémon`);
}

// Crear tarjeta de Pokémon
function createPokemonCard(pokemon) {
    const typesHTML = pokemon.types.map(type => 
        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
    ).join('');
    
    return `
        <div class="pokemon-card" onclick="showPokemonDetail('${pokemon.name}')">
            <img class="pokemon-sprite" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" loading="lazy">
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
            <div class="pokemon-types">
                ${typesHTML}
            </div>
        </div>
    `;
}

// Mostrar detalle del Pokémon
async function showPokemonDetail(name) {
    try {
        const pokemon = await fetchPokemonDetails(name);
        if (!pokemon) return;
        
        elements.modalTitle.textContent = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
        
        const spriteUrl = pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default;
        
        const typesHTML = pokemon.types.map(type => 
            `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
        ).join('');
        
        const abilitiesHTML = pokemon.abilities.map(ability => 
            `<li>${ability.ability.name.replace('-', ' ')}</li>`
        ).join('');
        
        const statsHTML = pokemon.stats.map(stat => `
            <div class="stat-item">
                <span class="stat-name">${stat.stat.name.replace('-', ' ')}</span>
                <span class="stat-value">${stat.base_stat}</span>
            </div>
        `).join('');
        
        elements.modalContent.innerHTML = `
            <div class="pokemon-detail">
                <img class="detail-sprite" src="${spriteUrl}" alt="${pokemon.name}">
                
                <div class="detail-info">
                    <div class="info-section">
                        <h4>Tipos</h4>
                        <div class="pokemon-types">
                            ${typesHTML}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h4>Habilidades</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${abilitiesHTML}
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <h4>Características</h4>
                        <p><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(1)}m</p>
                        <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)}kg</p>
                    </div>
                </div>
                
                <div class="info-section">
                    <h4>Estadísticas Base</h4>
                    <div class="stats-grid">
                        ${statsHTML}
                    </div>
                </div>
            </div>
        `;
        
        elements.modalOverlay.style.display = 'flex';
        announceStatus(`Mostrando detalles de ${pokemon.name}`);
        
    } catch (error) {
        showError('Error al cargar detalles del Pokémon');
        console.error('Error mostrando detalle:', error);
    }
}

// Cerrar modal
function closeModal() {
    elements.modalOverlay.style.display = 'none';
    announceStatus('Modal cerrado');
}

// Mostrar estado de carga
function showLoading() {
    elements.resultsSection.style.display = 'block';
    elements.resultsContent.innerHTML = `
        <div class="status-message loading">
            <div class="spinner"></div>
            <span>Cargando Pokémon...</span>
        </div>
    `;
    announceStatus('Cargando Pokémon...');
}

// Mostrar error
function showError(message) {
    elements.resultsSection.style.display = 'block';
    elements.resultsContent.innerHTML = `
        <div class="status-message error">
            <strong>Error:</strong> ${message}
        </div>
    `;
    announceStatus(`Error: ${message}`);
}

// Mostrar sin resultados
function showNoResults(message) {
    elements.resultsSection.style.display = 'block';
    elements.resultsContent.innerHTML = `
        <div class="status-message no-results">
            ${message}
        </div>
    `;
    elements.resultsCount.textContent = '0';
    elements.paginationSection.style.display = 'none';
    announceStatus(message);
}

// Actualizar controles de paginación
function updatePagination() {
    const totalPages = Math.ceil(currentState.totalCount / currentState.limit);
    const currentPage = currentState.currentPage + 1;
    
    elements.pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    elements.prevBtn.disabled = currentPage <= 1;
    elements.nextBtn.disabled = currentPage >= totalPages;
    elements.paginationSection.style.display = 'block';
}

// Anunciar estado para lectores de pantalla
function announceStatus(message) {
    elements.statusMessage.textContent = message;
}
