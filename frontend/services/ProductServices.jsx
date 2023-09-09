import axios from 'axios';

const BASE_URL = 'http://192.168.8.101:9120';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/products`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

export const createProductReview = async (productId, review) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/products/${productId}/reviews`, review);
        return response.data;
    } catch (error) {
        throw new Error('Error creating review');
    }
};
