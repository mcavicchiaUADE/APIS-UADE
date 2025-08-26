// ========================================
// FUNCIONES DE API Y FETCH
// ========================================
// Este archivo contiene todas las funciones que se comunican con la PokeAPI
// Utilizamos async/await para manejar operaciones asíncronas de manera elegante

// ========================================
// FUNCIÓN UTILITARIA PARA FETCH
// ========================================

/**
 * Función fetchJSON con manejo de errores robusto
 * Esta función envuelve la API nativa fetch() para simplificar su uso
 * y agregar manejo de errores consistente en toda la aplicación
 * 
 * @param {string} url - La URL completa a la cual hacer la petición HTTP
 * @returns {Promise<Object>} Los datos JSON de la respuesta
 * @throws {Error} Si hay un error de red o HTTP
 */
async function fetchJSON(url) {
    try {
        // Realizamos la petición HTTP usando la API fetch nativa
        // fetch() devuelve una Promise que se resuelve con un objeto Response
        const response = await fetch(url);
        
        // Verificamos si la respuesta HTTP fue exitosa (status 200-299)
        // response.ok es true si el status está en el rango 200-299
        if (!response.ok) {
            // Si no es ok, creamos un error personalizado con el status HTTP
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            error.status = response.status; // Agregamos el status al error para manejarlo después
            throw error; // Lanzamos el error para que sea capturado por el catch
        }
        
        // Si todo está bien, parseamos la respuesta como JSON
        // response.json() también devuelve una Promise
        return await response.json();
        
    } catch (error) {
        // Capturamos cualquier error que haya ocurrido
        if (error.name === 'TypeError') {
            // TypeError generalmente indica un problema de conexión (sin internet, CORS, etc.)
            throw new Error('Error de conexión. Verifica tu conexión a internet.');
        }
        // Re-lanzamos otros errores para que sean manejados por las funciones que llaman
        throw error;
    }
}

// ========================================
// FUNCIONES PARA OBTENER DATOS DE POKÉMON
// ========================================

/**
 * Obtiene los detalles completos de un Pokémon específico
 * Esta función es la base para obtener toda la información de un Pokémon
 * 
 * @param {string|number} nameOrId - El nombre o ID del Pokémon a buscar
 * @returns {Promise<Object|null>} Los datos del Pokémon o null si hay error
 */
async function fetchPokemonDetails(nameOrId) {
    try {
        // Construimos la URL completa usando la configuración de la API
        // API_CONFIG.baseUrl = 'https://pokeapi.co/api/v2'
        // API_CONFIG.endpoints.pokemon = '/pokemon'
        // Resultado: 'https://pokeapi.co/api/v2/pokemon/pikachu'
        const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pokemon}/${nameOrId}`;
        
        // Llamamos a nuestra función fetchJSON que maneja los errores
        return await fetchJSON(url);
        
    } catch (error) {
        // Si hay un error, lo registramos en consola para debugging
        console.error(`Error obteniendo detalles de ${nameOrId}:`, error);
        // Retornamos null en lugar de lanzar el error para manejo más suave
        return null;
    }
}

// ========================================
// FUNCIONES PARA CARGAR TIPOS DE POKÉMON
// ========================================

/**
 * Carga la lista completa de tipos de Pokémon desde la API
 * Esta función se ejecuta al iniciar la aplicación para poblar el selector de tipos
 * También filtra tipos irrelevantes como 'unknown' y 'shadow'
 */
async function loadTypes() {
    try {
        // Hacemos la petición a /type para obtener todos los tipos disponibles
        const response = await fetchJSON(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.types}`);
        
        // Filtramos los tipos para excluir los que no son estándar del juego
        // response.results es un array con objetos {name: "fire", url: "..."}
        currentState.types = response.results.filter(type => 
            !['unknown', 'shadow'].includes(type.name)
        );
        
        // Poblamos dinámicamente el selector de tipos en el HTML
        // Esto crea las opciones <option> del <select> en tiempo real
        currentState.types.forEach(type => {
            // Creamos un nuevo elemento <option> para cada tipo
            const option = document.createElement('option');
            option.value = type.name; // El valor que se enviará al servidor
            // Capitalizamos la primera letra para mejor presentación
            option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
            
            // Agregamos la opción al selector de tipos
            elements.typeFilter.appendChild(option);
        });
        
    } catch (error) {
        // Si hay un error cargando tipos, lo registramos y re-lanzamos
        console.error('Error cargando tipos:', error);
        throw error; // Re-lanzamos para que la función que llama pueda manejarlo
    }
}

// ========================================
// FUNCIONES PARA PAGINACIÓN Y LISTADO
// ========================================

/**
 * Carga una página específica de Pokémon con paginación
 * Esta función implementa paginación usando limit y offset
 * 
 * @param {number} page - El número de página (0 = primera página)
 */
