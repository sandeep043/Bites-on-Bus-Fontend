// @ts-check
import { test, expect } from '@playwright/test';


test('should login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Traveler Account' }).click();

    // Assert login form is visible
    await expect(page.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Enter your password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Enter your email' }).fill('sandeep.talari8999@gmail.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('sandeep@123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Assert toast notification appears
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(/Login successful as traveler/i);
});

test('should show error for invalid email', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Traveler Account' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('wrong@example.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(/Invalid email/i);
});

test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Traveler Account' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('sandeep.talari8999@gmail.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(/Invalid credentials/i);
});

test('should render login form', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Traveler Account' }).click();
    await expect(page.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Enter your password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});


test('should login as restaurant owner', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Restaurant Partner$/ }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('jagan@gmail.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Jagan@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await page.getByRole('tab', { name: 'Menu Editor' }).click();
    await page.getByRole('tab', { name: 'Performance Analytics' }).click();
    await page.getByRole('tab', { name: 'Order Management' }).click();
});


test('should login as Admin', async ({ page }) => {

    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Admin$/ }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('Admin@gmail.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Admin@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await page.getByRole('button', { name: 'Users' }).click();
    await page.getByRole('button', { name: 'Restaurants' }).click();
    await page.getByRole('button', { name: 'Delivery Agents' }).click();
    await page.getByRole('button', { name: 'Agent List' }).click();


});


test('should login as Delivery Agent', async ({ page }) => {

    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Delivery Agent$/ }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('varshini@gamil.com');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('varshini@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await page.getByRole('tab', { name: 'Available Orders' }).click();
    await page.locator('li').filter({ hasText: 'Delivery History' }).click();
   

});