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
        name: user ? user.name : '',
        address: user ? user.address : '',
        apartment: user ? user.apartment : '',
        state: user ? user.state : '',
        city: user ? user.city : '',
        country: user ? user.country : '',
        postalCode: user ? user.postalCode : '',
        phone: user ? user.phone : '',
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        address: '',
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

        setValidationErrors({ ...validationErrors, [field]: '' });
    };

    const handleSubmit = async () => {
        const errors = {};

        for (const key in shippingDetails) {
            if (!shippingDetails[key].trim()) {
                errors[key] = 'Field is required';
            }
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

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
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.name && styles.inputError]}
                            placeholder={`Full Name ${validationErrors.name ? `- ${validationErrors.name}` : ''}`}
                            value={shippingDetails.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                            accessibilityLabel="Full Name Input"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.address && styles.inputError]}
                            placeholder={`Address ${validationErrors.address ? `- ${validationErrors.address}` : ''}`}
                            value={shippingDetails.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                            accessibilityLabel="Address Input"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={`Apartment (optional)`}
                            value={shippingDetails.apartment}
                            onChangeText={(text) => handleInputChange('apartment', text)}
                            accessibilityLabel="Apartment Input"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.state && styles.inputError]}
                            placeholder={`State ${validationErrors.state ? `- ${validationErrors.state}` : ''}`}
                            value={shippingDetails.state}
                            onChangeText={(text) => handleInputChange('state', text)}
                            accessibilityLabel="State Input"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.city && styles.inputError]}
                            placeholder={`City ${validationErrors.city ? `- ${validationErrors.city}` : ''}`}
                            value={shippingDetails.city}
                            onChangeText={(text) => handleInputChange('city', text)}
                            accessibilityLabel="City Input"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.country && styles.inputError]}
                            placeholder={`Country ${validationErrors.country ? `- ${validationErrors.country}` : ''}`}
                            value={shippingDetails.country}
                            onChangeText={(text) => handleInputChange('country', text)}
                            accessibilityLabel="Country Input"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.postalCode && styles.inputError]}
                            placeholder={`Postal Code ${
                                validationErrors.postalCode ? `- ${validationErrors.postalCode}` : ''
                            }`}
                            value={shippingDetails.postalCode}
                            onChangeText={(text) => handleInputChange('postalCode', text)}
                            accessibilityLabel="Postal Code Input"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, validationErrors.phone && styles.inputError]}
                            placeholder={`Phone ${validationErrors.phone ? `- ${validationErrors.phone}` : ''}`}
                            value={shippingDetails.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            accessibilityLabel="Phone Input"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={{ ...styles.button, backgroundColor: 'blue' }}
                onPress={handleSubmit}
                accessibilityLabel="Place Order Button"
                accessibilityRole="button"
            >
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
        </>
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
    inputError: {
        borderColor: 'red',
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
    errorText: {
        color: 'red',
        fontSize: 14,
    },
});

export default ShippingScreen;
