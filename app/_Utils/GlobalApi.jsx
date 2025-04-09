const { default: axios } = require('axios');

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.155:1337/api',  // Base URL of your API
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

// Add a product to the cart
const addToCart = (data, jwt) => 
  axiosClient.post('/user-carts', data, { 
    headers: {  
      Authorization: `Bearer ${jwt}`, // Added a space after Bearer
    },
  });

// Get cart items for a user
const getCartItems = (userId, jwt) => 
  axiosClient.get(`/user-carts?filters[userId][$eq]=${userId}&populate[products][populate]=image`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  .then(resp => {
    const data = resp.data.data;
    // Map through each cart item and extract relevant details
    const cartItemList = data.map((item, index) => {
      const product = item.products[0];  // Since each item has one product in this case
      const imageUrl = product.image[0]?.url; // Get the product image URL (if available)

      return {
        cartId: item.id,
        quantity: item.quantity,
        amount: item.amount,
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        productPrice: product.SellingPrice,
        productImage: imageUrl ? `http://192.168.1.155:1337${imageUrl}` : null, // Full URL for the image
      };
    });

    return cartItemList; // Return the mapped data
  })
  .catch(error => {
    console.error('Error fetching cart items:', error);
    throw error; // Optionally throw the error to handle it outside this function
  });

// Delete a cart item
const deleteCartItem = (id, jwt) => {
  console.log("Deleting cart item with id:", id); // Log the id to verify it's correct
  return axiosClient.delete(`/user-carts/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`, // Ensure the Authorization header is correct
    }
  });
};

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductByCategory,
  registration,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem
};
