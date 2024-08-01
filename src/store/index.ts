import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import todosReducer from "./todos/todosSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
