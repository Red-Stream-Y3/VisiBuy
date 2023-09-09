import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/OrderServices';
import { useUser } from '../../context/UserContext';

const ShippingScreen = ({ navigation }) => {
    const { user } = useUser();
    const { cart, clearCart } = useCart();

    const uId = user ? user._id : '641aaee2b8ed930c6e7186c1';

    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        apartment: '',
        state: '',
        city: '',
        country: '',
        postalCode: '',
        phone: '',
    });

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleInputChange = (field, value) => {
        setShippingDetails({
            ...shippingDetails,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const order = {
                uId,
                orderItems: [
                    ...cart.map((item) => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        image: item.product.images[0].url,
                        price: item.product.price,
                        product: item.product._id,
                    })),
                ],
                shippingDetails,
                totalPrice,
            };

            const createdOrder = await createOrder(order);

            clearCart();

            navigation.navigate('OrderSummaryScreen', { order: createdOrder });
        } catch (error) {
            console.error('Error creating order:', error.message);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        onChangeText={(text) => handleInputChange('name', text)}
                        accessibilityLabel="Full Name Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        onChangeText={(text) => handleInputChange('address', text)}
                        accessibilityLabel="Address Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Apartment (optional)"
                        onChangeText={(text) => handleInputChange('apartment', text)}
                        accessibilityLabel="Apartment Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="State"
                        onChangeText={(text) => handleInputChange('state', text)}
                        accessibilityLabel="State Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        onChangeText={(text) => handleInputChange('city', text)}
                        accessibilityLabel="City Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        onChangeText={(text) => handleInputChange('country', text)}
                        accessibilityLabel="Country Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        onChangeText={(text) => handleInputChange('postalCode', text)}
                        accessibilityLabel="Postal Code Input"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        onChangeText={(text) => handleInputChange('phone', text)}
                        accessibilityLabel="Phone Input"
                    />
                </View>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: 'blue' }}
                    onPress={handleSubmit}
                    accessibilityLabel="Place Order Button"
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    button: {
        padding: 15,
        border: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default ShippingScreen;
