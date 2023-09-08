import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../services/UserServices';
import { useUser } from '../../context/UserContext';

const Register = () => {
    const navigation = useNavigation();
    const { setUser } = useUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const user = await registerUser({ name, email, password });

            setUser(user);

            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                accessibilityLabel="Name Input"
                accessibilityRole="text"
            />
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
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password Input"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                accessibilityLabel="Register Button"
                accessibilityRole="button"
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={goToLogin}
                accessibilityLabel="Login Button"
                accessibilityRole="button"
            >
                <Text style={styles.loginButtonText}>Login</Text>
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
    loginButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Register;
