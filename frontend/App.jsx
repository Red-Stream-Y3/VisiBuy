import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    Register,
    MenuScreen,
    ProfileScreen,
    ProductScreen,
    ProductDetailScreen,
    CartScreen,
    ShippingScreen,
    OrdersScreen,
    OrderSummaryScreen,
    DeliveredOrders,
    ReviewScreen,
    ScanScreen,
    VoiceModeScreen,
} from './screens';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

const Stack = createStackNavigator();

const App = () => {
    return (
        <ToastProvider>
            <UserProvider>
                <CartProvider>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <Stack.Navigator initialRouteName="Login">
                                <Stack.Screen
                                    name="Home"
                                    component={MenuScreen}
                                    options={{
                                        headerBackVisible: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="Login"
                                    component={LoginScreen}
                                    options={{ title: '', headerBackVisible: true }}
                                />
                                <Stack.Screen name="Register" component={Register} options={{ title: '' }} />
                                <Stack.Screen
                                    name="ProductScreen"
                                    component={ProductScreen}
                                    options={{ title: 'Browse Products' }}
                                />
                                <Stack.Screen
                                    name="ScanScreen"
                                    component={ScanScreen}
                                    options={{ title: 'Scan Products' }}
                                />
                                <Stack.Screen
                                    name="ProfileScreen"
                                    component={ProfileScreen}
                                    options={{ title: 'Your Profile' }}
                                />
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
                                    name="OrdersScreen"
                                    component={OrdersScreen}
                                    options={{ title: 'Your Orders' }}
                                />
                                <Stack.Screen
                                    name="OrderSummaryScreen"
                                    component={OrderSummaryScreen}
                                    options={{ title: 'Order Summary' }}
                                />
                                <Stack.Screen
                                    name="DeliveredOrders"
                                    component={DeliveredOrders}
                                    options={{ title: 'Delivered Orders' }}
                                />
                                <Stack.Screen
                                    name="ReviewScreen"
                                    component={ReviewScreen}
                                    options={({ route }) => ({ title: route.params.product.name })}
                                />
                                <Stack.Screen
                                    name="VoiceModeScreen"
                                    component={VoiceModeScreen}
                                    options={{ title: 'Voice Mode' }}
                                />
                            </Stack.Navigator>
                        </SafeAreaProvider>
                    </NavigationContainer>
                </CartProvider>
            </UserProvider>
        </ToastProvider>
    );
};

export default App;
