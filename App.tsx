import { View } from 'react-native';

import * as fireorm from 'fireorm';
import firestore from '@react-native-firebase/firestore';
import { UserContextProvider } from './src/infrastructure/user-context';
import { useCustomFonts } from './src/components/use-fonts';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import AuthGuard from './src/screens/auth-guard';
import ScannerScreen from './src/screens/scanner';

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
      <UserContextProvider>
        <AuthGuard>
          <ScannerScreen></ScannerScreen>
        </AuthGuard>
      </UserContextProvider>
    </View>
  );
}