import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";


// A hook to return the current screen dimensions
export function useScreenDimensions() {
    // Get initial dimensions and initialize state
    const initialDimensions = Dimensions.get("screen");
    const [width, setWidth] = useState(initialDimensions.width);
    const [height, setHeight] = useState(initialDimensions.height);

    useEffect(() => {
        const handleChange = ({ screen }) => {
            setWidth(screen.width);
            setHeight(screen.height);
        };

        // Listen for dimension changes, which typically indicates a rotation
        Dimensions.addEventListener("change", handleChange);

        // Cleanup
        return () => {
            Dimensions.removeEventListener("change", handleChange);
        };
    });

    return { width, height };
}
