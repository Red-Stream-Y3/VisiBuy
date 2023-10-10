import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getUserReviewedProducts } from '../../services/ProductServices';
const BASE_URL = 'https://visibuyapp-e9453e5950ca.herokuapp.com';
const ReviewedProducts = () => {
    const { user } = useUser();
    const [userProducts, setUserProducts] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/api/v1/products/user/reviewed-products/${user._id}`);
    //             setUserProducts(response.data);
    //             console.log('User products:', response.data);
    //         } catch (error) {
    //             console.error('Error fetching user reviewed products:', error);
    //         }
    //     };

    //     if (user) {
    //         fetchData();
    //     }
    // }, [user]);

    return (
        <View>
            <Text>ReviewedProducts</Text>
        </View>
    );
};

export default ReviewedProducts;

const styles = StyleSheet.create({});
