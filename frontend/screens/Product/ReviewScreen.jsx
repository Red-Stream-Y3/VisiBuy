import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ReviewsRatings, StarRating } from '../../components';
import { createProductReview } from '../../services/ProductServices';

const ReviewScreen = ({ route }) => {
    const { product } = route.params;
    const [comment, setComment] = useState('');
    const reviewItemRef = useRef(null);

    const proID = product.product;

    const handlePostReview = async () => {
        try {
            const newReview = {
                user: '641aaee2b8ed930c6e7186c1',
                name: 'John Doe',
                comment: comment,
                rating: '3',
                productID: proID,
            };

            const response = await createProductReview(proID, newReview);

            console.log('Review created:', response);
        } catch (error) {
            console.error('Error creating review:', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.name} accessibilityLabel={`${product.name} Name`} accessibilityRole="header">
                {product.name}
            </Text>
            <Text style={styles.price} accessibilityLabel={`${product.name} Price`} accessibilityRole="text">
                ${product.price}
            </Text>
            <Text
                style={styles.description}
                accessibilityLabel={`${product.name} Description`}
                accessibilityRole="text"
            >
                {product.description}
            </Text>

            {/* ReviewsRatings component */}
            <View style={styles.reviewContainer}>
                <View style={styles.reviewHeaderSection}>
                    <Text style={styles.reviewHeader}>Reviews</Text>
                    <View style={styles.rightSection}>
                        <StarRating rating={product.rating} />
                        <Text style={styles.ratingText}>{product.numReviews} Ratings</Text>
                    </View>
                </View>
                {/* Write Review Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Write your review..."
                    multiline
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />

                {/* Post Button */}
                <TouchableOpacity
                    style={styles.postBtn}
                    onPress={handlePostReview}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Post Review"
                >
                    <Text style={styles.postBtnText}>Post Review</Text>
                </TouchableOpacity>

                {/* Reviews List */}

                <View style={styles.reviewList}>
                    {product.reviews &&
                        product.reviews.map((review, index) => (
                            <ReviewsRatings key={review._id} review={review} ref={reviewItemRef} />
                        ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: 'green',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    reviewContainer: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 20,
    },

    reviewHeaderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    reviewHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },

    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    ratingText: {
        marginLeft: 8,
        color: '#777',
    },

    reviewList: {
        color: '#777',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        minHeight: 100,
    },
    postBtn: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginBottom: 15,
    },
    postBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReviewScreen;