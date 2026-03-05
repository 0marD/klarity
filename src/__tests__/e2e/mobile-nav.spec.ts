import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 375, height: 812 } })

test.describe('Mobile navigation (375×812)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hamburger menu button is visible', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /abrir menú|open menu/i })
    await expect(hamburger).toBeVisible()
  })

  test('desktop nav links are hidden', async ({ page }) => {
    const desktopNav = page.locator('nav .hidden.md\\:flex, nav [class*="md:flex"]').first()
    if (await desktopNav.count() > 0) {
      await expect(desktopNav).not.toBeVisible()
    }
  })

  test('opens mobile menu on hamburger click', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /abrir menú|open menu/i })
    await hamburger.click()
    const menuLink = page.getByRole('link', { name: /portafolio/i }).first()
    await expect(menuLink).toBeVisible()
  })

  test('closes menu when nav link is clicked', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /abrir menú|open menu/i })
    await hamburger.click()
    const link = page.getByRole('link', { name: /portafolio/i }).first()
    await link.click()
    await page.waitForTimeout(500)
    const hamburgerAfter = page.getByRole('button', { name: /abrir menú|open menu/i })
    await expect(hamburgerAfter).toBeVisible()
  })

  test('ThemeToggle is accessible in mobile menu', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /abrir menú|open menu/i })
    await hamburger.click()
    const themeToggle = page.getByRole('button', { name: /tema|theme/i }).first()
    await expect(themeToggle).toBeVisible()
  })
})
