import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProductDetailScreen, OrderScreen } from './screens';
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
              name="OrderScreen"
              component={OrderScreen}
              options={{ title: 'Your Cart 🛒' }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
