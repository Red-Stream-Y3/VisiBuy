import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/OrderServices';

const ShippingScreen = ({ navigation }) => {
    const { cart, clearCart } = useCart();

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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apartment (optional)"
                onChangeText={(text) => handleInputChange('apartment', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                onChangeText={(text) => handleInputChange('state', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={(text) => handleInputChange('city', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                onChangeText={(text) => handleInputChange('country', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                onChangeText={(text) => handleInputChange('postalCode', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                onChangeText={(text) => handleInputChange('phone', text)}
            />
            <Button title="Place Order" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ShippingScreen;
