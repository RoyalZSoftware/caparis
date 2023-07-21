import { TextInput } from "react-native";

export default function Input(props: {onChangeText?: any, value?: string, onBlur?: any, placeholder?: string}) {
    return <TextInput {...props}></TextInput>;
}