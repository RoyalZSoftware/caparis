import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/login';

import * as fireorm from 'fireorm';
import firestore from '@react-native-firebase/firestore';
import { UserContextProvider } from './src/infrastructure/user-context';
import BaseLayout, { ExpireNextWidget } from './src/components/base-layout';

export default function App() {
  fireorm.initialize(firestore());

  return (
    <UserContextProvider>
      <BaseLayout headerChildren={<ExpireNextWidget></ExpireNextWidget>}>
      <LoginScreen></LoginScreen>
      </BaseLayout>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
