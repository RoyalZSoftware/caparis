import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { ColorConfigurations, FontConfigurations, theme } from './theme';

export function Text({ children, type, color, style }: { children, type: keyof FontConfigurations, color?: keyof ColorConfigurations, style?: TextStyle }) {

    const styles = { ...theme.fonts[type], color: theme.colors[color ?? 'secondary'], ...style };

    return (
        <RNText style={styles}>
            {children}
        </RNText>
    );
}