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
        marginRight: 10,
        borderRadius: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 19,
        color: 'green',
    },
    quantity: {
        fontSize: 18,
        color: 'green',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    button: {
        padding: 15,
        border: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
