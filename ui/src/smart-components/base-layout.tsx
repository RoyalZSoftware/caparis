import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";
import { Header, HeaderProps, HeaderWithChild } from "./header";
import { theme } from "@caparis/ui-components";

export class BaseLayoutBuilder extends Component<{ children?: React.ReactFragment, header?: Header<HeaderProps> }> {

    render() {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: '100%', maxHeight: '100%' }}>
                <View style={{display: 'flex'}}>
                {this.props.header.render()}
</View>
                <View style={{display: 'flex', margin: 20, flexGrow: 2}}>
                    {this.props.children}
                </View>

                <View style={{ position: "absolute", bottom: 48, marginLeft: 'auto', justifyContent: 'center', alignSelf: 'center'}}>
                    <Pressable style={{
                        backgroundColor: theme.colors.primary,
                        padding: theme.spacing.m,
                        paddingLeft: theme.spacing.xl,
                        paddingRight: theme.spacing.xl,
                        display: 'flex',
                        borderRadius: 50,
                        alignContent: 'center'
                    }} onPress={() => {
                        alert('OK')
                    }}><Text style={{...theme.fonts.primary, color: theme.colors.background}}>Add Products</Text></Pressable>
                </View>
            </View>)
    }

}

export default function BaseLayout(props: { headerChild?: any, children?: any }) {
    let header = new Header({});

    if (props.headerChild)
        header = new HeaderWithChild({headerChild: props.headerChild})

    const baseLayoutBuilder = new BaseLayoutBuilder({header, children: props.children});

    return baseLayoutBuilder.render();
}
