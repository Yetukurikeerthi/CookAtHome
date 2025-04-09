const { default: axios } = require('axios');

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.155:1337/api',
});

// Fetch categories with populated fields
const getCategory = () => axiosClient.get('/categories?populate=*');

// Fetch sliders with populated fields
const getSliders = () => 
  axiosClient.get('/sliders?populate=*').then((resp) => { return resp.data.data });

// Fetch category list
const getCategoryList = () => 
  axiosClient.get('/categories?populate=*').then((resp) => { return resp.data.data });

// Fetch all products
const getAllProducts = () => 
  axiosClient.get('/products?populate=*').then((resp) => { return resp.data.data });

// Fetch products by category
const getProductByCategory = (category) => 
  axiosClient.get(`/products?filters[categories][name][$eq]=${category}&populate=*`)
    .then((resp) => resp.data.data);

// Registration API
const registration = (username, email, password) => 
  axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
  });

// Add Login API function
const SignIn = (email, password) => 
  axiosClient.post('/auth/local', {
    identifier: email, // 'identifier' is typically used for the email
    password: password
  });
  const addToCart = (data, jwt) => 
    axiosClient.post('/user-carts', data, { 
      headers: {  // Corrected typo here
        Authorization: `Bearer ${jwt}`, // Added a space after Bearer
      },
    });
    const getCartItems = (userId, jwt) => 
      axiosClient.get(`/user-carts?filters[userId][$eq]=${userId}&populate=*`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(resp => resp.data.data);  // Ensure you return the correct response data
    

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductByCategory,
  registration,
  SignIn,
  addToCart,
  getCartItems, // Export the login function
};
