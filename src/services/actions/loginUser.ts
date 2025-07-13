type LoginPayload = {
  email: string;
  password: string;
};

export const loginUser = async (userData: LoginPayload): Promise<any> => {
  const res = await fetch("http://64.227.146.100:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to login. Check credentials.");
  }

  const userInfo = await res.json();
  return userInfo;
};
