import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { createCart } from '../../services/OrderServices';
import { loginUser } from '../../services/UserServices';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { user, setUser } = useUser();
    const { cart, setCartID } = useCart();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const uId = user ? user._id : '641aaee2b8ed930c6e7186c1';

    const handleLogin = async () => {
        try {
            const loggedInUser = await loginUser({ email, password });
            setUser(loggedInUser);

            await AsyncStorage.setItem('userData', JSON.stringify(loggedInUser));
            navigation.navigate('Home');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const goToRegister = () => {
        navigation.navigate('Register');
    };

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
            const res = await createCart(cartItems);
            setCartID(res._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Email Input"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                keyboardType="numeric"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password Input"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    handleLogin();
                    handleCheckout();
                }}
                accessibilityLabel="Login Button"
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={goToRegister}
                accessibilityLabel="Register Button"
                accessibilityRole="button"
            >
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
        marginBottom: 15,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    registerButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default LoginScreen;
