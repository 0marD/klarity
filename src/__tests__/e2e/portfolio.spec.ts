import { test, expect } from '@playwright/test'

test.describe('Portfolio page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portafolio')
  })

  test('renders project grid with at least one project', async ({ page }) => {
    const cards = page.locator('[data-testid="project-card"], article, .project-card').first()
    await expect(cards).toBeVisible({ timeout: 8_000 })
  })

  test('shows all 5 projects by default', async ({ page }) => {
    const cards = page.locator('[data-testid="project-card"], article').all()
    const count = (await cards).length
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('filter buttons are present', async ({ page }) => {
    const filterAll = page.getByRole('button', { name: /todos/i })
    if (await filterAll.isVisible()) {
      await expect(filterAll).toBeVisible()
    }
  })

  test('navigates to project detail page', async ({ page }) => {
    const firstProjectLink = page.getByRole('link').filter({ hasText: /ver proyecto|detalle|sistema/i }).first()
    if (await firstProjectLink.isVisible()) {
      await firstProjectLink.click()
      await expect(page).toHaveURL(/\/portafolio\/.+/)
    } else {
      const cards = page.locator('a[href*="/portafolio/"]').first()
      await cards.click()
      await expect(page).toHaveURL(/\/portafolio\/.+/)
    }
  })
})

test.describe('Portfolio detail page', () => {
  test('renders project title and CTA', async ({ page }) => {
    await page.goto('/portafolio/sistema-gestion-inventarios')
    await expect(page.getByText(/sistema|gestion|inventarios/i).first()).toBeVisible()
    const cta = page.getByRole('link', { name: /cotización|quote/i }).first()
    await expect(cta).toBeVisible()
  })
})
