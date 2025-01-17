import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { searchProducts, getAllProducts } from '../../services/ProductServices';
import { useNavigation } from '@react-navigation/native';
import ProductItem from '../../components/ProductItem';
import { CartButton } from '../../components';
import { Vibration } from 'react-native';

const NoProductsMessage = () => (
    <View style={styles.noProductsContainer}>
        <Text style={styles.noProductsText}>No products found</Text>
    </View>
);

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigation = useNavigation();

    const handleSearchChange = (text) => {
        setSearchQuery(text);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            const allProducts = await getAllProducts();
            setSearchResults(allProducts);
        } else {
            try {
                const results = await searchProducts(searchQuery);
                setSearchResults(results);
            } catch (error) {
                console.error('Error searching products:', error.message);
            }
        }
        Vibration.vibrate(250);
    };

    useEffect(() => {
        handleSearch();
    }, []);

    const navigateToProductDetail = (product) => {
        navigation.navigate('ProductDetailScreen', { product });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter product name"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {searchResults.length === 0 ? (
                <NoProductsMessage />
            ) : (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigateToProductDetail(item)}
                            accessibilityRole="button"
                            accessibilityLabel={`Product: ${item.name}`}
                            accessibilityHint={`Price: $${item.price}`}
                        >
                            <ProductItem product={item} />
                        </TouchableOpacity>
                    )}
                />
            )}
            <CartButton accessibilityLabel="Cart Button" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    input: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchButton: {
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'blue',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    resultItem: {
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    noProductsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    noProductsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SearchScreen;
