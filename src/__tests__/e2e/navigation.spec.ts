import { test, expect } from '@playwright/test'

const publicPages = [
  { path: '/', titleContains: 'Klarity' },
  { path: '/portafolio', titleContains: 'Portafolio' },
  { path: '/servicios', titleContains: 'Servicios' },
  { path: '/cotizacion', titleContains: 'Cotización' },
  { path: '/nosotros', titleContains: 'Klarity' },
  { path: '/blog', titleContains: 'Blog' },
  { path: '/contacto', titleContains: 'Contacto' },
]

test.describe('Public pages render without crash', () => {
  for (const { path, titleContains } of publicPages) {
    test(`renders ${path}`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).not.toBe(500)
      await expect(page).toHaveTitle(new RegExp(titleContains, 'i'))
    })
  }
})

test('skip-to-content link is present', async ({ page }) => {
  await page.goto('/')
  const skipLink = page.locator('a[href="#main-content"]')
  await expect(skipLink).toBeAttached()
})

test('Navbar is visible on home', async ({ page }) => {
  await page.goto('/')
  const nav = page.locator('nav')
  await expect(nav).toBeVisible()
})

test('Footer is visible on home', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()
})
