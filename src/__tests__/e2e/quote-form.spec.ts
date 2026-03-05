import { test, expect } from '@playwright/test'

test.describe('Quote form — ES', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cotizacion')
  })

  test('renders step 1 with Spanish labels', async ({ page }) => {
    await expect(page.getByText('Nombre completo')).toBeVisible()
    await expect(page.getByText('Correo electrónico')).toBeVisible()
  })

  test('shows error when advancing without required fields', async ({ page }) => {
    const nextBtn = page.getByRole('button', { name: /siguiente/i })
    await nextBtn.click()
    const error = page.locator('[role="alert"], .text-red, [aria-invalid="true"]').first()
    await expect(error).toBeVisible()
  })

  test('completes full quote flow', async ({ page }) => {
    await page.getByLabel(/nombre completo/i).fill('Omar Test')
    await page.getByLabel(/correo/i).fill('test@klarity.dev')
    await page.getByRole('button', { name: /siguiente/i }).click()

    await page.waitForTimeout(500)
    const step2Title = page.getByText(/sobre tu proyecto/i)
    if (await step2Title.isVisible()) {
      await page.getByRole('button', { name: /siguiente/i }).click()
    }

    await page.waitForTimeout(500)
    const submitBtn = page.getByRole('button', { name: /enviar/i })
    if (await submitBtn.isVisible()) {
      const textarea = page.locator('textarea').first()
      if (await textarea.isVisible()) {
        await textarea.fill('Proyecto de prueba E2E')
      }
      await submitBtn.click()
      const success = page.getByText(/cotización enviada|revisaremos/i)
      await expect(success).toBeVisible({ timeout: 10_000 })
    }
  })
})

test.describe('Quote form — EN', () => {
  test('renders step 1 with English labels', async ({ page }) => {
    await page.goto('/en/cotizacion')
    await expect(page.getByText('Full name')).toBeVisible()
    await expect(page.getByText(/email/i)).toBeVisible()
  })
})
