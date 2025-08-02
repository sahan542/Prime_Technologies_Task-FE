const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';


export const signUpUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to sign up');
    }

    return await response.json(); 
  } catch (error: any) {
    throw new Error(error.message || 'An unexpected error occurred during sign-up');
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to sign in');
    }

    const data = await response.json();

    const token = data.access_token;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');  

      localStorage.setItem('user', JSON.stringify(data.user || {})); 
      
      return data;  
    } else {
      throw new Error('Token not received from server');
    }
  } catch (error: any) {
    throw new Error(error.message || 'An unexpected error occurred during sign-in');
  }
};
