import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:9120';

const UserServices = {
    getAllTasks: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/users`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    },
};

export default UserServices;
