import { AuthProvider } from "@caparis/core";
import { useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Button from "../../shared/button";
import { theme } from "../../shared/theme";
import Fridge from './fridge.png';
import { AppWriteUsernamePasswordLogin } from "@caparis/appwrite";
import { AppWriteUsernamePasswordLoginScreen } from "./appwrite-related/username-password-login-screen";
import { of, tap } from "rxjs";
import { useRouter } from "../../shared/router";
import { useCaparisApp } from "../../shared/caparis-app-context";

class DummyAuthProvider implements AuthProvider<void> {
    name: string;
    signIn() {
        return of({email: 'Test', displayName: 'Alexander', uid: '000'});
    }
}

export default function LoginScreen({successfulLoginCallbackRoute}) {
    const {userRepository} = useCaparisApp().Dependencies;
    const [authProvider, setAuthProvider] = useState<AuthProvider<any>>(null);

    const {navigateTo} = useRouter();

    if (authProvider == null) {
        return <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 1 }}>
                <Image style={{ height: '70%', aspectRatio: 1 / 1 }} source={Fridge}></Image>
                <View style={{ margin: theme.spacing.m }}>

                    <Text style={{ ...theme.fonts.pageTitle }}>Welcome to Caparis</Text>
                    <Text >
                        Please sign in to continue
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexBasis: '10%', minHeight: 100, margin: theme.spacing.xl }}>
                <View style={{ marginBottom: theme.spacing.s }}>
                    <Button onPress={() => setAuthProvider(new AppWriteUsernamePasswordLogin())} title={'Username and password'}></Button>
                </View>
                <View style={{ marginBottom: theme.spacing.s }}>
                    <Button onPress={() => {
                        new DummyAuthProvider().signIn().pipe(
                            tap((user) => {
                            userRepository.currentUser$.next(user);
                            navigateTo(successfulLoginCallbackRoute);
                        })).subscribe();
                    }} title={'Dummy'}></Button>
                </View>
            </View>
        </SafeAreaView>;
    }

    return (
        <SafeAreaView>
            <AppWriteUsernamePasswordLoginScreen authProvider={authProvider} successfulLoginCallbackRoute={successfulLoginCallbackRoute}></AppWriteUsernamePasswordLoginScreen>
        </SafeAreaView>
    );
}