import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserInfo {
  email: string;
  name: string;
  role: string;
  // Add other fields as needed
}

// Define the UserState interface
interface UserState {
  token: string | null;
  userInfo: UserInfo | null;  
  status: 'idle' | 'loading' | 'error';
}

// Initial state setup
const initialState: UserState = {
  token: localStorage.getItem('userToken') || null,  // Check if a token exists in localStorage
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null,
  status: 'idle',
};

// User slice definition
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the user info (login action)
    setUser: (state, action: PayloadAction<{ token: string; userInfo: any }>) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.status = 'idle';

      // Persist token and userInfo to localStorage
      localStorage.setItem('userToken', action.payload.token);
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
    },
    
    // Logout user (clear the data)
    logoutUser: (state) => {
      state.token = null;
      state.userInfo = null;
      state.status = 'idle';

      // Clear the persisted data from localStorage
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
    },

    // Set loading status
    setUserStatus: (state, action: PayloadAction<'idle' | 'loading' | 'error'>) => {
      state.status = action.payload;
    },
  },
});

// Actions generated from the slice
export const { setUser, logoutUser, setUserStatus } = userSlice.actions;

// Reducer to export
export default userSlice.reducer;

