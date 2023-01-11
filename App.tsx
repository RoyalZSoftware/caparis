import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/login';

import * as fireorm from 'fireorm';
import firestore from '@react-native-firebase/firestore';

export default function App() {
  fireorm.initialize(firestore());
  return (
    <View style={styles.container}>
      <LoginScreen></LoginScreen>
    </View>
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
