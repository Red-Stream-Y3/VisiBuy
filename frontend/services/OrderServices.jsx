import axios from 'axios';

const BASE_URL = 'http://192.168.8.101:9120';

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

export const markOrderAsDelivered = async (orderId) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/v1/orders/${orderId}/deliver`);
        return response.data;
    } catch (error) {
        throw new Error('Error marking order as delivered');
    }
};

export const createCart = async (cart) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/carts`, cart);
        return response.data;
    } catch (error) {
        throw new Error('Error creating cart');
    }
};

export const updateCart = async (cart) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/v1/carts/${cart.id}`, cart);
        return response.data;
    }
    catch (error) {
        throw new Error('Error updating cart');
    }
}

