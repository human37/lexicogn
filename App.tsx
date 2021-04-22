import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Router from '_nav/Router';
import store from '_store/store';
import initialize from './src/initialize';
import { useCurrentTheme } from './src/store/hooks';

export default function App() {
    async function initializeApp() {
        try {
            await preventAutoHideAsync();
            await initialize();
        } catch (error) {
            throw new Error(error.message);
        }
        await hideAsync();
    }

    useEffect(() => {
        initializeApp();
    });

    return (
        <Provider store={store}>
            <InnerApp />
        </Provider>
    );
}

function InnerApp() {
    const theme = useCurrentTheme();

    return (
        <SafeAreaProvider>
            <Router />
            <ExpoStatusBar style={theme.dark ? 'light' : 'dark'} backgroundColor={theme.primary.default} />
        </SafeAreaProvider >
    );
}