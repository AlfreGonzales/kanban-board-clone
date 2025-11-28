const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error(error);
    const result = await res.json();
    return result.slice(0, 10);
  } catch (error) {
    throw new Error(error);
  }
};
