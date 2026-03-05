import { test, expect } from '@playwright/test'

test.describe('Language switcher', () => {
  test('default locale is Spanish', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('No vendemos código. Resolvemos negocios.')).toBeVisible()
  })

  test('switches to English and updates URL', async ({ page }) => {
    await page.goto('/')
    const switcher = page.getByRole('button', { name: /en|english|idioma/i }).first()
    await switcher.click()
    await page.waitForURL(/\/en/)
    await expect(page).toHaveURL(/\/en/)
    await expect(page.getByText("We don't sell code. We solve businesses.")).toBeVisible()
  })

  test('sets klarity_locale cookie after switch', async ({ page, context }) => {
    await page.goto('/')
    const switcher = page.getByRole('button', { name: /en|english|idioma/i }).first()
    await switcher.click()
    await page.waitForURL(/\/en/)
    const cookies = await context.cookies()
    const localeCookie = cookies.find((c) => c.name === 'klarity_locale')
    expect(localeCookie?.value).toBe('en')
  })

  test('switches from /en/portafolio back to /portafolio', async ({ page }) => {
    await page.goto('/en/portafolio')
    const switcher = page.getByRole('button', { name: /es|español|idioma/i }).first()
    await switcher.click()
    await page.waitForURL(/\/portafolio/)
    expect(page.url()).not.toContain('/en/')
  })
})
