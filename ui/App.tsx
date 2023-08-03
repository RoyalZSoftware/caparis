import { View } from 'react-native';
import { Context } from '@caparis/core';
import { AppWriteDependencies } from '@caparis/appwrite';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Router, RouterContextProvider, setUnauthenticatedPage } from './src/shared/router';
import { DataLayerContextProvider } from './src/hooks/data-layer-context';
import { useCustomFonts } from './src/hooks/use-fonts';
import { initializeAuth, LoginRoute } from './src/modules/auth';
import { initializeAnalyse } from './src/modules/analyse';
import { initializeCapture } from './src/modules/capture';
import { HomeRoute } from './src/modules/analyse/home';

SplashScreen.preventAutoHideAsync();

export default function App() {
  Context.setup(AppWriteDependencies('products', 'products'));

  const [fontsLoaded] = useCustomFonts();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded)
    return null;


  initializeAuth({successfulLoginCallbackRoute: HomeRoute});
  initializeAnalyse();
  initializeCapture();

  setUnauthenticatedPage(LoginRoute);

  return (
    <View onLayout={onLayoutRootView}>
      <DataLayerContextProvider>
        <RouterContextProvider defaultRoute={HomeRoute}>
          <Router />
        </RouterContextProvider>
      </DataLayerContextProvider>
    </View>
  );
}