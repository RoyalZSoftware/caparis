import {Button as NativeButton} from 'react-native'

export default function Button(props) {
    return (
        <NativeButton title={props.title} onPress={props.onPress}></NativeButton>
    );
}