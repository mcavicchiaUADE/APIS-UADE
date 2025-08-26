import React from 'react';

// componente que recibe props con valores, funciones y children
const ComponenteClase4 = ({ 
  titulo, // prop con valor (string)
  contador, // prop con valor (number)
  es_activo, // prop con valor (boolean)
  on_click, // prop con función (callback)
  on_cambio, // prop con función (callback)
  children // prop children (contenido anidado)
}) => {
  return (
    <div className={`mi-componente ${es_activo ? 'activo' : 'inactivo'}`}>
      {/* muestra el título recibido como prop */}
      <h2>{titulo}</h2>
      
      {/* muestra el contador recibido como prop */}
      <p>contador: {contador}</p>
      
      {/* botón que ejecuta la función recibida como prop */}
      <button onClick={on_click}>
        hacer clic
      </button>
      
      {/* input que ejecuta función de cambio */}
      <input 
        type="text" 
        onChange={on_cambio}
        placeholder="escribe algo..."
      />
      
      {/* renderiza el contenido children */}
      <div className="contenido-hijos">
        {children}
      </div>
    </div>
  );
};

export default ComponenteClase4;
