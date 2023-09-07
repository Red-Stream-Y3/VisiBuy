import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const MenuCard = ({ MenuIcon, MenuName }) => {
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth - 40;
    return (
        <View style={[styles.card, { width: cardWidth }]}>
<<<<<<< HEAD
            <FontAwesome5
                name={MenuIcon}
                size={80}
                color="black"
                accessible={true}
                accessibilityLabel={`Icon for ${MenuName}`}
            />
            <Text style={styles.menuName} accessible={true} accessibilityLabel={`Menu Name: ${MenuName}`}>
                {MenuName}
            </Text>
=======
        <FontAwesome5
            name={MenuIcon}
            size={80}
            color="#343a40"
            accessible={true}
            accessibilityLabel={`Icon for ${MenuName}`}
        />
        <Text
            style={styles.menuName}
            accessible={true}
            accessibilityLabel={`Menu Name: ${MenuName}`}
        >
            {MenuName}
        </Text>
>>>>>>> 818f5c5 (Change to menu)
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default MenuCard;
