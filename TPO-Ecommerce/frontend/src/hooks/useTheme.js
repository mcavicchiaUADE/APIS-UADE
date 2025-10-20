import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Verificar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover clases anteriores
    root.classList.remove('light', 'dark')
    
    // Agregar clase del tema actual
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const setLightTheme = () => {
    setTheme('light')
  }

  const setDarkTheme = () => {
    setTheme('dark')
  }

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
