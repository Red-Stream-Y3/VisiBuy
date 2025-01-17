import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { productItemStyles } from '../../styles/SharedStyles';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const { cart, removeFromCart } = useCart();
    const navigation = useNavigation();

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.product._id}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingTop: 10,
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={productItemStyles.container}>
                        <View style={productItemStyles.imageContainer}>
                            <Image
                                source={{ uri: item.product.images[0].url }}
                                style={productItemStyles.image}
                                accessibilityLabel={`Product Image: ${item.product.name}`}
                            />
                        </View>
                        <View style={productItemStyles.detailsContainer}>
                            <Text style={productItemStyles.name}>{item.product.name}</Text>
                            <Text
                                style={productItemStyles.price}
                                accessibilityLabel={`Product Price: $${item.product.price}`}
                            >
                                Rs {item.product.price}
                            </Text>
                            <Text
                                style={productItemStyles.quantity}
                                accessibilityLabel={`Product Quantity: ${item.quantity}`}
                            >
                                Quantity: {item.quantity}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={productItemStyles.deleteButton}
                            onPress={() => handleRemoveItem(item.product._id)}
                        >
                            <FontAwesome name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View>
                <Text
                    style={{
                        textAlign: 'right',
                        fontSize: 22,
                        padding: 15,
                        fontWeight: 'bold',
                        borderRadius: 10,
                        marginBottom: 10,
                        marginRight: 10,
                    }}
                    accessibilityLabel={`Total Price: $${totalPrice.toFixed(2)}`}
                >
                    Total Amount: Rs {totalPrice.toFixed(2)}
                </Text>

                <TouchableOpacity
                    style={{ ...productItemStyles.button, backgroundColor: 'blue' }}
                    onPress={() =>
                        cart.length > 0 ? navigation.navigate('ShippingScreen') : navigation.navigate('ProductScreen')
                    }
                    accessibilityLabel="Checkout Button"
                    accessibilityRole="button"
                >
                    <Text style={productItemStyles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartScreen;
