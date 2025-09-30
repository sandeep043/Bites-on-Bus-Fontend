import { test, expect } from '@playwright/test';
import { loginAsTraveler } from '../test-utils/loginHelper';



test.describe('Traveler Order Flow', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTraveler(page);
    });

    test('end-to-end food ordering', async ({ page }) => {
        await page.getByRole('button', { name: 'Food Order' }).click();
        await page.getByRole('textbox', { name: 'e.g.,' }).click();
        await page.getByRole('textbox', { name: 'e.g.,' }).fill('PNR1001');
        await page.getByRole('button', { name: 'Find My Bus' }).click();
        await page.getByText('North StopCity B ETA: 2025-08').click();
        await page.getByRole('button', { name: 'Continue to Restaurants' }).click();
        await page.getByRole('img', { name: 'Jagan\'s muntha masala' }).click();
        await page.getByRole('button', { name: 'View Menu' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
        await page.getByRole('textbox', { name: 'Enter passenger name' }).click();
        await page.getByRole('textbox', { name: 'Enter passenger name' }).fill('naga lakshmi');
        await page.getByRole('textbox', { name: 'Enter phone number' }).click();
        await page.getByRole('textbox', { name: 'Enter phone number' }).fill('8000050000');
        await page.getByRole('textbox', { name: 'Enter seat number (e.g., 12A)' }).click();
        await page.getByRole('textbox', { name: 'Enter seat number (e.g., 12A)' }).fill('4B');
        await page.getByRole('button', { name: 'Pay ₹' }).click();
        await page.getByRole('button', { name: 'Proceed to Payment' }).click();
        await page.getByText('Wallet').click();
        await page.getByTestId('item-AMON').locator('div').filter({ hasText: 'Airtel Payments Bank' }).first().click();
        await page.getByTestId('item-AMON').getByRole('button', { name: 'PROCEED' }).click();
        await page.getByRole('textbox', { name: 'Enter OTP as' }).click();
        await page.getByRole('textbox', { name: 'Enter OTP as' }).fill('123456');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Simulate Success Response' }).click();
        await page.getByRole('button', { name: 'Track Order' }).click();
        await page.getByRole('button', { name: 'Food Order' }).click();

    }) 





});
