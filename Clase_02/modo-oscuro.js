// Modo oscuro sin eventos ni localStorage, solo DOM y propiedades nativas
// Refactor: función flecha, sin IIFE innecesario, y comprobación de existencia del botón
const btnTema = document.getElementById('temaOscuroBtn');
if (btnTema) {
    // Cambia el símbolo según el modo
    const actualizarIcono = () => {
        if (document.body.classList.contains('tema-oscuro')) {
            btnTema.textContent = '🌙 Noche';
            btnTema.title = 'Cambiar a modo día';
        } else {
            btnTema.textContent = '☀️ Día';
            btnTema.title = 'Cambiar a modo noche';
        }
    };
    btnTema.onclick = () => {
        document.body.classList.toggle('tema-oscuro');
        actualizarIcono();
    };
    actualizarIcono(); // Inicializa el icono según el modo actual
}
