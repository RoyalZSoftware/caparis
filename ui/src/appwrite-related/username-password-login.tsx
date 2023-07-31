import { Formik } from "formik";
import { View } from "react-native";
import { useRouter } from "../smart-components/router";
import { theme, Input, Button } from "@caparis/ui-components/src";

export function AppWriteUsernamePasswordLogin({authProvider}) {
    const { setCurrentUrl } = useRouter();

    const submitPressed = (values) => {
        authProvider.signIn({ email: "panov@royalzsoftware.de", password: "test12345678" }).subscribe(() => {
            setCurrentUrl('/home');
        });
    }
    return (<Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => submitPressed(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
                <View style={{marginBottom: theme.spacing.s}}>
                    <Input placeholder='Email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email}></Input>
                </View>
                <View>
                    <Input placeholder='Password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}></Input>
                </View>
                <Button onPress={handleSubmit} title={'Sign in'}></Button>
            </View>
        )}
    </Formik>);
}