import { useEffect, useState } from 'react'

const useDarkMode = (): [string, () => void, boolean] => {
  const [theme, setTheme] = useState<string>('light')
  const [componentMounted, setComponentMounted] = useState<boolean>(false)

  const setMode = (mode: string): void => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = (): void => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')

    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
      ? setMode('dark')
      : localTheme
      ? setTheme(localTheme)
      : setMode('light')

    setComponentMounted(true)
  }, [])

  return [theme, toggleTheme, componentMounted]
}

export default useDarkMode
