import '../styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <header className="p-4 bg-green-600 dark:bg-green-900 text-white flex justify-between items-center">
        <h1 className="font-bold text-xl">FormulexLab 🌱</h1>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="bg-green-800 dark:bg-green-700 px-3 py-1 rounded"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300">
        <Component {...pageProps} />
      </main>
      <footer className="p-4 bg-green-600 dark:bg-green-900 text-white text-center">
        © 2025 FormulexLab. All rights reserved.
      </footer>
    </>
  )
}
