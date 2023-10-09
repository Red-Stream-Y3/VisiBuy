import React, { forwardRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
//import { deleteReview } from '../services/ProductServices';
import axios from 'axios';

const ReviewsRatings = forwardRef(({ review, loggedInUserId, product }, ref) => {
    const isReviewWriter = review.user.toString() === loggedInUserId;
    const reviewId = review._id;
    const productId = product._id;

    const BASE_URL = 'https://visibuyapp-e9453e5950ca.herokuapp.com';

    const handleDeleteReview = async () => {
        console.log('Product ID:', productId);
        console.log('Review ID:', reviewId);

        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/products/${productId}/reviews/${reviewId}`);

            console.log('Review deleted:', response.data);
            toast.show('Review deleted!', {
                type: 'danger',
                duration: 3000,
                animationType: 'zoom-in',
                textStyle: {
                    fontSize: 30,
                    color: 'white',
                },
                containerStyle: {
                    height: 60,
                    paddingHorizontal: 20,
                    backgroundColor: '#333',
                },
                placement: 'bottom',
            });
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <View ref={ref} style={styles.container}>
            <Text style={styles.username}>{review.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.comment}>{review.comment}</Text>
                </View>

                {isReviewWriter && (
                    <TouchableOpacity onPress={handleDeleteReview}>
                        <FontAwesome name="trash" size={26} color="red" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'column',
    },
    username: {
        fontWeight: 'bold',
    },
    comment: {
        marginTop: 5,
        marginStart: 5,
        marginRight: 20,
    },
});

export default ReviewsRatings;
