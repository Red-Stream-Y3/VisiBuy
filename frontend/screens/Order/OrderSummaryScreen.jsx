import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';

const OrderSummaryScreen = ({ route }) => {
    const { order } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container} accessibilityLabel="Order Summary">
            {/* <Text style={styles.heading} accessibilityRole="header" accessibilityLabel="Order Summary">
                Order Summary
            </Text> */}
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
                                    <Text style={styles.itemPrice}>
                                        Rs {item.price.toFixed(2)} X {item.quantity}
                                    </Text>
                                    {/* <Text style={styles.total}>Rs {item.price.toFixed(2) * item.quantity} </Text> */}
                                </View>
                            </View>
                        </View>
                    )}
                />
                <View style={styles.shippingCard}>
                    <Text style={styles.shippingHeading}>Shipping Details</Text>
                    <View style={styles.shippingDetails}>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>Name:</Text>
                            <Text style={styles.shippingValue}>{order.shippingDetails.name}</Text>
                        </View>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>Address:</Text>
                            <Text style={styles.shippingValue}>{order.shippingDetails.address}</Text>
                        </View>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>State:</Text>
                            <Text style={styles.shippingValue}>{order.shippingDetails.state}</Text>
                        </View>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>City:</Text>
                            <Text style={styles.shippingValue}>{order.shippingDetails.city}</Text>
                        </View>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>Country:</Text>
                            <Text style={styles.shippingValue}>{order.shippingDetails.country}</Text>
                        </View>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>Phone:</Text>
                            <Text style={styles.shippingValue}>{order.shippingDetails.phone}</Text>
                        </View>
                        <View style={styles.shippingRow}>
                            <Text style={styles.shippingLabel}>Method:</Text>
                            <Text style={styles.shippingValue}>{order.shippingMethod}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Text style={styles.totalPrice}>Total Price: Rs {order.totalPrice.toFixed(2)}</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 20,
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
        width: 130,
        height: 110,
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
        marginTop: 5,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'right',
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    shippingDetails: {
        marginTop: 10,
    },
    shippingRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    shippingLabel: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    shippingValue: {
        flex: 2,
        fontSize: 18,
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
