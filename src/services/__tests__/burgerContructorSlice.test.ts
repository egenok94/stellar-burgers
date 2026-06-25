import reducer, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  openIngreient,
  closeIngredient,
  closeConstructorOrderModal,
  getBurgerConstructorOrger,
  ConstructorState
} from '../constructorSlice';

describe('burgerConstructor slice test', () => {
  const initialState: ConstructorState = {
    choosedIngredient: null,
    constructorItems: {
      bun: null,
      ingredients: []
    },
    isLoading: false,
    error: null,
    orderRequest: false,
    orderModalData: null
  };

  test('open ingredient', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };
    const state = reducer(initialState, openIngreient(ingredient));
    expect(state.choosedIngredient).toStrictEqual(ingredient);
  });

  test('close ingredient', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };
    const stateOpen = reducer(initialState, openIngreient(ingredient));
    expect(stateOpen.choosedIngredient).toStrictEqual(ingredient);

    const stateClose = reducer(initialState, closeIngredient());
    expect(stateClose.choosedIngredient).toStrictEqual(null);
  });

  test('add ingredient', () => {
    const ingredientBun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };
    const stateBun = reducer(initialState, addIngredient(ingredientBun));
    expect(stateBun.constructorItems.bun).toMatchObject(ingredientBun);
    expect(stateBun.constructorItems.bun).toHaveProperty('id');

    const ingredientMain = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    const stateMain = reducer(initialState, addIngredient(ingredientMain));
    expect(stateMain.constructorItems.ingredients).toMatchObject([
      ingredientMain
    ]);
    expect(stateMain.constructorItems.ingredients[0]).toHaveProperty('id');
  });

  test('remove ingredient', () => {
    const ingredientMain = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    const stateAdd = reducer(initialState, addIngredient(ingredientMain));
    expect(stateAdd.constructorItems.ingredients).toMatchObject([
      ingredientMain
    ]);
    expect(stateAdd.constructorItems.ingredients[0]).toHaveProperty('id');

    const stateRemove = reducer(
      stateAdd,
      removeIngredient(stateAdd.constructorItems.ingredients[0].id)
    );
    expect(stateRemove.constructorItems.ingredients).toStrictEqual([]);
  });

  test('move up ingredient', () => {
    const ingredientMain = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    const stateAdd = reducer(initialState, addIngredient(ingredientMain));
    expect(stateAdd.constructorItems.ingredients).toMatchObject([
      ingredientMain
    ]);
    expect(stateAdd.constructorItems.ingredients[0]).toHaveProperty('id');

    const ingredientSauce = {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    };
    const stateAdd2 = reducer(stateAdd, addIngredient(ingredientSauce));
    expect(stateAdd2.constructorItems.ingredients).toMatchObject([
      ingredientMain,
      ingredientSauce
    ]);
    expect(stateAdd2.constructorItems.ingredients[0]).toHaveProperty('id');

    const indexBefore = stateAdd2.constructorItems.ingredients.findIndex(
      (ingr) => ingr.name === stateAdd2.constructorItems.ingredients[1].name
    );

    expect(indexBefore).toBe(1);

    const stateMove = reducer(
      stateAdd2,
      moveUpIngredient(stateAdd2.constructorItems.ingredients[1].id)
    );

    const indexAfter = stateMove.constructorItems.ingredients.findIndex(
      (ingr) => ingr.name === stateAdd2.constructorItems.ingredients[1].name
    );
    expect(indexAfter).toBe(0);
  });

  test('move down ingredient', () => {
    const ingredientMain = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    const stateAdd = reducer(initialState, addIngredient(ingredientMain));
    expect(stateAdd.constructorItems.ingredients).toMatchObject([
      ingredientMain
    ]);
    expect(stateAdd.constructorItems.ingredients[0]).toHaveProperty('id');

    const ingredientSauce = {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    };
    const stateAdd2 = reducer(stateAdd, addIngredient(ingredientSauce));
    expect(stateAdd2.constructorItems.ingredients).toMatchObject([
      ingredientMain,
      ingredientSauce
    ]);
    expect(stateAdd2.constructorItems.ingredients[0]).toHaveProperty('id');

    const indexBefore = stateAdd2.constructorItems.ingredients.findIndex(
      (ingr) => ingr.name === stateAdd2.constructorItems.ingredients[0].name
    );

    expect(indexBefore).toBe(0);

    const stateMove = reducer(
      stateAdd2,
      moveDownIngredient(stateAdd2.constructorItems.ingredients[0].id)
    );

    const indexAfter = stateMove.constructorItems.ingredients.findIndex(
      (ingr) => ingr.name === stateAdd2.constructorItems.ingredients[0].name
    );
    expect(indexAfter).toBe(1);
  });

  test('close modal', () => {
    const order = {
      ingredients: [],
      _id: '6a3c47f36a172d001b98dd20',
      owner: {
        name: 'keksik20new',
        email: 'keksik20@mail.ru',
        createdAt: '2026-06-03T17:20:35.262Z',
        updatedAt: '2026-06-07T17:05:47.482Z'
      },
      status: 'done',
      name: 'Био-марсианский краторный бургер',
      createdAt: '2026-06-24T21:11:15.732Z',
      updatedAt: '2026-06-24T21:11:15.809Z',
      number: 107128,
      price: 2934
    };

    const prevState = {
      choosedIngredient: null,
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isLoading: true,
      error: null,
      orderRequest: true,
      orderModalData: order
    };

    const stateClose = reducer(prevState, closeConstructorOrderModal());

    expect(stateClose.orderModalData).toBe(null);
  });

  test('switch isLoading and orderRequest to true when getBurgerConstructorOrger.pending', () => {
    const action = { type: getBurgerConstructorOrger.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.orderRequest).toBe(true);
    expect(state.choosedIngredient).toBe(null);
    expect(state.constructorItems.bun).toBe(null);
    expect(state.constructorItems.ingredients).toStrictEqual([]);
    expect(state.orderModalData).toBe(null);
    expect(state.error).toBe(null);
  });

  test('write error when getBurgerConstructorOrger.rejected', () => {
    const action = {
      type: getBurgerConstructorOrger.rejected.type,
      error: { message: 'Network error' }
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.choosedIngredient).toBe(null);
    expect(state.constructorItems.bun).toBe(null);
    expect(state.constructorItems.ingredients).toStrictEqual([]);
    expect(state.orderModalData).toBe(null);
    expect(state.error).toBe('Network error');
  });

  test('getBurgerConstructorOrger.fulfilled', () => {
    const mokOrder = {
      success: true,
      name: 'Био-марсианский краторный бургер',
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
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
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
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          }
        ],
        _id: '6a3c47f36a172d001b98dd20',
        owner: {
          name: 'keksik20new',
          email: 'keksik20@mail.ru',
          createdAt: '2026-06-03T17:20:35.262Z',
          updatedAt: '2026-06-07T17:05:47.482Z'
        },
        status: 'done',
        name: 'Био-марсианский краторный бургер',
        createdAt: '2026-06-24T21:11:15.732Z',
        updatedAt: '2026-06-24T21:11:15.809Z',
        number: 107128,
        price: 2934
      }
    };

    const prevState: ConstructorState = {
      choosedIngredient: null,
      constructorItems: {
        bun: {
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
          id: '0'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            id: '1'
          }
        ]
      },
      isLoading: true,
      error: null,
      orderRequest: true,
      orderModalData: null
    };

    const action = {
      type: getBurgerConstructorOrger.fulfilled.type,
      payload: {
        success: true,
        order: mokOrder.order,
        name: mokOrder.name
      }
    };
    const state = reducer(prevState, action);

    expect(state.choosedIngredient).toBe(null);
    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.constructorItems.bun).toBe(null);
    expect(state.constructorItems.ingredients).toStrictEqual([]);
    expect(state.orderModalData).toStrictEqual({
      ...mokOrder.order,
      ingredients: []
    });

    expect(state.error).toBe(null);
  });

  test('return initial state when unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toStrictEqual(initialState);
  });
});
