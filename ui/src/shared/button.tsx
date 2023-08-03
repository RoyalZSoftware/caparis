import { Pressable, Text } from 'react-native'
import { theme } from './theme';

export default function Button(props: { title: string, onPress: () => void }) {
    return (
        <Pressable style={{
            backgroundColor: theme.colors.primary,
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 50,
            padding: theme.spacing.m,
            alignItems: 'center'
        }} onPress={props.onPress}>
            <Text style={{ ...theme.fonts.default, color: theme.colors.white }}>{props.title}</Text>
        </Pressable>
    );
}