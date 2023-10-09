import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ProductItem, CartButton } from '../../components';
import { getAllProducts } from '../../services/ProductServices';
import { isScreenReaderEnabled } from '../../utils/accessibility';

const ProductScreen = () => {
    const [products, setProducts] = useState([]);
    const firstProductRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch products data when the component mounts
        async function fetchProducts() {
            try {
                const productsData = await getAllProducts();
                setProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        // Check if a screen reader is enabled
        const checkScreenReader = async () => {
            const screenReaderEnabled = await isScreenReaderEnabled();

            if (screenReaderEnabled) {
                // Logic for screen reader accessibility
                products.forEach((product, index) => {
                    const label = `Product Name: ${product.name}`;
                    const hint = `Price: $${product.price}`;

                    // Accessible attributes for each ProductItem component
                    if (firstProductRef.current && index === 0) {
                        // First item for screen readers
                        firstProductRef.current.setAccessibilityFocus();
                    }

                    product.accessibilityRole = 'button';
                    product.accessibilityState = { selected: false };

                    product.accessibilityLabel = label;
                    product.accessibilityHint = hint;
                });
            }
        };

        checkScreenReader();
    }, [products]);

    // Function to navigate to the ProductDetailScreen
    const navigateToProductDetail = (product) => {
        navigation.navigate('ProductDetailScreen', { product });
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.header} accessibilityRole="header">
                Products
            </Text> */}
            <ScrollView
                vertical
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingTop: 10,
                }}
                showsHorizontalScrollIndicator={false}
            >
                {products.map((product, index) => (
                    // Wrap each ProductItem in a TouchableOpacity for selection
                    <TouchableOpacity
                        key={product._id}
                        onPress={() => navigateToProductDetail(product)} // Navigate to ProductDetailScreen on press
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel={`Product: ${product.name}`}
                        accessibilityHint={`Price: $${product.price}`}
                    >
                        <ProductItem
                            key={product}
                            product={product}
                            ref={(ref) => {
                                // Store a reference to the first ProductItem component
                                if (index === 0) {
                                    firstProductRef.current = ref;
                                }
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* <AccessibilityButton label="Check Screen Reader" onPress={() => {}} /> */}
            <CartButton accessibilityLabel="Cart Button" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ProductScreen;
