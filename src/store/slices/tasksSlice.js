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
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index].status = action.payload.status;
    },
  },
});

export const { createTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
