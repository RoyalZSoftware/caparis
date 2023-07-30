import { StyleProp, TextInput, TextStyle } from "react-native";
import { theme } from "./theme";

const InputStyles: StyleProp<TextStyle> = {
    padding: theme.spacing.s,

    ...theme.fonts.default,
    fontSize: 16,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.m,
};

export function Input(props: {onChangeText?: any, value?: string, onBlur?: any, placeholder?: string}) {
    return <TextInput style={InputStyles} {...props}></TextInput>;
}