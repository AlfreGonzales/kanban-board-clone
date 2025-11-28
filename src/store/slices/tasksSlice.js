import { createSlice } from "@reduxjs/toolkit";

const storageData = localStorage.getItem("tasks");

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: storageData ? JSON.parse(storageData) : initialState,
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
      const { id, task } = action.payload;

      const index = state.tasks.findIndex((task) => task.id === id);
      state.tasks[index] = { ...state.tasks[index], ...task };
    },
  },
});

export const { createTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
