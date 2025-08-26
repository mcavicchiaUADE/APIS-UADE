import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ComponenteClase4 from './ComponenteClase4'

const App = () => {
  const [contador, set_contador] = useState(0)
  const [es_activo, set_es_activo] = useState(true)
  const [texto, set_texto] = useState('')

  // función que se pasa como prop
  const manejar_clic = () => {
    set_contador(contador + 1)
    console.log('botón clickeado')
  }

  // función que maneja cambios en el input
  const manejar_cambio = (evento) => {
    set_texto(evento.target.value)
    console.log('texto cambiado:', evento.target.value)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      {/* el nuevo componente!! */}
      <ComponenteClase4
        titulo="Prueba de componente para la clase 4"
        contador={contador}
        es_activo={es_activo}
        on_click={manejar_clic}
        on_cambio={manejar_cambio}
      >
        {/* contenido children */}
        <p>este es el contenido children del componente</p>
        <button onClick={() => set_es_activo(!es_activo)}>
          cambiar estado: {es_activo ? 'activo' : 'inactivo'}
        </button>
        <p>texto ingresado: {texto}</p>
      </ComponenteClase4>

      <div className="card">
        <button onClick={() => set_contador((contador) => contador + 1)}>
          count is {contador}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