async function loadPage(page) {
    try {
        // Calculamos el offset basado en la página y el límite
        // offset = 0 para página 0, offset = 20 para página 1, etc.
        const offset = page * currentState.limit;
        
        // Mostramos el estado de carga al usuario
        showLoading();
        
        // Hacemos la petición a la API con parámetros de paginación
        // limit: cuántos Pokémon por página
        // offset: desde qué posición empezar
        const response = await fetchJSON(
            `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pokemon}?limit=${currentState.limit}&offset=${offset}`
        );
        
        // Actualizamos el estado global de la aplicación
        currentState.currentPage = page;           // Página actual
        currentState.totalCount = response.count;  // Total de Pokémon disponibles
        currentState.currentResults = response.results; // Lista básica de esta página
        
        // IMPORTANTE: La API solo devuelve información básica (nombre, URL)
        // Necesitamos hacer peticiones adicionales para obtener detalles completos
        // Usamos Promise.all para hacer todas las peticiones en paralelo (más rápido)
        const pokemonDetails = await Promise.all(
            response.results.map(pokemon => fetchPokemonDetails(pokemon.name))
        );
        
        // Renderizamos los resultados en la interfaz
        renderResults(pokemonDetails);
        
        // Actualizamos los controles de paginación (botones anterior/siguiente)
        updatePagination();
        
    } catch (error) {
        // Si hay un error, mostramos un mensaje amigable al usuario
        showError('Error al cargar la página de Pokémon');
        // También lo registramos en consola para debugging
        console.error('Error cargando página:', error);
    }
}

// ========================================
// FUNCIONES DE BÚSQUEDA
// ========================================

/**
 * Busca un Pokémon específico por su nombre exacto
 * Esta función es útil para búsquedas directas del usuario
 * 
 * @param {string} name - El nombre exacto del Pokémon a buscar
 */
async function searchByName(name) {
    try {
        // Intentamos obtener los detalles del Pokémon
        const pokemon = await fetchPokemonDetails(name);
        
        if (pokemon) {
            // Si encontramos el Pokémon, actualizamos el estado
            currentState.currentResults = [pokemon]; // Solo este Pokémon
            renderResults([pokemon]);               // Lo mostramos
            elements.paginationSection.style.display = 'none'; // Ocultamos paginación
        } else {
            // Si no lo encontramos, mostramos mensaje apropiado
            showNoResults(`No se encontró el Pokémon "${name}"`);
        }
        
    } catch (error) {
        // Manejamos específicamente el error 404 (no encontrado)
        if (error.status === 404) {
            showNoResults(`No se encontró el Pokémon "${name}"`);
        } else {
            // Para otros errores, re-lanzamos para manejo superior
            throw error;
        }
    }
}

/**
 * Busca un Pokémon por nombre Y tipo específico
 * Esta función combina búsqueda por nombre con filtro por tipo
 * Es útil para casos como "buscar un Pokémon de fuego llamado charmander"
 * 
 * @param {string} name - El nombre del Pokémon
 * @param {string} type - El tipo que debe tener
 */
async function searchByNameAndType(name, type) {
    try {
        // Primero obtenemos los detalles del Pokémon
        const pokemon = await fetchPokemonDetails(name);
        
        // Verificamos que el Pokémon existe Y que tiene el tipo especificado
        if (pokemon && pokemon.types.some(t => t.type.name === type)) {
            // Si cumple ambas condiciones, lo mostramos
            currentState.currentResults = [pokemon];
            renderResults([pokemon]);
            elements.paginationSection.style.display = 'none';
        } else {
            // Si no cumple las condiciones, mostramos mensaje específico
            showNoResults(`No se encontró el Pokémon "${name}" del tipo "${type}"`);
        }
        
    } catch (error) {
        // Manejamos el error 404 de la misma manera
        if (error.status === 404) {
            showNoResults(`No se encontró el Pokémon "${name}"`);
        } else {
            throw error;
        }
    }
}

// ========================================
// FUNCIÓN PARA FILTRAR POR TIPO
// ========================================

/**
 * Carga todos los Pokémon de un tipo específico
 * Esta función es útil para explorar Pokémon por elemento
 * 
 * @param {string} typeName - El nombre del tipo (ej: "fire", "water")
 */
async function loadByType(typeName) {
    try {
        // Hacemos la petición al endpoint de tipos para obtener la lista de Pokémon
        const response = await fetchJSON(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.types}/${typeName}`);
        
        // La API devuelve TODOS los Pokémon de ese tipo, pero limitamos la cantidad
        // para no sobrecargar la interfaz. Tomamos solo los primeros 'limit' Pokémon
        const pokemonList = response.pokemon.slice(0, currentState.limit);
        
        // Ahora necesitamos obtener los detalles completos de cada Pokémon
        // Usamos Promise.all para hacer todas las peticiones en paralelo
        const pokemonDetails = await Promise.all(
            pokemonList.map(p => fetchPokemonDetails(p.pokemon.name))
        );
        
        // Filtramos los resultados nulos (en caso de errores individuales)
        currentState.currentResults = pokemonDetails.filter(p => p !== null);
        
        // Renderizamos los resultados y ocultamos la paginación
        renderResults(currentState.currentResults);
        elements.paginationSection.style.display = 'none';
        
    } catch (error) {
        // Manejamos errores mostrando mensaje al usuario
        showError('Error al cargar Pokémon por tipo');
        console.error('Error cargando por tipo:', error);
    }
}
