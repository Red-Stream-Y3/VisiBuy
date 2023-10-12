import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { updateUser } from '../../services/UserServices';
import { Vibration } from 'react-native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user, setUser } = useUser();

    // State variables to store user information
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');

    // useEffect to pre-fill input fields with user details when user context is available
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setAddress(user.address || '');
            setApartment(user.apartment || '');
            setState(user.state || '');
            setCity(user.city || '');
            setCountry(user.country || '');
            setPostalCode(user.postalCode || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    // Function to update user information
    const updateProfile = async () => {
        try {
            await updateUser({
                id: user._id,
                name,
                address,
                apartment,
                state,
                city,
                country,
                postalCode,
                phone,
            });

            setUser({
                ...user,
                name,
                address,
                apartment,
                state,
                city,
                country,
                postalCode,
                phone,
            });
            Vibration.vibrate(250);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    // Function to cancel update
    const cancelUpdate = () => {
        navigation.navigate('Home');
    };

    const handleLogout = () => {
        setUser(null);
        Vibration.vibrate(250);
        navigation.navigate('Login');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Profile Information</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        accessibilityLabel="Name Input"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        accessibilityLabel="Address Input"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apartment</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apartment (Optional)"
                        value={apartment}
                        onChangeText={setApartment}
                        accessibilityLabel="Apartment Input (Optional)"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="State"
                        value={state}
                        onChangeText={setState}
                        accessibilityLabel="State Input"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                        accessibilityLabel="City Input"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                        accessibilityLabel="Country Input"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Postal Code</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        value={postalCode}
                        onChangeText={setPostalCode}
                        accessibilityLabel="Postal Code Input"
                        accessibilityRole="text"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={setPhone}
                        accessibilityLabel="Phone Input"
                        accessibilityRole="text"
                    />
                </View>

                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: 'blue' }}
                    onPress={updateProfile}
                    accessibilityLabel="Update Profile Button"
                >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: 'gray' }}
                    onPress={handleLogout}
                    accessibilityLabel="Logout Button"
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: 'gray' }}
                    onPress={cancelUpdate}
                    accessibilityLabel="Cancel Update Button"
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
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
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default ProfileScreen;
