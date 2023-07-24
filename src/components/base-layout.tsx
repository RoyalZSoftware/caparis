import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";
import { Header, HeaderProps, HeaderWithChild } from "./header";
import { theme } from "./theme";

export class BaseLayoutBuilder extends Component<{ children?: React.ReactFragment, header?: Header<HeaderProps> }> {

    render() {
        return (
            <View style={{ backgroundColor: '#F2F2F2', height: '100%' }}>
                {this.props.header.render()}
                <View style={{ margin: 20 }}>
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
