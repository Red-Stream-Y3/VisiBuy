import axios from 'axios';

const BASE_URL = 'http://192.168.8.101:9120';

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/users/login`, user);
        return response.data;
    } catch (error) {
        throw new Error('Error logging in user');
    }
};

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/users`, user);
        return response.data;
    } catch (error) {
        throw new Error('Error registering user');
    }
};

export const updateUser = async (user) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/v1/users/account`, user);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating user');
    }
};
