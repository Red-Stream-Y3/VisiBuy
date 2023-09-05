import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderSummaryScreen = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Summary</Text>

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
                  Price: ${item.price.toFixed(2)}
                </Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.shippingCard}>
        <Text style={styles.shippingHeading}>Shipping Details</Text>
        <Text style={styles.shippingText}>
          Name: {order.shippingDetails.name}
        </Text>
        <Text style={styles.shippingText}>
          Address: {order.shippingDetails.address}
        </Text>
        <Text style={styles.shippingText}>
          Apartment: {order.shippingDetails.apartment}
        </Text>
        <Text style={styles.shippingText}>
          State: {order.shippingDetails.state}
        </Text>
        <Text style={styles.shippingText}>
          City: {order.shippingDetails.city}
        </Text>
        <Text style={styles.shippingText}>
          Country: {order.shippingDetails.country}
        </Text>
        <Text style={styles.shippingText}>
          Postal Code: {order.shippingDetails.postalCode}
        </Text>
        <Text style={styles.shippingText}>
          Phone: {order.shippingDetails.phone}
        </Text>
      </View>

      <Text style={styles.totalPrice}>
        Total Price: ${order.totalPrice.toFixed(2)}
      </Text>

      <Button
        title="Continue Shopping"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
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
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
  },
  itemQuantity: {
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shippingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default OrderSummaryScreen;
