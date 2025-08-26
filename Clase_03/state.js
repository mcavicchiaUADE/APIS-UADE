// Estado global de la aplicación
let currentState = {
    searchTerm: '',
    selectedType: '',
    currentPage: 0,
    limit: 20,
    totalCount: 0,
    currentResults: [],
    types: []
};

let debounceTimer = null;
