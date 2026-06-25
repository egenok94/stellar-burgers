import reducer, { getIngredients, IngredientState } from '../ingredientsSlice';

describe('ingredients slice test', () => {
  const initialState: IngredientState = {
    isLoading: false,
    allIngerdients: [],
    error: null,
    bunsIngredients: null,
    mainsIngredients: null,
    saucesIngredients: null
  };

  test('switch isLoading to true when getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.allIngerdients).toEqual([]);
    expect(state.error).toBe(null);
    expect(state.bunsIngredients).toBe(null);
    expect(state.mainsIngredients).toBe(null);
    expect(state.saucesIngredients).toBe(null);
  });

  test('switch isLoading to false and write ingredients when getIngredients.fulfilled', () => {
    const payload = [
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
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload
    };
    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.allIngerdients).toEqual(payload);
    expect(state.bunsIngredients).toStrictEqual([payload[0]]);
    expect(state.mainsIngredients).toStrictEqual([payload[1]]);
    expect(state.saucesIngredients).toStrictEqual([payload[2]]);
  });

  test('switch isLoading to false and write error when getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Network error' }
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.allIngerdients).toEqual([]);
    expect(state.error).toBe('Network error');
    expect(state.bunsIngredients).toBe(null);
    expect(state.mainsIngredients).toBe(null);
    expect(state.saucesIngredients).toBe(null);
  });

  test('return initial state when unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toStrictEqual(initialState);
  });
});
