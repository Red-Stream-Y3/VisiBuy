import React, { useRef } from "react";
import { Button, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ProductScanner, Vision } from "../../components";

const ScanScreen = () => {
    // const vision = useRef();
    
    return (
        <View style={styles.mainContainer}>
            <ProductScanner />

            {/* <Button
                title="Scan"
                onPress={() => vision.current.getResult((res) => ToastAndroid.show(res, ToastAndroid.SHORT))}
            />
            <Vision ref={vision} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ScanScreen;