import React, { useState } from "react";
import { View } from "react-native";
import ProductScanner from "./ProductScanner";

const Vision = () => {

    const [result, setResult] = useState("");

    return (
        <View >
            <ProductScanner resultCallback={setResult} />
        </View>
    );
};

export default Vision;