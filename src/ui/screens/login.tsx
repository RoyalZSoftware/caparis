import { Formik } from "formik";
import { View, Text } from "react-native";
import BaseLayout from "../components/base-layout";
import Button from "../components/button";
import Input from "../components/input";
import { useDependencies } from "../../infrastructure/deps";
import { EmailPasswordLoginProvider } from '../../infrastructure/user-repository';

function isEmailLoginEnabled(userRepository): userRepository is EmailPasswordLoginProvider {
    return (userRepository as EmailPasswordLoginProvider).signInWithEmailAndPassword != undefined;
}

export default function LoginScreen() {
    const { userRepository } = useDependencies();

    if (!isEmailLoginEnabled(userRepository))
        return <Text>No Login flow enabled.</Text>

    const submitPressed = (values) => {
        userRepository.signInWithEmailAndPassword('panov@royalzsoftware.de', 'test12345678');
    }
    if (userRepository.currentUser?.email === undefined)
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
            <Button onPress={() => userRepository.signOut()} title={'Sign out'}></Button>
            <Text>{userRepository.currentUser?.email ?? 'Nicht angemeldet'}</Text>
        </View>);

}