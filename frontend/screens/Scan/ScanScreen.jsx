import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProductScanner } from "../../components";

const ScanScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <ProductScanner />
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