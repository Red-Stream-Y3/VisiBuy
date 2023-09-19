import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const VoiceModeScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.text}>Voice Mode</Text>
            </View>
        </ScrollView>
    );
  };
  
export default VoiceModeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#343a40',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});