// sharedStyles.js
import { StyleSheet } from 'react-native';

export const productItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 10,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
    },
    detailsContainer: {
        flex: 2,
        marginLeft: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
});
