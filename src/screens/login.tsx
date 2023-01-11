import { useEffect } from "react";
import { View, Text } from "react-native";
import Button from "../components/button";
import useFirebaseAuth from "../data-provider/firebase-auth";

import Inventory from "./inventory";

export default function LoginScreen() {
    
    const auth = useFirebaseAuth();

    if (auth.user?.email === undefined)
        return (
            <View>
                <Text>Not logged in.</Text>
                <Button onPress={() => auth.signIn()} title={'Sign in'}></Button>
            </View>
        );

    return (
        <View>
            <Text>{auth.user?.email ?? 'Nicht angemeldet'}</Text>
            <Inventory></Inventory>
        </View>);

}