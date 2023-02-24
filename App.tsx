import { FlatList, View } from 'react-native';

import * as fireorm from 'fireorm';
import firestore from '@react-native-firebase/firestore';
import { UserContextProvider } from './src/infrastructure/user-context';
import BaseLayout from './src/components/base-layout';
import { Product } from './src/data-provider/models/product';
import { ExpireNextProductListItem, RecipeListItem } from './src/components/product-list-item';
import { ExpireNextWidget } from './src/components/widgets/expire-next';
import { useCustomFonts } from './src/infrastructure/use-fonts';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Text } from './src/components/text';
import { theme } from './src/infrastructure/theme';

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
  const data: Product[] = [
    { name: 'Test1', barcodeIdentifier: '0', createdById: '0', expiryDate: new Date(), id: '1' },
    { name: 'Test2', barcodeIdentifier: '0', createdById: '0', expiryDate: new Date(), id: '2' },
    { name: 'Test3', barcodeIdentifier: '0', createdById: '0', expiryDate: new Date(), id: '3' },
    { name: 'Test4', barcodeIdentifier: '0', createdById: '0', expiryDate: new Date(), id: '4' },
    { name: 'Test5', barcodeIdentifier: '0', createdById: '0', expiryDate: new Date(), id: '5' },
  ];


  return (
    <View onLayout={onLayoutRootView}>
      <UserContextProvider>
        <BaseLayout headerChild={<ExpireNextWidget expireNext={data}></ExpireNextWidget>}>
          <Text type='default' style={{marginBottom: theme.spacing.m}}>Recipes with expiring food</Text>
          <FlatList data={data} renderItem={(({ item }) => <RecipeListItem item={item}></RecipeListItem>)}></FlatList>
        </BaseLayout>
      </UserContextProvider>
    </View>
  );
}