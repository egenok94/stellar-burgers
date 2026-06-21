import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TLoginData } from '../utils/burger-api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie } from '../utils/cookie';

export const loginUser = createAsyncThunk('user/login', (data: TLoginData) =>
  loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/register',
  ({
    email,
    name,
    password
  }: {
    email: string;
    name: string;
    password: string;
  }) => registerUserApi({ email, name, password })
);

export const forgotPasswordUser = createAsyncThunk(
  'user/forgot-password',
  (email: string) => {
    forgotPasswordApi({ email });
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  ({
    email,
    name,
    password
  }: {
    email: string;
    name: string;
    password: string;
  }) => updateUserApi({ email, name, password })
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const getUser = createAsyncThunk('user/getUser', () => getUserApi());

export const getUserOrders = createAsyncThunk('user/orders', () =>
  getOrdersApi()
);

export interface UserState {
  isLogin: boolean;
  isInit: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  orders: TOrder[] | null;
}

const initialState: UserState = {
  isLogin: false,
  isInit: false,
  user: null,
  isLoading: false,
  error: null,
  orders: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserState: (state) => state,
    getUserError: (state) => state.error,
    selectUserOrders: (staate) => staate.orders
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isLogin = true;
      state.isInit = true;
    });
    // Get User
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.error = action.error.message ?? null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.user = action.payload.user;
      state.isLogin = true;
    });
    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isLogin = true;
      state.isInit = true;
    });
    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isLogin = false;
      state.user = null;
      state.isInit = false;
    });
    //Update User
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
  }
});

export const { selectUserState, getUserError, selectUserOrders } =
  userSlice.selectors;

export default userSlice.reducer;
