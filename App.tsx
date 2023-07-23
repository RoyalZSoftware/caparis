import { View } from 'react-native';

import * as fireorm from 'fireorm';
import firestore from '@react-native-firebase/firestore';
import { useCustomFonts } from './src/components/use-fonts';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { DataLayerContextProvider } from './src/infrastructure/deps';
import { Router, RouterContextProvider } from './src/components/router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  fireorm.initialize(firestore());
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