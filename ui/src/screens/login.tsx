import { Context, loginWithEmailAndPassword } from "@caparis/core";
import { canSignInWithEmailAndPassword } from "@caparis/core";
import { Formik } from "formik";
import { View, Text } from "react-native";
import BaseLayout from "../components/base-layout";
import Button from "../components/button";
import Input from "../components/input";
import { useRouter } from "../components/router";

export default function LoginScreen() {
    const { userRepository } = Context.Dependencies;
    const { setCurrentUrl } = useRouter();

    if (!canSignInWithEmailAndPassword(userRepository)) {
        return <Text>No Login flow enabled.</Text>
    }

    const submitPressed = (values) => {
        loginWithEmailAndPassword("panov@royalzsoftware.de", "test12345678").subscribe(() => {
            setCurrentUrl('/home');
        });
    }
    return (
        <BaseLayout>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => submitPressed(values)}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Input placeholder='email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email}></Input>
                        <Input placeholder='password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}></Input>
                        <Button onPress={handleSubmit} title={'Sign in'}></Button>
                    </View>
                )}
            </Formik>
        </BaseLayout>
    );
}