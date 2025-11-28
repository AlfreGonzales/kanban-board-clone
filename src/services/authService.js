const API_URL = import.meta.env.VITE_API_URL;

export const login = async (user) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(error);
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getProfile = async (token) => {
  try {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(error);
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};
