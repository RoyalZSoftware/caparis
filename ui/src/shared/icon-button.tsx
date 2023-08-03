import { Image, View } from 'react-native';
import Document from '../assets/icons/Document.png';
import { theme } from './theme';

export function IconButton() {
    return (
        <View style={{ backgroundColor: theme.colors.primary + '32', padding: theme.spacing.s, borderRadius: theme.borderRadius.m }}>
            <Image style={{ width: 24, height: 24 }} source={Document}></Image>
        </View>
    );
}