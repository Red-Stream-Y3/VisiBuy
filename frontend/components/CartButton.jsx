import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartButton = () => {
    const { cart } = useCart();
    const navigation = useNavigation();

    if (cart.length === 0) return null;

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleCartClick = () => {
        navigation.navigate('CartScreen');
    };

    return (
        <TouchableOpacity
            onPress={handleCartClick}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Total Quantity (${totalQuantity}) and Total Price (${totalPrice.toFixed(2)})`}
        >
            <View style={styles.cartIcon}>
                <Text style={styles.cartText}>View Cart ({totalQuantity})</Text>
                <Text style={styles.totalPrice}>Rs {totalPrice.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cartIcon: {
        backgroundColor: 'yellow',
        padding: 30,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cartText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 24,
    },
    cartQuantity: {
        color: 'blue',
        fontSize: 24,
    },
    totalPrice: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default CartButton;
