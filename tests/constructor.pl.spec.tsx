import { test, expect } from '@playwright/test';
/// <reference types="@playwright/test" />

test.describe('constructor page tests', () => {

  const mockAccessToken =
    'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjA2MjYzNmExNzJkMDAxYjk4YmEzYyIsImlhdCI6MTc4MjQxNDQ4MiwiZXhwIjoxNzgyNDE1NjgyfQ.32yp62-pL1b3DuMwAnukt-Sob7tesau6uIPxopxf9oY';
  const mockRefreshToken =
    '42ff66b5c58414ff02000fc0a4d6af76f3527e86b39cdf11337d46d73489c7712ac48d18fa2cc03d';

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/igredients.har', {
      url: '**/api/ingredients',
      update: false // Режим записи
    });
  });

  test('перехват api/ingredients to mock data', async ({ page }) => {
    await page.goto('/');

    // Ждём загрузки данных
    await expect(page.getByTestId('ingr-tabs')).toBeVisible();
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();
    await expect(page.getByText('Соус фирменный Space Sauce')).toBeVisible();
  });

  test('adding bun and some ingredients to constructor', async ({ page }) => {
    await page.goto('/');
    const constructor = page.locator('[data-id="burger-constructor"]');
    const bunText = constructor.getByText('Краторная булка N-200i (низ)');
    const ingr1Text = constructor.getByText(
      'Филе Люминесцентного тетраодонтимформа'
    );
    const ingr2Text = constructor.getByText('Плоды Фалленианского дерева');

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200iДобавить' })
      .getByRole('button')
      .click();
    await page
      .getByRole('listitem')
      .filter({ hasText: 'Филе Люминесцентного тетраодонтимформаДобавить' })
      .getByRole('button')
      .click();
    await page
      .getByRole('listitem')
      .filter({ hasText: 'Плоды Фалленианского дерева' })
      .getByRole('button')
      .click();

    await expect(bunText).toBeVisible();
    await expect(ingr1Text).toBeVisible();
    await expect(ingr2Text).toBeVisible();
  });

  test.describe('modal test', () => {
    test('opening modal with ingredient', async ({ page }) => {
      await page.goto('/');
      await page
        .getByRole('link', { name: 'картинка ингредиента. 1255' })
        .click();
      const modal = page.locator('[data-id="modal"]');
      const igredientText = modal.getByText('Краторная булка N-200i');
      const kkalText = modal.getByText('Калории, ккал');

      await expect(modal).toBeVisible();
      await expect(igredientText).toBeVisible();
      await expect(kkalText).toBeVisible();
    });

    test('close modal with close button', async ({ page }) => {
      await page.goto('/');
      await page
        .getByRole('link', { name: 'картинка ингредиента. 1255' })
        .click();

      const modal = page.locator('[data-id="modal"]');
      const igredientText = modal.getByText('Краторная булка N-200i');
      const closeButton = page.locator('[data-id="modal-close-button"]');

      await expect(modal).toBeVisible();
      await expect(igredientText).toBeVisible();
      await expect(closeButton).toBeVisible();

      await closeButton.click();

      await expect(modal).toBeHidden();
    });

    test('close modal with click away', async ({ page }) => {
      await page.goto('/');
      await page
        .getByRole('link', { name: 'картинка ингредиента. 1255' })
        .click();

      const modal = page.locator('[data-id="modal"]');
      const igredientText = modal.getByText('Краторная булка N-200i');

      await expect(modal).toBeVisible();
      await expect(igredientText).toBeVisible();

      await page.click('body', { position: { x: 10, y: 10 } });

      await expect(modal).toBeHidden();
    });
  });

  test('create order', async ({ page, context }) => {
    // accessToken в Cookies
    await context.addCookies([
      {
        name: 'accessToken',
        value: mockAccessToken,
        domain: 'localhost',
        path: '/'
      }
    ]);

    // refreshToken в localStorage
    await page.addInitScript(
      (token) => localStorage.setItem('refreshToken', token),
      mockRefreshToken
    );

    await page.routeFromHAR('./tests/hars/auth-user.har', {
      url: '**/api/auth/user',
      update: false
    });
    await page.routeFromHAR('./tests/hars/orders.har', {
      url: '**/api/orders',
      update: false
    });

    await page.goto('/');

    const storedToken = await page.evaluate(() =>
      localStorage.getItem('refreshToken')
    );
    // Проверка localStorage
    expect(storedToken).toBe(mockRefreshToken);

    // Проверка cookie
    const cookiesContext = await context.cookies();
    const accessCookie = cookiesContext.find((c) => c.name === 'accessToken');
    expect(accessCookie).toBeDefined();
    expect(accessCookie?.value).toBe(mockAccessToken);

    const profile = page.locator('[data-id="profile"]');
    await expect(profile).toContainText('keksik20new');

    expect(storedToken).toBe(mockRefreshToken);
    const cookies = await page.evaluate(() => document.cookie);
    expect(cookies).toContain('accessToken');

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200iДобавить' })
      .getByRole('button')
      .click();
    await page
      .getByRole('listitem')
      .filter({ hasText: 'Филе Люминесцентного тетраодонтимформа' })
      .getByRole('button')
      .click();
    await page
      .getByRole('listitem')
      .filter({ hasText: 'Мясо бессмертных моллюсков Protostomia' })
      .getByRole('button')
      .click();

    const constructor = page.locator('[data-id="burger-constructor"]');
    const bunText = constructor.getByText('Краторная булка N-200i (низ)');
    const ingr1Text = constructor.getByText(
      'Филе Люминесцентного тетраодонтимформа'
    );
    const ingr2Text = constructor.getByText(
      'Мясо бессмертных моллюсков Protostomia'
    );

    await expect(bunText).toBeVisible();
    await expect(ingr1Text).toBeVisible();
    await expect(ingr2Text).toBeVisible();

    const createOrderButton = page.locator('[data-id="create-order-button"]');
    await createOrderButton.click();

    const modal = page.locator('[data-id="modal"]');
    const numberOfOrder = modal.getByText('107211');

    await expect(modal).toBeVisible();
    await expect(numberOfOrder).toBeVisible();

    const closeButton = page.locator('[data-id="modal-close-button"]');

    await closeButton.click();

    await expect(modal).toBeHidden();
    await expect(bunText).toBeHidden();
    await expect(ingr1Text).toBeHidden();
    await expect(ingr2Text).toBeHidden();

    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
});
