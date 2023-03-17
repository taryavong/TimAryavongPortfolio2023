import axios from 'axios';

const API_URL = '/api/users/';

// Register user reducer
const register = async (userData) => {
  // Declare a response from a promised registration creation request
  //NOTE: I didn't see where in the tutorial that a request specifically requested /api/users/register, so I did "API_URL+register" because it was giving a 404 cannot post. 
  const response = await axios.post(API_URL + "register", userData);

  // If the promise was successful then there should be data, not NULL (Note: localstorage can only be stored as a string)
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  };

  return response.data;
}

// Login user, similar to register
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  };

  return response.data;
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Place the register function in authService to be exported and used in a registration slice
const authService = {
  register,
  logout,
  login,
};

// Export the auth service
export default authService;