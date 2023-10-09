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
        if (error.response) {
            // The request was made and the server responded with a status code
            // other than 2xx (e.g., 404, 500).
            console.error('Error response from server:', error.response.data);
            throw new Error(`Server Error: ${error.response.data.message}`);
        } else if (error.request) {
            // The request was made but no response was received.
            console.error('No response received:', error.request);
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an error.
            console.error('Error setting up the request:', error.message);
            throw new Error('Request setup error');
        }
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

// export const deleteProductReview = async (productId, reviewId) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/api/v1/products/${productId}/reviews/${reviewId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting review:', error);
//         throw new Error('Error deleting review');
//     }
// };

export const deleteReview = async (productId, reviewId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/products/${productId}/reviews/${reviewId}`);
        return response.data;
    } catch (error) {
        throw error;
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
