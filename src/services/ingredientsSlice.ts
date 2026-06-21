import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('ingredients/get', () =>
  getIngredientsApi()
);

export interface IngredientState {
  isLoading: boolean;
  allIngerdients: Array<TIngredient>;
  bunsIngredients: TIngredient[] | null;
  mainsIngredients: TIngredient[] | null;
  saucesIngredients: TIngredient[] | null;
  error: string | null;
}

const initialState: IngredientState = {
  isLoading: false,
  allIngerdients: [],
  error: null,
  bunsIngredients: null,
  mainsIngredients: null,
  saucesIngredients: null
};

export const ingerdientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectAllingredients: (state) => state.allIngerdients,
    selectIngredientIsLoading: (state) => state.isLoading,
    selectIngredientError: (state) => state.error,
    selectBunsIngredients: (state) => state.bunsIngredients,
    selectMainIngredients: (state) => state.mainsIngredients,
    selectSauceIngredients: (state) => state.saucesIngredients
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allIngerdients = action.payload;
      state.bunsIngredients = state.allIngerdients?.filter(
        (element) => element.type === 'bun'
      );
      state.mainsIngredients = state.allIngerdients?.filter(
        (element) => element.type === 'main'
      );
      state.saucesIngredients = state.allIngerdients?.filter(
        (element) => element.type === 'sauce'
      );
    });
  }
});

export const {
  selectAllingredients,
  selectIngredientIsLoading,
  selectIngredientError,
  selectBunsIngredients,
  selectMainIngredients,
  selectSauceIngredients
} = ingerdientsSlice.selectors;

export default ingerdientsSlice.reducer;
