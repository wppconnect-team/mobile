import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthCode} from 'types/wajs/conn';

export interface WaJsState {
  isAuthenticted: boolean;
  authcode?: AuthCode | null;
  webpack: {
    ready: boolean;
  };
}

const initialState = {
  isAuthenticted: false,
  authcode: null,
  webpack: {ready: false},
} as WaJsState;

const waJsSlice = createSlice({
  name: 'wajs',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticted = action.payload;
    },
    setAuthCode(state, action: PayloadAction<AuthCode>) {
      state.authcode = action.payload;
    },
    setWebpackReady(state, action: PayloadAction<boolean>) {
      state.webpack.ready = action.payload;
    },
  },
});

export const {setAuthenticated, setAuthCode, setWebpackReady} =
  waJsSlice.actions;
export default waJsSlice.reducer;
