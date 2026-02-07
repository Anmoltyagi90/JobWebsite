import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: 0,
    user: null,
    token: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      // Support both shapes:
      // 1) payload is full object: { user, token }
      // 2) payload is just the user object
      if (action.payload && (action.payload.user || action.payload.token)) {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        if (action.payload.token !== undefined) {
          state.token = action.payload.token;
        }
      } else {
        state.user = action.payload;
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
