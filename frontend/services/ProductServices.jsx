import axios from 'axios';

const BASE_URL = 'http://localhost:9120';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/products`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
