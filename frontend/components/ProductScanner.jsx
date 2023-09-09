import axios from "axios";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { visionDirectScan } from "../utils/scanUtils";

const ProductScanner = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions('wide-camera');
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);
    let cameraRef = useRef();

    //toggle between front and back camera
    const toggleCameraType = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

    //check permissions
    if (!permission) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const scanProduct = async () => {
        //console.debug("Scanning product...");

        if(!ready) return;

        setReady(false);

        try{
            await cameraRef.current.takePictureAsync({
                quality: 0.25,
                base64: true,
                onPictureSaved: async (data) => {
                    cameraRef.current.pausePreview();
                    setLoading(true);

                    //console.debug(data.base64?.length || "nothin");

                    await visionDirectScan(null, false, data)
                    .then((res) => {
                        console.debug(res);
                        
                        setResult(res);
                        setShowModal(true);

                        /**
                         * 
                         * 
                         * 
                         * TODO: Do stuff here with the result
                         * 
                         * 
                         * /api/v1/products
                         */

                        setLoading(false);
                        setReady(true);

                        //ToastAndroid.show(res.result, ToastAndroid.SHORT);
                    })
                    .catch((err) => {
                        //console.debug(err);
                        ToastAndroid.show(err.message, ToastAndroid.SHORT);
                        cameraRef.current.resumePreview();
                        setLoading(false);
                    });
                },
            });

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setReady(true);
            setLoading(false);
        }
    };

    if (!permission.granted) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>No access to camera</Text>
                <Pressable
                        android_ripple={{ color: '#2480ed' }}
                        style={styles.button} onPress={() => requestPermission()}>
                        <Text style={styles.header1}>Grant Access</Text>
                    </Pressable>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(false);
                    }}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            setShowModal(false);
                            cameraRef.current.resumePreview();
                        }}
                    >
                        <View
                            style={{
                                height: 'auto',
                                width: 'auto',
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#ccc',
                                borderWidth: 1,
                                padding: 20,
                                borderRadius: 5,
                            }}
                        >
                            <Text style={styles.header1}>Result</Text>
                            <Text>{result?.result}</Text>
                        </View>
                    </Pressable>
                </Modal>
                <Camera
                    onCameraReady={() => setReady(true)}
                    ratio="16:9"
                    style={styles.camera}
                    ref={cameraRef}
                    autoFocus={Camera.Constants.AutoFocus.on}
                    type={type}
                >
                    <Pressable
                        android_ripple={{ color: '#2480ed' }}
                        style={styles.button}
                        onPress={() => scanProduct()}
                    >
                        {!ready ? <ActivityIndicator size="large" /> : <Text style={styles.header1}>Scan</Text>}
                    </Pressable>
                </Camera>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header1: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#24a0ed',
        alignItems: 'center',
        borderRadius: 5,
        padding: 20,
        height: 'auto',
        width: '50%',
        marginBottom: 10,
    },
    camera: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});

export default ProductScanner;