import React, { Component } from "react";
import { View } from "react-native";
import Button from "./button";
import { Header, HeaderProps, HeaderWithChild } from "./header";

export class BaseLayoutBuilder extends Component<{ children?: React.ReactFragment, header?: Header<HeaderProps> }> {

    render() {
        return (
            <View style={{ backgroundColor: '#F2F2F2', height: '100%' }}>
                {this.props.header.render()}
                <View style={{ margin: 20 }}>
                    {this.props.children}
                </View>

                <View style={{ position: "absolute", bottom: 48, marginLeft: 'auto', justifyContent: 'center', width: '100%' }}>
                    <Button title={'Scan product'} onPress={() => {
                        alert('OK')
                    }}></Button>
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
