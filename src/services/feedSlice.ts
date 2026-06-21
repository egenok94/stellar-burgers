import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/get', () => getFeedsApi());

export interface FeedState {
  isLoading: boolean;
  orders: TOrder[] | [];
  error: string | null;
  total: number | null;
  totalToday: number | null;
}

const initialState: FeedState = {
  isLoading: false,
  orders: [],
  error: null,
  total: null,
  totalToday: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedsIsLoading: (state) => state.isLoading,
    selectFeedsState: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.error = null;
    });
  }
});

export const { selectFeedOrders, selectFeedsIsLoading, selectFeedsState } =
  feedSlice.selectors;

export default feedSlice.reducer;
