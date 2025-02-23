const { default: axios } = require('axios'); // browser
const axiosClient = axios.create({ baseURL: 'http://localhost:1337/api' });

const getCategory = () => axiosClient.get('/categories?populate=*'); // Updated endpoint

export default {
  getCategory,
};
