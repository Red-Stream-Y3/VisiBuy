import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Pressable, View } from "react-native";
import ProductScanner from "./ProductScanner";
import { FontAwesome5 } from '@expo/vector-icons';

const Vision = forwardRef((props, ref) => {

    const [result, setResult] = useState("");
    const [resultCallback, setResultCallback] = useState(null);
    const [show, setShow] = useState(false);

    const showCamera = () => {
        setShow(true);
    }

    const cameraCallback = async (result) => {
        setResult(result);
        setShow(false);
    };

    useImperativeHandle(ref, () => ({
        getResult : (callback) => {
            showCamera();
            setResultCallback({callback : callback});
        }
    }));
    
    useEffect(() => {
        resultCallback?.callback(result);
    }, [result]);

    return (
        show && <View style={{
            width: "100%",
            position: "absolute",
            height: "100%",
        }}>
            <View
             style={{
                borderRadius: 50,
                overflow: "hidden",
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 100,
                margin: 10,
             }}>
                <Pressable 
            android_ripple={{ color: '#999' }}
            style={{
                
                backgroundColor: "#fff",
                borderRadius: 50,
                padding: 10,
                width: 50,
                height: 50,
                alignItems: "center",
            }} onPress={() => setShow(false)}>
                <FontAwesome5 name="times" size={30} color="#000" />
            </Pressable>
            </View>
            
            <ProductScanner resultCallback={cameraCallback} />
        </View>
    );
});

export default Vision;