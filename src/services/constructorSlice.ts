import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const getBurgerConstructorOrger = createAsyncThunk(
  'burgerConstructor/order',
  (data: string[]) => orderBurgerApi(data)
);

export interface ConstructorState {
  choosedIngredient: TIngredient | null;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

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

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    openIngreient: (state, action: PayloadAction<TIngredient>) => {
      state.choosedIngredient = action.payload;
    },
    closeIngredient: (state) => {
      state.choosedIngredient = null;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients?.filter(
          (ingr) => ingr.id !== action.payload
        ) ?? [];
    },
    moveUpIngredient: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.constructorItems.ingredients.findIndex(
        (ingr) => ingr.id === id
      );
      [
        state.constructorItems.ingredients[index - 1],
        state.constructorItems.ingredients[index]
      ] = [
        state.constructorItems.ingredients[index],
        state.constructorItems.ingredients[index - 1]
      ];
    },
    moveDownIngredient: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.constructorItems.ingredients.findIndex(
        (ingr) => ingr.id === id
      );
      [
        state.constructorItems.ingredients[index + 1],
        state.constructorItems.ingredients[index]
      ] = [
        state.constructorItems.ingredients[index],
        state.constructorItems.ingredients[index + 1]
      ];
    },
    closeConstructorOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectChoosedIngredient: (state) => state.choosedIngredient,
    selectConstructorItems: (state) => state.constructorItems,
    selectContructorIsLoading: (state) => state.isLoading,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder.addCase(getBurgerConstructorOrger.pending, (state) => {
      state.isLoading = true;
      state.orderRequest = true;
    });
    builder.addCase(getBurgerConstructorOrger.rejected, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(getBurgerConstructorOrger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.orderModalData = {
        ...action.payload.order,
        ingredients: []
      };
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
  }
});

export const {
  openIngreient,
  closeIngredient,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  closeConstructorOrderModal
} = constructorSlice.actions;

export const {
  selectChoosedIngredient,
  selectConstructorItems,
  selectContructorIsLoading,
  selectOrderModalData
} = constructorSlice.selectors;

export default constructorSlice.reducer;
