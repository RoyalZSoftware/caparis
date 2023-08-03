import { Formik } from "formik";
import { View } from "react-native";
import Button from "../../../shared/button";
import Input from "../../../shared/input";
import { useRouter } from "../../../shared/router";
import { theme } from "../../../shared/theme";
import { moduleConfig } from "..";

export function AppWriteUsernamePasswordLogin({authProvider}) {
    const { navigateTo } = useRouter();

    const submitPressed = (values) => {
        authProvider.signIn({ email: "panov@royalzsoftware.de", password: "test12345678" }).subscribe(() => {
            navigateTo(moduleConfig.successfulLoginCallbackRoute);
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