import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { theme } from "./theme";
import WelcomeLogo from '../assets/welcome-logo.png';
import { IconButton } from "./icon-button";
import { useRouter } from "./router";

export function AddProductsButton() {
    const {navigateTo} = useRouter();

    return <View style={{ position: "absolute", bottom: 48, marginLeft: 'auto', justifyContent: 'center', alignSelf: 'center' }}>
        <Pressable style={{
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.m,
            paddingLeft: theme.spacing.xl,
            paddingRight: theme.spacing.xl,
            display: 'flex',
            borderRadius: 50,
            alignContent: 'center'
        }} onPress={() => {
            navigateTo('/inventory');
        }}><Text style={{ ...theme.fonts.primary, color: theme.colors.background }}>Add Products</Text></Pressable>
    </View>
}

export function Header() {
    return <View style={{
        backgroundColor: theme.colors.secondary, width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
        justifyContent: "center", padding: 20, paddingVertical: 60, paddingBottom: 100
    }}>
        <View style={{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>
            <Image source={WelcomeLogo} style={{ height: 43, width: 134, display: 'flex' }} />
            <Pressable onPress={() => {
            }}><IconButton></IconButton></Pressable>
        </View>
    </View>
}

export function BaseLayout({ children }) {
    return (
        <View style={{ backgroundColor: theme.colors.background, height: '100%', maxHeight: '100%' }}>
            <View style={{ display: 'flex' }}>
                <Header></Header>
            </View>
            <View style={{ display: 'flex', margin: 20, flexGrow: 2 }}>
                {children}
            </View>
            <AddProductsButton></AddProductsButton>
        </View>
    )
}
