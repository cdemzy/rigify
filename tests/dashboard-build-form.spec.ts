import { expect, test } from '@playwright/test'

test('fills the dashboard build form, adds Warzone, and submits', async ({
	page,
}) => {
	await page.goto('/dashboard')

	await expect(page.getByRole('heading', { name: 'Build dashboard' })).toBeVisible()

	await page.getByLabel('CPU').fill('Ryzen 9 9700X')
	await page.getByLabel('GPU').fill('RTX 5070')
	await page.getByLabel('Capacity').selectOption('32GB')
	await page.getByLabel('Generation').selectOption('DDR5')
	await page.getByLabel('Resolution').fill('1440p')
	await page.getByLabel('Refresh rate').fill('165hz')
	await page.getByLabel('Add a game').fill('Warzone')
	await page.getByRole('button', { name: 'Add' }).click()

	await expect(page.getByRole('button', { name: /Warzone/i })).toBeVisible()

	await page.getByRole('button', { name: 'Evaluate' }).click()
})
