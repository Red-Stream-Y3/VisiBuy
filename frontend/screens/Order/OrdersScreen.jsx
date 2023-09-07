import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { getOrderDetailsByUserId } from '../../services/OrderServices'; // Update the path as needed

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);

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
                const orderDetails = await getOrderDetailsByUserId(userId);
                setOrders(orderDetails);
            } catch (error) {
                console.error('Error fetching order details:', error.message);
            }
        };

        fetchOrderDetails();
    }, []);

    return (
        <View contentContainerStyle={styles.container}>
            <Text accessibilityRole="header" accessibilityLabel="Your Orders"></Text>

            <FlatList
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        {/* <Text style={styles.cardTitle}>Order ID: {item._id}</Text> */}
                        <Text style={styles.cardText}>Order Date: {formatDate(item.createdAt)}</Text>
                        <Text style={styles.cardText}>Subtotal: ${item.totalPrice.toFixed(2)}</Text>

                        {item.orderItems.map((orderItem) => (
                            <View key={orderItem.product} style={styles.productCard}>
                                <Text style={styles.productName}>{orderItem.name}</Text>
                                <Text style={styles.productDetails}>
                                    Quantity: {orderItem.quantity} | Price: ${orderItem.price.toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

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
        marginBottom: 20,
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
});

export default OrdersScreen;
