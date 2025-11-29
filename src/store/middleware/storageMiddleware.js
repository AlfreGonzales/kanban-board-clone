import { fetchGetProfile, fetchLogin, logout } from "../slices/authSlice";
import { createTask, updateTask } from "../slices/tasksSlice";

const storageMiddleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (
    fetchLogin.fulfilled.match(action) ||
    fetchGetProfile.fulfilled.match(action) ||
    logout.match(action)
  ) {
    localStorage.setItem("auth", JSON.stringify(store.getState().auth));
  }

  if (createTask.match(action) || updateTask.match(action)) {
    localStorage.setItem("tasks", JSON.stringify(store.getState().tasks));
  }

  return result;
};

export default storageMiddleware;
