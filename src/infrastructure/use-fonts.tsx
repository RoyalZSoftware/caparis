import { useFonts } from 'expo-font'

export function useCustomFonts() {
    return useFonts({
        /*
        "Neuwelt-Black": require('../assets/fonts/Neuwelt-Black.ttf'),
        "Neuwelt-Italic": require('../assets/fonts/Neuwelt-Italic.ttf'),
        "Neuwelt-BlackItalic": require('../assets/fonts/Neuwelt-BlackItalic.ttf'),
        "Neuwelt-LightItalic": require('../assets/fonts/Neuwelt-LightItalic.ttf'),
        "Neuwelt-BoldItalic": require('../assets/fonts/Neuwelt-BoldItalic.ttf'),
        "Neuwelt-ExtraBold": require('../assets/fonts/Neuwelt-ExtraBold.ttf'),
        "Neuwelt-MediumItalic": require('../assets/fonts/Neuwelt-MediumItalic.ttf'),
        "Neuwelt-ExtraBoldItalic": require('../assets/fonts/Neuwelt-ExtraBoldItalic.ttf'),
        "Neuwelt-Thin": require('../assets/fonts/Neuwelt-Thin.ttf'),
        "Neuwelt-ExtraLight": require('../assets/fonts/Neuwelt-ExtraLight.ttf'),
        "Neuwelt-ThinItalic": require('../assets/fonts/Neuwelt-ThinItalic.ttf'),
        "Neuwelt-ExtraLightItalic": require('../assets/fonts/Neuwelt-ExtraLightItalic.ttf'),
        "NeuweltInline-Regular": require('../assets/fonts/NeuweltInline-Regular.ttf'),
        "Neuwelt-ExtraLightItalic1": require('../assets/fonts/Neuwelt-ExtraLightItalic1.ttf'),
    */
        "Neuwelt-Light": require('../assets/fonts/Neuwelt-Light.ttf'),
        "Neuwelt-Bold": require('../assets/fonts/Neuwelt-Bold.ttf'),
        "Neuwelt-Medium": require('../assets/fonts/Neuwelt-Medium.ttf'),
    });
}