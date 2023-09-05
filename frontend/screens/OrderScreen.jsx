import React from 'react';
import { View, Text, Button, Image, FlatList } from 'react-native';
import { useCart } from '../context/CartContext';
import { productItemStyles } from '../styles/SharedStyles'; // Import sharedStyles

const OrderScreen = () => {
  const { cart } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product._id}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={productItemStyles.container}>
            <View style={productItemStyles.imageContainer}>
              <Image
                source={{ uri: item.product.images[0].url }}
                style={productItemStyles.image}
              />
            </View>
            <View style={productItemStyles.detailsContainer}>
              <Text style={productItemStyles.name}>{item.product.name}</Text>
              <Text style={productItemStyles.price}>${item.product.price}</Text>
              <Text style={productItemStyles.quantity}>
                Quantity: {item.quantity}
              </Text>
            </View>
          </View>
        )}
      />
      <View>
        <Button title="Place Order" onPress={() => handlePlaceOrder()} />
      </View>
    </View>
  );
};

export default OrderScreen;
