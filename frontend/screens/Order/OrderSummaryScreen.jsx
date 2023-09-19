import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';

const OrderSummaryScreen = ({ route }) => {
    const { order } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading} accessibilityRole="header" accessibilityLabel="Order Summary">
                Order Summary
            </Text>
            <ScrollView>
                <FlatList
                    data={order.orderItems}
                    keyExtractor={(item) => item.product}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text
                                        style={styles.itemPrice}
                                        accessibilityRole="text"
                                        accessibilityLabel={`Price: $${item.price.toFixed(2)}`}
                                    >
                                        Price: Rs {item.price.toFixed(2)}
                                    </Text>
                                    <Text
                                        style={styles.itemQuantity}
                                        accessibilityRole="text"
                                        accessibilityLabel={`Quantity: ${item.quantity}`}
                                    >
                                        Quantity: {item.quantity}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
                <View style={styles.shippingCard}>
                    <Text
                        style={styles.shippingHeading}
                        accessibilityRole="header"
                        accessibilityLabel="Shipping Details Heading"
                    >
                        Shipping Details
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`Name: ${order.shippingDetails.name}`}
                    >
                        Name: {order.shippingDetails.name}
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`Address: ${order.shippingDetails.address}`}
                    >
                        Address: {order.shippingDetails.address}
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`State: ${order.shippingDetails.state}`}
                    >
                        State: {order.shippingDetails.state}
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`City: ${order.shippingDetails.city}`}
                    >
                        City: {order.shippingDetails.city}
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`Country: ${order.shippingDetails.country}`}
                    >
                        Country: {order.shippingDetails.country}
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`Phone: ${order.shippingDetails.phone}`}
                    >
                        Phone: {order.shippingDetails.phone}
                    </Text>
                    <Text
                        style={styles.shippingText}
                        accessibilityRole="text"
                        accessibilityLabel={`Shipping Method: ${order.shippingMethod}`}
                    >
                        Shipping Method: {order.shippingMethod}
                    </Text>
                </View>
            </ScrollView>

            <Text
                style={styles.totalPrice}
                accessibilityRole="text"
                accessibilityLabel={`Total Price: $${order.totalPrice.toFixed(2)}`}
            >
                Total Price: Rs {order.totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity
                style={{ ...styles.button, backgroundColor: 'blue' }}
                onPress={() => navigation.navigate('Home')}
                accessibilityRole="button"
                accessibilityLabel="Continue Shopping Button"
            >
                <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 20,
        color: 'green',
    },
    itemQuantity: {
        fontSize: 18,
    },
    shippingCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 20,
    },
    shippingHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    shippingText: {
        fontSize: 20,
        marginBottom: 5,
    },
    totalPrice: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'right',
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

export default OrderSummaryScreen;
