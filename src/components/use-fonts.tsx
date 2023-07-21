import { useFonts } from 'expo-font'

export function useCustomFonts() {
    return useFonts({
        "Neuwelt-Light": require('../assets/fonts/Neuwelt-Light.ttf'),
        "Neuwelt-Bold": require('../assets/fonts/Neuwelt-Bold.ttf'),
        "Neuwelt-Medium": require('../assets/fonts/Neuwelt-Medium.ttf'),
    });
}