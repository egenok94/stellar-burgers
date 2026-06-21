import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

export interface OrdersByNumberState {
  isLoading: boolean;
  choosedOrder: TOrder | null;
  error: string | null;
}

const initialState: OrdersByNumberState = {
  isLoading: false,
  choosedOrder: null,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeChoosedOrder: (state) => {
      state.choosedOrder = null;
    }
  },
  selectors: {
    selectChoosedOrder: (state) => state.choosedOrder,
    selectOrderIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choosedOrder = action.payload.orders[0];
    });
  }
});

export const { selectChoosedOrder, selectOrderIsLoading } =
  orderSlice.selectors;
export const { closeChoosedOrder } = orderSlice.actions;

export default orderSlice.reducer;
