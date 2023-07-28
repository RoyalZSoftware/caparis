import { Context } from "@caparis/core";
import { Formik } from "formik";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import BaseLayout from "../components/base-layout";
import Button from "../components/button";
import Input from "../components/input";
import { useRouter } from "../components/router";

export default function LoginScreen() {

    const {userRepository} = Context.Dependencies;

    const [step, setStep] = useState(0);
    
    if (step == 0) {
        return <BaseLayout>
        {userRepository.authProvider().map(c => {
        return (<Pressable onPress={() => {
            setStep(1);
        }}>
        <Text>Sign In With {c.name}</Text>
        </Pressable>)

        })}
        </BaseLayout>;
    }

    return (
        <BaseLayout>
            <AppWriteUsernamePasswordLogin></AppWriteUsernamePasswordLogin>
        </BaseLayout>
    );
}

export function AppWriteUsernamePasswordLogin() {
    const { userRepository } = Context.Dependencies;
    const { setCurrentUrl } = useRouter();

    const submitPressed = (values) => {
        userRepository.authProvider()[0].signIn({ email: "panov@royalzsoftware.de", password: "test12345678" }).subscribe(() => {
            setCurrentUrl('/home');
        });
    }
    return (<Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => submitPressed(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
                <Input placeholder='email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email}></Input>
                <Input placeholder='password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}></Input>
                <Button onPress={handleSubmit} title={'Sign in'}></Button>
            </View>
        )}
    </Formik>);
}