import axios from 'axios';

const BASE_URL = 'http://192.168.8.116:9120';

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

export const getDeliveredOrdersByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/orders/user/delivered/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error getting delivered order details');
    }
};
