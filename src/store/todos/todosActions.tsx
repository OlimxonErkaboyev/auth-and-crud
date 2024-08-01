import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export const todos = createAsyncThunk(
  "todos/get",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;
    try {
      if (!userId) {
        throw new Error("User ID is not available.");
      }

      const response = await axios.get(
        `https://dummyjson.com/todos/user/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/post",
  async (
    body: { todo: string; completed: boolean; userId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `https://dummyjson.com/todos/add`,
        body
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateTodo = createAsyncThunk(
  "todo/put",
  async (body: { completed: boolean }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const Id = state.todos.selectedTodo;
    try {
      if (!Id) {
        throw new Error("User ID is not available.");
      }
      const response = await axios.put(
        `https://dummyjson.com/todos/${Id}`,
        body
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (todoId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${todoId}`);
      return todoId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
