import axios from 'axios';

const BASE_URL = 'http://localhost:9120';

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/orders`, order);
    return response.data;
  } catch (error) {
    throw new Error('Error creating order');
  }
};
