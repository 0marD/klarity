import { test, expect } from '@playwright/test'

test.describe('Theme toggle', () => {
  test('loads in light mode by default (fresh session)', async ({ page }) => {
    await page.goto('/')
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(theme).toBe('light')
  })

  test('toggles to dark mode on click', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /tema|theme/i }).first()
    await toggle.click()
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(theme).toBe('dark')
  })

  test('persists dark mode after reload', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /tema|theme/i }).first()
    await toggle.click()
    await page.reload()
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(theme).toBe('dark')
  })

  test('inline script applies theme before hydration', async ({ page }) => {
    await page.evaluate(() =>
      localStorage.setItem('klarity_theme', 'dark')
    )
    await page.goto('/')
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(theme).toBe('dark')
  })
})
