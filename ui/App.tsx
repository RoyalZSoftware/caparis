import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Router, RouterContextProvider } from './src/shared/router';
import { useCustomFonts } from './src/shared/use-fonts';
import { initializeAuth, LoginRoute } from './src/modules/auth';
import { initializeAnalyse } from './src/modules/analyse';
import { initializeCapture } from './src/modules/capture';
import { CaparisAppProvider } from './src/shared/caparis-app-context';
import { HomeRoute } from './src/modules/analyse/routes';

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

  initializeAuth({ successfulLoginCallbackRoute: HomeRoute });
  initializeAnalyse();
  initializeCapture();

  return (
    <View onLayout={onLayoutRootView}>
      <CaparisAppProvider>
        <RouterContextProvider defaultRoute={HomeRoute} unauthenticatedRoute={LoginRoute}>
          <Router />
        </RouterContextProvider>
      </CaparisAppProvider>
    </View>
  );
}