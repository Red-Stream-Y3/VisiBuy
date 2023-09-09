import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating, starSize = 30 }) => {
    // You can implement your star rating UI logic here.
    // For simplicity, we'll assume a 5-star rating system.
    const maxStars = 5;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <Text key={i} style={[styles.star, { fontSize: starSize }]}>
                    {i <= rating ? '★' : '☆'}
                </Text>,
            );
        }
        return stars;
    };

    return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
    star: {
        color: 'gold', // Default color for stars
    },
});

export default StarRating;
