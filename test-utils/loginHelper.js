// loginHelper.js
// Playwright login helper for tests

/**
 * Logs in as a traveler user.
 * @param {import('@playwright/test').Page} page - Playwright page object
 */ 
import { expect } from '@playwright/test';

export async function loginAsTraveler(page) {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Traveler Account$/ }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('sandeep.talari8999@gmail.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('sandeep@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(/Login successful as traveler/i);
}
