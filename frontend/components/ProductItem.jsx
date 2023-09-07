import React, { forwardRef } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useCart } from '../context/CartContext';
import { productItemStyles } from '../styles/SharedStyles';

const ProductItem = forwardRef(({ product }, ref) => {
    const { addToCart } = useCart();
    const { cart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    const getProductQuantity = () => {
        const cartItem = cart.find((item) => item.product._id === product._id);
        return cartItem ? cartItem.quantity : 0;
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
                <Text style={productItemStyles.price}>${product.price}</Text>
                {/* <Text style={productItemStyles.quantity}>Quantity: {getProductQuantity()}</Text> */}
                <Button title="Add to Cart" onPress={handleAddToCart} />
            </View>
        </View>
    );
});

export default ProductItem;
