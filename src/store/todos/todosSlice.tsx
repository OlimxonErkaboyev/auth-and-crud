import { createSlice } from "@reduxjs/toolkit";
import { todos } from "./todosActions";

export interface TodosItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosState {
  todos: TodosItem[];
  selectedTodo: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(todos.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        state.loading = false;
      })
      .addCase(todos.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setSelectedTodo, setTodos } = todosSlice.actions;

export default todosSlice.reducer;
