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
        flex: 1.5,
        marginLeft: 15,
    },
    image: {
        width: 135,
        height: 150,
        marginRight: 10,
        borderRadius: 5,
    },
    name: {
        fontSize: 19.5,
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
        fontSize: 20,
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
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#5d96f0',
        marginHorizontal: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
