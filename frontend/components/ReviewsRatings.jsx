import React, { forwardRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StarRating from './StarRating'; // Import the StarRating component

const ReviewsRatings = forwardRef(({ review }, ref) => {
    return (
        <View ref={ref} style={styles.container}>
            <Text style={styles.username}>{review.name}</Text>
            <StarRating rating={review.rating} /> {/* Display the star rating */}
            <Text style={styles.comment}>{review.comment}</Text>
            {/* Add any other review details you want to display */}
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
    },
    username: {
        fontWeight: 'bold',
    },
    comment: {
        marginTop: 5,
    },
});

export default ReviewsRatings;
