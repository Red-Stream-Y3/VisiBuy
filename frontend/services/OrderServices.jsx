import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:9120';

export const createOrder = async (order) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/orders`, order);
        return response.data;
    } catch (error) {
        throw new Error('Error creating order');
    }
};

export const getOrderDetailsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error getting order details');
    }
};
