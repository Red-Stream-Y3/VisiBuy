import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route }) => {
    const { product } = route.params;

    return (
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
                ${product.price}
            </Text>
            <Text
                style={styles.description}
                accessibilityLabel={`${product.name} Description`}
                accessibilityRole="text"
            >
                {product.description}
            </Text>
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
});

export default ProductDetailScreen;
