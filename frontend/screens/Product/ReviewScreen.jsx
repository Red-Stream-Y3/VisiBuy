import React, { useRef, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { ReviewsRatings, StarRating } from '../../components';
import { createProductReview } from '../../services/ProductServices';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const ReviewScreen = ({ route }) => {
    const toast = useToast();
    const { product } = route.params;
    const reviewItemRef = useRef(null);
    const { user, setUser } = useUser();
    const navigation = useNavigation();

    const proID = product.product;

    // const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isCommentValid, setIsCommentValid] = useState(true);

    const handlePostReview = async () => {
        try {
            const newReview = {
                user: user._id,
                name: user.name,
                comment: comment,
                rating: rating,
                productID: proID,
            };

            const response = await createProductReview(proID, newReview);

            if (response && response.error) {
                throw new Error(response.error);
            }

            console.log('Review created:', response);
            toast.show('Review posted!', {
                type: 'success',
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
            console.error('Error creating review:', error.message);
            toast.show('Product already reviewed!!', {
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
            // Display a user-friendly error message to the user, e.g., toast.show(error.message)
        }
    };

    const validateComment = () => {
        const isValidCom = comment.trim() !== ''; // Check if comment is not empty
        setIsCommentValid(isValidCom);

        // Enable the button if both inputs are valid
        setIsValid(isValidCom && !isNaN(parseFloat(rating)) && parseFloat(rating) >= 1 && parseFloat(rating) <= 5);
    };

    const validateRating = (text) => {
        // Check if it's a number and within the range [1, 5]
        setIsValid(isCommentValid && !isNaN(parseFloat(text)) && parseFloat(text) >= 1 && parseFloat(text) <= 5);
        setRating(text);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.name} accessibilityLabel={`${product.name} Name`} accessibilityRole="header">
                {product.name}
            </Text>
            <Text style={styles.price} accessibilityLabel={`Price ${product.price}`} accessibilityRole="text">
                ${product.price}
            </Text>
            {/* <Text
                style={styles.description}
                accessibilityLabel={`${product.name} Description`}
                accessibilityRole="text"
            >
                {product.description}
            </Text> */}

            {/* ReviewsRatings component */}
            <View style={styles.reviewContainer}>
                <View style={styles.reviewHeaderSection}>
                    <Text style={styles.reviewHeader} accessibilityLabel="Add Review" accessibilityRole="text">
                        Add Review
                    </Text>
                </View>
                {/* Write Review Input */}
                <TextInput
                    style={[styles.input, !isCommentValid && styles.invalidInput]}
                    placeholder="Write your review..."
                    multiline
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    onBlur={validateComment} // Validate on blur
                    accessibilityLabel="Review Input"
                    accessibilityHint="Please enter your review here." // Provide a hint if needed
                />
                {!isCommentValid && (
                    <Text
                        style={styles.errorMessage}
                        accessibilityLabel="Review Input Error Message -  This field is required"
                        accessibilityRole="text" // Assuming this is a text element
                    >
                        This field is required.
                    </Text>
                )}

                <TextInput
                    style={[styles.input, !isValid && styles.invalidInput]}
                    placeholder="Rate product out of 5"
                    value={rating}
                    onChangeText={validateRating} // Validate rating on text change
                    keyboardType="numeric"
                    accessibilityLabel="Review Input"
                    accessibilityHint="Please rate the product in a scale of 1 to 5."
                />
                {!isValid && (
                    <Text
                        style={styles.errorMessage}
                        accessibilityLabel="Rate Input Error Message - Please enter a valid rating between 1 and 5"
                        accessibilityRole="text"
                    >
                        Please enter a valid rating between 1 and 5.
                    </Text>
                )}
                {/* Post Button */}
                <TouchableOpacity
                    style={[styles.postBtn, (!isValid || !isCommentValid) && styles.disabledBtn]}
                    onPress={handlePostReview}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Post Review"
                    disabled={!isValid || !isCommentValid} // Disable the button if either is not valid
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
        fontSize: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    invalidInput: {
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        marginTop: 5,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
    },
    disabledBtn: {
        backgroundColor: 'gray',
        opacity: 0.6,
    },
});

export default ReviewScreen;
