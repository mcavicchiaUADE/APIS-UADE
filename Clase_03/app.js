// Lógica principal de la aplicación

// Elementos del DOM
const elements = {
    form: document.getElementById('searchForm'),
    searchInput: document.getElementById('pokemonSearch'),
    typeFilter: document.getElementById('typeFilter'),
    limitSelect: document.getElementById('limitSelect'),
    searchBtn: document.getElementById('searchBtn'),
    clearBtn: document.getElementById('clearBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    pageInfo: document.getElementById('pageInfo'),
    paginationSection: document.getElementById('paginationSection'),
    resultsSection: document.getElementById('resultsSection'),
    resultsContent: document.getElementById('resultsContent'),
    resultsCount: document.getElementById('resultsCount'),
    statusMessage: document.getElementById('statusMessage'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalTitle: document.getElementById('modalTitle'),
    modalContent: document.getElementById('modalContent'),
    modalClose: document.getElementById('modalClose')
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeApp();
});

// Configurar event listeners
function setupEventListeners() {
    elements.form.addEventListener('submit', handleSearch);
    elements.clearBtn.addEventListener('click', clearFilters);
    elements.prevBtn.addEventListener('click', () => changePage(-1));
    elements.nextBtn.addEventListener('click', () => changePage(1));
    elements.modalClose.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) closeModal();
    });
    
    // Debounce para búsquedas mientras se escribe
    elements.searchInput.addEventListener('input', debounce(handleInputChange, 300));
    elements.typeFilter.addEventListener('change', handleTypeChange);
    elements.limitSelect.addEventListener('change', handleLimitChange);
}

// Inicializar la aplicación
async function initializeApp() {
    try {
        announceStatus('Cargando tipos de Pokémon...');
        await loadTypes();
        announceStatus('Cargando primera página de Pokémon...');
        await loadPage(0);
        announceStatus('Aplicación lista. Busca Pokémon por nombre o filtra por tipo.');
    } catch (error) {
        showError('Error al inicializar la aplicación');
        console.error('Error de inicialización:', error);
    }
}

// Manejador de búsqueda
async function handleSearch(event) {
    event.preventDefault();
    
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    const selectedType = elements.typeFilter.value;
    
    if (!searchTerm && !selectedType) {
        // Si no hay búsqueda ni tipo, cargar página normal
        await loadPage(0);
        return;
    }
    
    try {
        showLoading();
        
        if (searchTerm) {
            // Búsqueda por nombre
            if (selectedType) {
                // Búsqueda por nombre + tipo
                await searchByNameAndType(searchTerm, selectedType);
            } else {
                // Solo búsqueda por nombre
                await searchByName(searchTerm);
            }
        } else if (selectedType) {
            // Solo filtro por tipo
            await loadByType(selectedType);
        }
        
    } catch (error) {
        showError('Error en la búsqueda');
        console.error('Error de búsqueda:', error);
    }
}

// Manejador de cambios en inputs
function handleInputChange() {
    // Implementar búsqueda automática si se desea
}

// Manejador de cambio de tipo
function handleTypeChange() {
    currentState.selectedType = elements.typeFilter.value;
    if (currentState.selectedType) {
        elements.searchInput.value = '';
        currentState.searchTerm = '';
    }
}

// Manejador de cambio de límite
function handleLimitChange() {
    currentState.limit = parseInt(elements.limitSelect.value);
    loadPage(0);
}

// Cambiar página
async function changePage(direction) {
    const newPage = currentState.currentPage + direction;
    if (newPage >= 0 && newPage * currentState.limit < currentState.totalCount) {
        await loadPage(newPage);
    }
}

// Limpiar filtros
function clearFilters() {
    elements.form.reset();
    currentState.searchTerm = '';
    currentState.selectedType = '';
    currentState.currentPage = 0;
    loadPage(0);
    announceStatus('Filtros limpiados');
}

// Función debounce
function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(debounceTimer);
            func(...args);
        };
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(later, wait);
    };
}
