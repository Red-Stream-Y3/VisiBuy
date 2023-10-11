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
        flex: 1.5,
    },
    detailsContainer: {
        flex: 1.5,
        marginLeft: 0,
    },
    image: {
        width: 150,
        height: 200,
        marginRight: 10,
        borderRadius: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
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
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'blue',
    },
});
