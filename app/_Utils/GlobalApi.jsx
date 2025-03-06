const { default: axios } = require('axios');

const axiosClient = axios.create({
  baseURL: 'http://10.10.128.227:1337/api',
});

// Fetch categories with populated fields
const getCategory = () => axiosClient.get('/categories?populate=*');

// Fetch sliders with populated fields
const getSliders = () => 
  axiosClient.get('/sliders?populate=*').then((resp) =>{return  resp.data.data});
const getCategoryList = () => 
  axiosClient.get('/categories?populate=*').then((resp) => {return resp.data.data});

const getAllProducts = () => 
  axiosClient.get('/products?populate=*').then((resp) => {return resp.data.data});

const getProductByCategory = (category) => 
  axiosClient.get(`/products?filters[categories][name][$eq]=${category}&populate=*`)
    .then((resp) =>  resp.data.data);
 const registration = (username, email, password) => 
      axiosClient.post('/auth/local/register', {
        username: username,
        email: email,
        password: password
      });

    export default{
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductByCategory,
  registration,
}; 