import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
  ProductDetailScreen,
  CartScreen,
  ShippingScreen,
  OrderSummaryScreen,
} from './screens';
import { CartProvider } from './context/CartContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={({ route }) => ({ title: route.params.product.name })}
            />
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{ title: 'Your Cart 🛒' }}
            />
            <Stack.Screen
              name="ShippingScreen"
              component={ShippingScreen}
              options={{ title: 'Shipping Information' }}
            />
            <Stack.Screen
              name="OrderSummaryScreen"
              component={OrderSummaryScreen}
              options={{ title: 'Order Summary' }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
