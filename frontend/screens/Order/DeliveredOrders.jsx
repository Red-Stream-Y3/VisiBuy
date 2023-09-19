import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';

import { getDeliveredOrdersByUserId } from '../../services/OrderServices';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

export default function DeliveredOrders() {
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

    useEffect(() => {
        const userId = user ? user._id : '641aaee2b8ed930c6e7186c1';

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

    const handleReviewItem = (product) => {
        navigation.navigate('ReviewScreen', { product });
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
<center><h1>Visibuy - Delivered Orders</h1></center>
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
            <Text accessibilityRole="header" accessibilityLabel="Delivered Orders"></Text>
            <TouchableOpacity
                onPress={generatePDF}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Download Delivered Orders as PDF"
                style={styles.downloadButton}
            >
                <Text style={styles.downloadButtonText}>Print</Text>
            </TouchableOpacity>
            <ScrollView>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.orderCard}>
                            {/* <Text style={styles.cardTitle}>Order ID: {item._id}</Text> */}
                            <Text style={styles.cardText}>Order Date: {formatDate(item.createdAt)}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.cardText}>Subtotal: Rs {item.totalPrice.toFixed(2)}</Text>
                                {/* <Text style={styles.deliveredText}>Delivered</Text> */}
                            </View>
                            {item.orderItems.map((orderItem) => (
                                <View key={orderItem.product} style={styles.productCard}>
                                    <Text style={styles.productName}>{orderItem.name}</Text>
                                    <Text style={styles.productDetails}>
                                        Quantity: {orderItem.quantity} | Price: ${orderItem.price.toFixed(2)}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => handleReviewItem(orderItem)}
                                        accessible={true}
                                        accessibilityRole="button"
                                        accessibilityLabel="Review Item"
                                    >
                                        <Text style={styles.reviewText}>Review item</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                />
            </ScrollView>
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
    },
    downloadButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 20,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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
