import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/user/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export default userSlice.reducer;
