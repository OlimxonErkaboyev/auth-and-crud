import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (body: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        body
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);
