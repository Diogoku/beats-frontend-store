import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setBasket: (state, action) => {
      state.user.basketProducts = action.payload.basketProducts;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setUser, setToken, logout, setBasket } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
