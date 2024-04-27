import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  isLoggedIn: false,

  login: async (name:any, age:any) => {
    try {
      // Perform authentication logic here (e.g., API call)
      const response = await axios.post('http://localhost:8000/user/login', { name, age });
      const data = response.data;

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      // Set isLoggedIn to true if login is successful
      set({ isLoggedIn: true });
    } catch (error) {
      // Handle login errors
      throw new Error("An error occurred during login.");
    }
  },

  logout: () => {
    // Perform logout logic here
    // For demonstration purposes, let's just set isLoggedIn to false
    set({ isLoggedIn: false });
    // Additional logout logic such as clearing localStorage can be added here
    localStorage.removeItem('user'); // For example, removing user data from localStorage
  },
}));

export default useAuthStore;