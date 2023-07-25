import { View } from 'react-native';

import { useCustomFonts } from './src/ui/components/use-fonts';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { DataLayerContextProvider } from './src/infrastructure/deps';
import { Router, RouterContextProvider } from './src/ui/components/router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded)
    return null;

  return (
    <View onLayout={onLayoutRootView}>
      <DataLayerContextProvider>
        <RouterContextProvider>
          <Router />
        </RouterContextProvider>
      </DataLayerContextProvider>
    </View>
  );
}