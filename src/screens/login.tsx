import { Formik } from "formik";
import { View, Text } from "react-native";
import BaseLayout from "../components/base-layout";
import Button from "../components/button";
import Input from "../components/input";
import useFirebaseAuth from "../fireorm/firebase-auth";

export default function LoginScreen() {

    const auth = useFirebaseAuth();

    const submitPressed = (values) => {
        auth.signIn('panov@royalzsoftware.de', 'test123');
    }
    if (auth.user?.email === undefined)
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

    return (
        <View>
            <Button onPress={() => auth.signOut()} title={'Sign out'}></Button>
            <Text>{auth.user?.email ?? 'Nicht angemeldet'}</Text>
        </View>);

}