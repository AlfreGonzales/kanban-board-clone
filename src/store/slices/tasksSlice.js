import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { createTask } = tasksSlice.actions;

export default tasksSlice.reducer;
