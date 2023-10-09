import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ReviewsRatings, StarRating, CartButton } from '../../components';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const ProductDetailScreen = ({ route }) => {
    const { addToCart } = useCart();
    const { product } = route.params;
    const reviewItemRef = useRef(null);
    const { user, setUser } = useUser();
    const userID = user._id;

    const handleAddToCart = () => {
        addToCart(product);
    };

    const CustomButton = ({ title, onPress, style, buttonTextStyle }) => {
        return (
            <TouchableOpacity onPress={onPress} style={style}>
                <Text style={buttonTextStyle}>{title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: product.images[0].url }}
                    style={styles.image}
                    accessible={true}
                    accessibilityLabel={`${product.name} Image`}
                    accessibilityRole="image"
                />
                <Text style={styles.name} accessibilityLabel={`${product.name} Name`} accessibilityRole="header">
                    {product.name}
                </Text>
                <Text style={styles.price} accessibilityLabel={`${product.name} Price`} accessibilityRole="text">
                    Rs {product.price}
                </Text>
                <CustomButton
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={styles.button}
                    buttonTextStyle={styles.buttonText}
                />
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
                            {/* <Text style={styles.ratingText}>{product.numReviews}</Text> */}
                        </View>
                    </View>

                    <View style={styles.reviewList}>
                        {product.reviews &&
                            product.reviews.map((review, index) => (
                                <ReviewsRatings
                                    key={review._id}
                                    review={review}
                                    loggedInUserId={userID}
                                    ref={reviewItemRef}
                                    product={product}
                                />
                            ))}
                    </View>
                </View>
            </ScrollView>
            <CartButton accessibilityLabel="Add to Cart" product={product} />
        </>
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
        marginTop: 15,
    },
    button: {
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#5d96f0',
        marginHorizontal: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
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

export default ProductDetailScreen;
