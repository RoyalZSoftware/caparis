import { Formik } from "formik";
import { useEffect } from "react";
import { View, Text } from "react-native";
import Button from "../components/button";
import Input from "../components/input";
import useFirebaseAuth from "../data-provider/firebase-auth";

import Inventory from "./inventory";

export default function LoginScreen() {

    const auth = useFirebaseAuth();

    const submitPressed = (values) => {
        console.log(values);
        auth.signIn(values.email, values.password);
    }
    if (auth.user?.email === undefined)
        return (
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => submitPressed(values)}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (

                    <View>

                        <Input placeholder='email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email}></Input>
                        <Input placeholder='password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}></Input>
                        <Button onPress={handleSubmit} title={'Sign in'}></Button>
                    </View>
                )}
            </Formik>
        );

    return (
        <View>
            <Button onPress={() => auth.signOut()} title={'Sign out'}></Button>
            <Text>{auth.user?.email ?? 'Nicht angemeldet'}</Text>
            <Inventory></Inventory>
        </View>);

}