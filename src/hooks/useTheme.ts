'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('klarity_theme') as Theme | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (systemPrefersDark ? 'dark' : 'light')
    applyTheme(initial)
    setTheme(initial)
  }, [])

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('klarity_theme', t)
  }

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    setTheme(next)
  }

  const set = (t: Theme) => {
    applyTheme(t)
    setTheme(t)
  }

  return { theme, toggle, set }
}
