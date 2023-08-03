import { AuthProvider, Context } from "@caparis/core";
import { useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { AppWriteUsernamePasswordLogin } from "./appwrite-related/username-password-login";
import Button from "../../shared/button";
import { theme } from "../../shared/theme";
import Fridge from './fridge.png';

const findAuthScreen = (authProvider: AuthProvider<any>) => {
    const signInFlows = {
        AppWriteUsernamePasswordLogin: () => AppWriteUsernamePasswordLogin({ authProvider }),
    };
    return signInFlows[authProvider.constructor.name];
}

export default function LoginScreen() {
    const { userRepository } = Context.Dependencies;

    const [authProvider, setAuthProvider] = useState<AuthProvider<any>>(null);

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

                {userRepository.authProvider().map(c => {
                    return <View style={{ marginBottom: theme.spacing.s }}>
                        <Button onPress={() => setAuthProvider(c)} title={c.name}></Button>
                    </View>
                })}
            </View>

        </SafeAreaView>;
    }

    const AuthScreen = findAuthScreen(authProvider);

    return (
        <SafeAreaView>
            <AuthScreen></AuthScreen>
        </SafeAreaView>
    );
}