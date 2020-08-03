import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native'


export const RotationHint = ({ showWhenScreenWidthLessThan = 500, text = 'Rotate device for more columns ⤵' }) => {
    const { width, height } = Dimensions.get("screen");
    const isAlreadyInLandscape = width > height;

    // Only show when the width is less than the provided threshold, and the user
    // is not already viewing the app in landscape mode.
    const showMessage =
        width < showWhenScreenWidthLessThan && isAlreadyInLandscape === false;

    if (showMessage) {
        return (
            <View>
                <Text style={StyleSheet.message}>{text}</Text>
            </View>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
        margin: 10
    }
});