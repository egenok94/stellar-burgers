import { test, expect } from '@playwright/test';
/// <reference types="@playwright/test" />

test.describe('constructor page tests', () => {
  const mockdataOrder = {
    success: true,
    name: 'Люминесцентный·бессмертный·краторный·бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093f',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ],
      _id: '6a39aab16a172d001b98d951',
      owner: {
        name: 'keksik20new',
        email: 'keksik20@mail.ru',
        createdAt: '2026-06-03T17:20:35.262Z',
        updatedAt: '2026-06-07T17:05:47.482Z'
      },
      status: 'done',
      name: 'Люминесцентный·бессмертный·краторный·бургер',
      createdAt: '2026-06-22T21:35:45.274Z',
      updatedAt: '2026-06-22T21:35:45.350Z',
      number: 106963,
      price: 4835
    }
  };

  const mockAccessToken =
    'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjA2MjYzNmExNzJkMDAxYjk4YmEzYyIsImlhdCI6MTc4MjE2MzQ0NCwiZXhwIjoxNzgyMTY0NjQ0fQ.gCdYuxumBtpnCtq_EL2HSVqQI1hvnyX6PfYKIua5-ys';
  const mockRefreshToken =
    '114fec3e11e356244b1ee1a79bc3199a10e534da9f3023e0d5a67a52ed4d15fbe5b912b1c5239d7e';

  test('перехват api/ingredients to mock data', async ({ page }) => {
    await page.route(
      'https://norma.education-services.ru/api/ingredients',
      (route) => route.abort()
    );
    await page.routeFromHAR('./e2e/hars/igredients.har', {
      url: '**/api/ingredients',
      update: false // Режим записи
    });

    await page.goto('/');

    // Ждём загрузки данных
    await expect(page.getByTestId('ingr-tabs')).toBeVisible();
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();
    await expect(page.getByText('Соус фирменный Space Sauce')).toBeVisible();

    // HAR-файл будет сохранён автоматически
  });

  test('adding bun and some ingredients to constructor', async ({ page }) => {
    await page.route(
      'https://norma.education-services.ru/api/ingredients',
      (route) => route.abort()
    );
    await page.routeFromHAR('./e2e/hars/igredients.har', {
      url: '**/api/ingredients',
      update: false // Режим записи
    });
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
      await page.route(
        'https://norma.education-services.ru/api/ingredients',
        (route) => route.abort()
      );
      await page.routeFromHAR('./e2e/hars/igredients.har', {
        url: '**/api/ingredients',
        update: false // Режим записи
      });
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
      await page.route(
        'https://norma.education-services.ru/api/ingredients',
        (route) => route.abort()
      );
      await page.routeFromHAR('./e2e/hars/igredients.har', {
        url: '**/api/ingredients',
        update: false // Режим записи
      });
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
      await page.route(
        'https://norma.education-services.ru/api/ingredients',
        (route) => route.abort()
      );
      await page.routeFromHAR('./e2e/hars/igredients.har', {
        url: '**/api/ingredients',
        update: false // Режим записи
      });
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
    // mocking get user
    await page.route('**/api/auth/user', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          user: { email: 'keksik20@mail.ru', name: 'keksik20new' }
        })
      });
    });

    // mocking get ingredient
    await page.route(
      'https://norma.education-services.ru/api/ingredients',
      (route) => route.abort()
    );
    await page.routeFromHAR('./e2e/hars/igredients.har', {
      url: '**/api/ingredients',
      update: false // Режим записи
    });

    // mocking create order
    await page.route('**/api/orders', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 200,
          body: JSON.stringify(mockdataOrder)
        });
      }
    });

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
    await page.addInitScript(`
    localStorage.setItem('refreshToken', '${mockRefreshToken}');
  `);

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
    const numberOfOrder = modal.getByText('106963');

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
