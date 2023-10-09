import axios from 'axios';

const BASE_URL = 'https://visibuyapp-e9453e5950ca.herokuapp.com';

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

export const getProductBySearch = async (search) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/products/search/${search}`);
        return response.data[0];
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

export const deleteProductReview = async (productId, reviewId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/products/${productId}/reviews/${reviewId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw new Error('Error deleting review');
    }
};

export const searchProducts = async (search) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/products/search/${search}`);
        return response.data;
    } catch (error) {
        throw new Error('Error searching products');
    }
};
