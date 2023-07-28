import { View } from 'react-native';

import { Context } from '@caparis/core';

import { AppWriteDependencies } from '@caparis/appwrite';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Router, RouterContextProvider } from './src/components/router';
import { DataLayerContextProvider } from './src/hooks/data-layer-context';
import { useCustomFonts } from './src/components/use-fonts';

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

  Context.setup(AppWriteDependencies('products', 'products'));

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