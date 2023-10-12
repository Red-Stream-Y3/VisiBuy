import React, { forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { productItemStyles } from '../styles/SharedStyles';
import { Vibration } from 'react-native';
// import { updateCart } from '../services/OrderServices';

const ProductItem = forwardRef(({ product }, ref) => {
    const { user } = useUser();
    const { addToCart, cart, cartID } = useCart();

    const uId = user ? user._id : '641aaee2b8ed930c6e7186c1';

    const cartItems = {
        orderItems: [
            ...cart.map((item) => ({
                name: item.product.name,
                quantity: item.quantity,
                image: item.product.images[0].url,
                price: item.product.price,
                product: item.product._id,
            })),
        ],
        uId,
    };

    const handleAddToCart = () => {
        addToCart(product);
        // updateCart(cartID, cartItems);
        // vibrate
        Vibration.vibrate(250);
    };

    const getProductQuantity = () => {
        const cartItem = cart.find((item) => item.product._id === product._id);
        return cartItem ? cartItem.quantity : 0;
    };

    const CustomButton = ({ title, onPress, style, buttonTextStyle }) => {
        return (
            <TouchableOpacity onPress={onPress} style={style}>
                <Text style={buttonTextStyle}>{title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View ref={ref} style={productItemStyles.container}>
            <View style={productItemStyles.imageContainer}>
                <Image
                    source={{ uri: product.images[0].url }}
                    style={productItemStyles.image}
                    accessible={true}
                    accessibilityLabel={product.name}
                />
            </View>
            <View style={productItemStyles.detailsContainer}>
                <Text style={productItemStyles.name}>{product.name}</Text>
                <Text style={productItemStyles.price}>Rs {product.price}</Text>
                {/* <Text style={productItemStyles.quantity}>Quantity: {getProductQuantity()}</Text> */}
                <CustomButton
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={productItemStyles.button}
                    buttonTextStyle={productItemStyles.buttonText}
                />
            </View>
        </View>
    );
});

export default ProductItem;
