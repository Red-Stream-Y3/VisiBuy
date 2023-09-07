import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuCard } from '../../components';

const menuData = [
    {
        id: '1',
        MenuName: 'Search',
        MenuIcon: 'search',
        Navigate: 'SearchScreen', // Change to the correct screen name where relevant
    },
    {
        id: '2',
        MenuName: 'Scan',
        MenuIcon: 'camera',
        Navigate: 'ScanScreen',
    },
    {
        id: '3',
        MenuName: 'Products',
        MenuIcon: 'apple-alt',
        Navigate: 'HomeScreen',
    },
    {
        id: '4',
        MenuName: 'Cart',
        MenuIcon: 'shopping-cart',
        Navigate: 'CartScreen',
    },
    {
        id: '5',
        MenuName: 'Orders',
        MenuIcon: 'clipboard-list',
        Navigate: 'SearchScreen',
    },
    {
        id: '6',
        MenuName: 'Profile',
        MenuIcon: 'user-alt',
        Navigate: 'ProfileScreen',
    },
    {
        id: '7',
        MenuName: 'Settings',
        MenuIcon: 'cog',
        Navigate: 'SearchScreen',
    },
];

const MenuScreen = () => {
    const navigation = useNavigation();

    const handleMenuPress = (navigate) => {
        navigation.navigate(navigate);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={menuData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleMenuPress(item.Navigate)}
                        accessible={true}
                        accessibilityLabel={`Menu: ${item.MenuName}`}
                        accessibilityRole="button"
                    >
                        <MenuCard
                            MenuIcon={item.MenuIcon}
                            MenuName={item.MenuName}
                            accessibilityRole="image"
                            accessibilityLabel={`Icon for ${item.MenuName}`}
                        />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContainer}
                accessibilityRole="list"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#343a40',
    },
    flatListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#343a40',
    },
});

export default MenuScreen;
