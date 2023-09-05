import React from 'react';
import { View, Text, Button, Image, FlatList } from 'react-native';
import { useCart } from '../../context/CartContext';
import { productItemStyles } from '../../styles/SharedStyles';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart } = useCart();
  const navigation = useNavigation();

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

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
        <Text
          style={{
            textAlign: 'right',
            fontSize: 18,
            padding: 15,
            fontWeight: 'bold',
            borderRadius: 10,
            marginBottom: 10,
            marginRight: 10,
          }}
        >
          Total Price: ${totalPrice.toFixed(2)}
        </Text>

        <Button
          title="Checkout"
          onPress={() => navigation.navigate('ShippingScreen')}
        />
      </View>
    </View>
  );
};

export default CartScreen;
