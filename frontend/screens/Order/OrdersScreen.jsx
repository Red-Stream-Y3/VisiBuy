import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';

import { getOrderDetailsByUserId, markOrderAsDelivered } from '../../services/OrderServices';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

const OrdersScreen = () => {
    const { user } = useUser();
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

    const fetchOrderDetails = async () => {
        try {
            const userId = user ? user._id : '641aaee2b8ed930c6e7186c1';
            const orderDetails = await getOrderDetailsByUserId(userId);
            setOrders(orderDetails);
        } catch (error) {
            console.error('Error fetching order details:', error.message);
        }
    };

    const markDelivered = async (orderId) => {
        try {
            await markOrderAsDelivered(orderId);
            fetchOrderDetails();
        } catch (error) {
            console.error('Error marking order as delivered:', error.message);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const navigateToDeliveredOrders = (order) => {
        navigation.navigate('DeliveredOrders', { order });
    };

    const generatePDF = async () => {
        const html = `<html>
<head>
    <title>Pending Orders</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #007bff;
            color: white;
        }
    </style>
</head>
<body>
<center><h1>Visibuy - Orders</h1></center>
    <table>
        <thead>
            <tr>
                <th>Order Date</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            ${orders
                .filter((order) => !order.delivered)
                .map(
                    (order) => `
                    <tr>
                        <td>${formatDate(order.createdAt)}</td>
                        <td>Rs ${order.totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <ul>
                                ${order.orderItems
                                    .map(
                                        (orderItem) => `
                                    <li>
                                        <strong>Product:</strong> ${orderItem.name}<br>
                                        <strong>Quantity:</strong> ${orderItem.quantity}<br>
                                        <strong>Price:</strong> Rs ${orderItem.price.toFixed(2)}
                                    </li>
                                `,
                                    )
                                    .join('')}
                            </ul>
                        </td>
                    </tr>
                `,
                )
                .join('')}
        </tbody>
    </table>
</body>
</html>
`;

        const { uri } = await Print.printToFileAsync({ html });

        const destinationPath = `${FileSystem.cacheDirectory}VisibuyOrders.pdf`;

        try {
            // Move the PDF file to the cache directory
            await FileSystem.moveAsync({ from: uri, to: destinationPath });

            // Get the content URI of the saved PDF
            const contentUri = await FileSystem.getContentUriAsync(destinationPath);

            if (Platform.OS === 'ios') {
                await Sharing.shareAsync(contentUri);
                return;
            } else {
                IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: contentUri,
                    flags: 1,
                    type: 'application/pdf',
                });
            }
        } catch (error) {
            console.error('Error saving PDF:', error);
        }
    };

    return (
        <View contentContainerStyle={styles.container}>
            <Text accessibilityRole="header" accessibilityLabel="Your Orders"></Text>

            <TouchableOpacity
                onPress={navigateToDeliveredOrders}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Delivered Orders"
                style={styles.deliveredButton}
            >
                <Text style={styles.deliveredButtonText}>Delivered Orders</Text>
            </TouchableOpacity>

            <View accessibilityRole="header" accessibilityLabel="Pending Orders" style={styles.headerContainer}>
                <Text style={styles.header}>Pending Orders</Text>
                <TouchableOpacity
                    onPress={generatePDF}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Download Pending Orders as PDF"
                    style={styles.downloadButton}
                >
                    <Text style={styles.downloadButtonText}>Print</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                contentContainerStyle={{ paddingBottom: 180 }}
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <ScrollView>
                        <View style={styles.orderCard}>
                            {/* <Text style={styles.cardTitle}>Order ID: {item._id}</Text> */}
                            <Text style={styles.cardText}>Order Date: {formatDate(item.createdAt)}</Text>
                            <Text style={styles.cardText}>Subtotal: Rs {item.totalPrice.toFixed(2)}</Text>

                            {item.orderItems.map((orderItem) => (
                                <View key={orderItem.product} style={styles.productCard}>
                                    <Text style={styles.productName}>{orderItem.name}</Text>
                                    <Text style={styles.productDetails}>
                                        Quantity: {orderItem.quantity} | Rs {orderItem.price.toFixed(2)}
                                    </Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                onPress={() => markDelivered(item._id)}
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityLabel="Mark as Delivered"
                                style={styles.deliveredButton}
                            >
                                <Text style={styles.deliveredButtonText}>Mark as Delivered</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    downloadButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'blue',
        marginHorizontal: 20,
    },
    downloadButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
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
        fontSize: 24,
        fontWeight: 'bold',
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
        fontSize: 22,
        fontWeight: 'bold',
    },
    productDetails: {
        fontSize: 20,
    },
    deliveredButton: {
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'blue',
        marginHorizontal: 20,
    },
    deliveredButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default OrdersScreen;
