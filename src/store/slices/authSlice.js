import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, login } from "../../services/authService";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await login(data);
      return res.access_token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGetProfile = createAsyncThunk(
  "auth/fetchGetProfile",
  async ({ token, role }, { rejectWithValue }) => {
    try {
      let res = await getProfile(token);
      res.role = role;
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storageData = localStorage.getItem("auth");

const initialState = {
  access_token: null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: storageData ? JSON.parse(storageData) : initialState,
  reducers: {
    logout: (state) => {
      state.access_token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.access_token = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
