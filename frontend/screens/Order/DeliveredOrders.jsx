import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getDeliveredOrdersByUserId } from '../../services/OrderServices'; // Update the path as needed
import { useNavigation } from '@react-navigation/native';

export default function DeliveredOrders() {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const userId = '641aaee2b8ed930c6e7186c1';

        const fetchOrderDetails = async () => {
            try {
                const orderDetails = await getDeliveredOrdersByUserId(userId);
                setOrders(orderDetails);
            } catch (error) {
                console.error('Error fetching order details:', error.message);
            }
        };

        fetchOrderDetails();
    }, []);

    return (
        <View contentContainerStyle={styles.container}>
            <Text accessibilityRole="header" accessibilityLabel="Delivered Orders"></Text>

            <FlatList
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        {/* <Text style={styles.cardTitle}>Order ID: {item._id}</Text> */}
                        <Text style={styles.cardText}>Order Date: {formatDate(item.createdAt)}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.cardText}>Subtotal: ${item.totalPrice.toFixed(2)}</Text>
                            {/* <Text style={styles.deliveredText}>Delivered</Text> */}
                        </View>
                        {item.orderItems.map((orderItem) => (
                            <View key={orderItem.product} style={styles.productCard}>
                                <Text style={styles.productName}>{orderItem.name}</Text>
                                <Text style={styles.productDetails}>
                                    Quantity: {orderItem.quantity} | Price: ${orderItem.price.toFixed(2)}
                                </Text>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="button"
                                    accessibilityLabel="Review Item"
                                >
                                    <Text style={styles.reviewText}>Review item</Text>
                                </TouchableOpacity>{' '}
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        margin: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 20,
        marginBottom: 5,
    },

    productCard: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productDetails: {
        fontSize: 19,
    },
    // deliveredText: {
    //     color: '#32CD32', // Text color
    //     fontSize: 18,
    //     marginBottom: 3,
    //     fontWeight: 'bold',
    //     marginLeft: 20,
    // },
    reviewText: {
        color: '#007bff', // Blue text color
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
});
