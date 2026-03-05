import { test, expect } from '@playwright/test'

test.describe('Admin auth guard', () => {
  test('redirects /admin to /login without session', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/login/)
  })

  test('login page renders email input and submit button', async ({ page }) => {
    await page.goto('/login')
    const emailInput = page.getByRole('textbox', { name: /email|correo/i })
    await expect(emailInput).toBeVisible()
    const submitBtn = page.getByRole('button', { name: /entrar|iniciar|acceder|magic|link/i })
    await expect(submitBtn).toBeVisible()
  })

  test('submitting valid email shows confirmation message', async ({ page }) => {
    await page.goto('/login')
    const emailInput = page.getByRole('textbox', { name: /email|correo/i })
    await emailInput.fill('test@klarity.dev')
    const submitBtn = page.getByRole('button').first()
    await submitBtn.click()
    const confirmation = page.getByText(/correo|revisa|check|enviado|sent/i).first()
    await expect(confirmation).toBeVisible({ timeout: 10_000 })
  })
})
