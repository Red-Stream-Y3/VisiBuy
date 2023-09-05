import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartButton = () => {
  const { cart } = useCart();
  const navigation = useNavigation();

  if (cart.length === 0) return null;

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCartClick = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <TouchableOpacity onPress={handleCartClick}>
      <View style={styles.cartIcon}>
        <Text style={styles.cartText}>View Cart ({totalQuantity})</Text>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartButton;
