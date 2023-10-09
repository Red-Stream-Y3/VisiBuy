import React, { forwardRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { deleteProductReview } from '../services/ProductServices';

const ReviewsRatings = forwardRef(({ review, loggedInUserId, product }, ref) => {
    const isReviewWriter = review.user.toString() === loggedInUserId;
    const revID = review._id;
    //console.log('review id', revID);

    const handleDelete = async (reviewId) => {
        // Rename the function to handleDelete
        try {
            // Call the deleteProductReview API service
            await deleteProductReview(product._id, reviewId);

            // If the deletion is successful, you can handle it here if needed.
        } catch (error) {
            // Handle the error gracefully, e.g., show an error message
            Alert.alert('Error', 'Unable to delete review. Please try again later.');
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
                    <TouchableOpacity onPress={() => handleDelete(revID)}>
                        <FontAwesome name="trash" size={30} color="red" />
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
