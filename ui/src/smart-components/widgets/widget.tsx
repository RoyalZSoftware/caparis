import { View } from "react-native";
import { theme, Text } from "@caparis/ui-components/src";

export function Widget({title, children}: {title, children}) {

    return (
        <View style={{ backgroundColor: 'white', borderRadius: theme.borderRadius.l, padding: theme.spacing.m }}>
            <Text color='secondary' type='default' style={{marginBottom: theme.spacing.m}}>{title}</Text>
            {children}
        </View>

    );
}
