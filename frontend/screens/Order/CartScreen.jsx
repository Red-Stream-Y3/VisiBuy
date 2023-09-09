import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '../../context/CartContext';
import { productItemStyles } from '../../styles/SharedStyles';
import { useNavigation } from '@react-navigation/native';
import { createCart } from '../../services/OrderServices';
import { useUser } from '../../context/UserContext';

const CartScreen = () => {
    const { user } = useUser();
    const { cart } = useCart();
    const navigation = useNavigation();

    const uId = user ? user._id : '641aaee2b8ed930c6e7186c1';

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleCheckout = async () => {
        const cartItems = {
            orderItems: [
                ...cart.map((item) => ({
                    name: item.product.name,
                    quantity: item.quantity,
                    image: item.product.images[0].url,
                    price: item.product.price,
                    product: item.product._id,
                })),
            ],
            uId,
        };

        try {
            await createCart(cartItems);
            navigation.navigate('ShippingScreen');
        } catch (error) {
            console.log(error);
        }
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
                    Total Price: Rs {totalPrice.toFixed(2)}
                </Text>

                <TouchableOpacity
                    style={{ ...productItemStyles.button, backgroundColor: 'blue' }}
                    onPress={() => handleCheckout()}
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
