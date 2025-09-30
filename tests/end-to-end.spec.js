import { test, expect } from '@playwright/test';


test("end-to-end flow user booking , restaurant accepting and delivery agent delivering", async ({ browser }) => {

    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();

    //User logs in and places an order 

    await userPage.goto('http://localhost:3000/');
    await userPage.getByRole('button', { name: 'Login' }).click();
    await userPage.getByRole('heading', { name: 'Traveler Account' }).click();

    // Assert login form is visible
    await expect(userPage.getByRole('textbox', { name: 'Enter your email' })).toBeVisible();
    await expect(userPage.getByRole('textbox', { name: 'Enter your password' })).toBeVisible();
    await expect(userPage.getByRole('button', { name: 'Sign In' })).toBeVisible();

    await userPage.getByRole('textbox', { name: 'Enter your email' }).fill('sandeep.talari8999@gmail.com');
    await userPage.getByRole('textbox', { name: 'Enter your password' }).fill('sandeep@123');
    await userPage.getByRole('button', { name: 'Sign In' }).click();

    // Assert toast notification appears
    await expect(userPage.getByRole('alert')).toBeVisible();
    await expect(userPage.getByRole('alert')).toHaveText(/Login successful as traveler/i)


    await userPage.getByRole('button', { name: 'Food Order' }).click();
    await userPage.getByRole('textbox', { name: 'e.g.,' }).click();
    await userPage.getByRole('textbox', { name: 'e.g.,' }).fill('PNR1001');
    await userPage.getByRole('button', { name: 'Find My Bus' }).click();
    await userPage.getByText('North StopCity B ETA: 2025-08').click();
    await userPage.getByRole('button', { name: 'Continue to Restaurants' }).click();
    await userPage.getByRole('img', { name: 'Jagan\'s muntha masala' }).click();
    await userPage.getByRole('button', { name: 'View Menu' }).click();
    await userPage.getByRole('button', { name: 'Add' }).click();
    await userPage.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await userPage.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await userPage.getByRole('textbox', { name: 'Enter passenger name' }).click();
    await userPage.getByRole('textbox', { name: 'Enter passenger name' }).fill('naga lakshmi');
    await userPage.getByRole('textbox', { name: 'Enter phone number' }).click();
    await userPage.getByRole('textbox', { name: 'Enter phone number' }).fill('8000050000');
    await userPage.getByRole('textbox', { name: 'Enter seat number (e.g., 12A)' }).click();
    await userPage.getByRole('textbox', { name: 'Enter seat number (e.g., 12A)' }).fill('4B');
    await userPage.getByRole('button', { name: 'Pay ₹' }).click();
    await userPage.getByRole('button', { name: 'Proceed to Payment' }).click();
    await userPage.getByText('Wallet').click();
    await userPage.getByTestId('item-AMON').locator('div').filter({ hasText: 'Airtel Payments Bank' }).first().click();
    await userPage.getByTestId('item-AMON').getByRole('button', { name: 'PROCEED' }).click();
    await userPage.getByRole('textbox', { name: 'Enter OTP as' }).click();
    await userPage.getByRole('textbox', { name: 'Enter OTP as' }).fill('123456');
    await userPage.getByRole('button', { name: 'Submit' }).click();
    await userPage.getByRole('button', { name: 'Simulate Success Response' }).click();
    await userPage.getByRole('button', { name: 'Track Order' }).click();
    await userPage.getByRole('button', { name: 'Food Order' }).click();



    //Restaurant Owner logs in and accepts the order     
    const restaurantContext = await browser.newContext();
    const restaurantPage = await restaurantContext.newPage();
    await restaurantPage.goto('http://localhost:3000/');
    await restaurantPage.getByRole('button', { name: 'Login' }).click();
    await restaurantPage.locator('div').filter({ hasText: /^Restaurant Partner$/ }).click();
    await restaurantPage.getByRole('textbox', { name: 'Enter your email' }).click();
    await restaurantPage.getByRole('textbox', { name: 'Enter your email' }).fill('jagan@gmail.com');
    await restaurantPage.getByRole('textbox', { name: 'Enter your password' }).click();
    await restaurantPage.getByRole('textbox', { name: 'Enter your password' }).fill('Jagan@123');
    await restaurantPage.getByRole('button', { name: 'Sign In' }).click();
    await expect(restaurantPage.getByRole('alert')).toBeVisible();
    await restaurantPage.getByRole('tab', { name: 'Order Management' }).click();
    await restaurantPage.locator('.d-flex.align-items-center.btn.btn-success').first().click();
    await restaurantPage.getByRole('button', { name: 'Assign a Delivery Agent' }).click();


    await userPage.getByRole('button', { name: 'my orders' }).click();
    await userPage.locator('.d-flex.align-items-center.gap-2').first().click();

    //Delivery Agent logs in and marks delivery complete
    const deliveryContext = await browser.newContext();
    const deliveryPage = await deliveryContext.newPage();
    await deliveryPage.goto('http://localhost:3000/');
    await deliveryPage.getByRole('button', { name: 'Login' }).click();
    await deliveryPage.locator('div').filter({ hasText: /^Delivery Agent$/ }).click();
    await deliveryPage.getByRole('textbox', { name: 'Enter your email' }).click();
    await deliveryPage.getByRole('textbox', { name: 'Enter your email' }).fill('varshini@gamil.com');
    await deliveryPage.getByRole('textbox', { name: 'Enter your password' }).click();
    await deliveryPage.getByRole('textbox', { name: 'Enter your password' }).fill('varshini@123');
    await deliveryPage.getByRole('button', { name: 'Sign In' }).click();
    await expect(deliveryPage.getByRole('alert')).toBeVisible();

    await deliveryPage.getByRole('tab', { name: 'Available Orders' }).click();
    await deliveryPage.getByRole('button', { name: 'Accept Order' }).click();


    await userPage.getByRole('button', { name: 'my orders' }).click();
    await userPage.locator('.d-flex.align-items-center.gap-2').first().click();


    await deliveryPage.getByRole('tab', { name: 'Current Delivery' }).click();
    await deliveryPage.getByRole('button', { name: 'Reached Restaurant' }).click();


    await userPage.getByRole('button', { name: 'my orders' }).click();
    await userPage.locator('.d-flex.align-items-center.gap-2').first().click();

    await deliveryPage.getByRole('button', { name: 'Start Delivery' }).click();

    await userPage.getByRole('button', { name: 'my orders' }).click();
    await userPage.locator('.d-flex.align-items-center.gap-2').first().click();

    await deliveryPage.getByRole('button', { name: 'Complete Delivery' }).click();

    await userPage.getByRole('button', { name: 'my orders' }).click();
   

})