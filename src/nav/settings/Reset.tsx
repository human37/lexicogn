import { wipeDB } from '@/src/db/db';
import { useCurrentTheme } from '@/src/hooks/theme_provider';
import buttonStyles from '@/src/styles/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WARNING = "A reset will perform the following actions:";

const ACTIONS = `
- Clear local storage (saved themes)
- Wipe the database
- Reload the app
`;

export default function Reset() {
    const theme = useCurrentTheme();

    // Clear asyncstorage and wipe db
    async function reset() {
        await AsyncStorage.clear();
        await wipeDB();
        // Reload app
        Updates.reloadAsync();
    }

    const textColor = { color: theme.primary.lightText };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.warning, textColor]}>{WARNING}</Text>
            <Text style={[styles.text, textColor]}>{ACTIONS}</Text>
            <Text style={[styles.text, textColor]}>These actions are <Text style={styles.danger}>irreversible</Text></Text>
            <Text style={[styles.text, styles.warning, textColor]}>Proceed with caution</Text>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
                style={[buttonStyles.container, styles.button]}
                onPress={reset}
            >
                <Text style={[buttonStyles.text, { color: "black" }]}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    warning: {
        marginTop: 40,
        marginBottom: 10
    },
    danger: {
        color: "red",
    },
    button: {
        marginTop: 40,
        width: "80%",
        backgroundColor: "#fa5a5a",
    }
});
