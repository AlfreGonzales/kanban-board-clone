import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: crypto.randomUUID(),
        status: "backlog",
        createdAt: new Date().toISOString(),
      });
    },
  },
});

export const { createTask } = tasksSlice.actions;

export default tasksSlice.reducer;
