// Centralize the base URL for API calls (to easily switch between dev/prod environments)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Sign up user
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

    return await response.json();  // Return successful response (e.g., user data or confirmation)
  } catch (error: any) {
    throw new Error(error.message || 'An unexpected error occurred during sign-up');
  }
};

// Sign in user
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
    
    // Assuming the backend returns an object like:
    // { "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "token_type": "bearer", "user": { ... } }

    const token = data.access_token;
    if (token) {
      // Save token and authentication status in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');  // Optionally store authentication status

      // Optionally, store user data as well if it's returned
      localStorage.setItem('user', JSON.stringify(data.user || {}));  // Assuming `data.user` contains user info
      
      return data;  // Return the full data (e.g., user object + token)
    } else {
      throw new Error('Token not received from server');
    }
  } catch (error: any) {
    throw new Error(error.message || 'An unexpected error occurred during sign-in');
  }
};
