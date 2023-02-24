import { Component } from "react";
import { Image, View } from "react-native";
import WelcomeLogo from '../assets/welcome-logo.png';
import Document from '../assets/icons/Document.png';
import { theme } from "../infrastructure/theme";

export function IconButton() {
    return (
        <View style={{backgroundColor: theme.colors.primary + '32', padding: theme.spacing.s, borderRadius: theme.borderRadius.m}}>

            <Image style={{ width: 24, height: 24 }} source={Document}></Image>
        </View>
    );
}


export class WithHeader extends Component<{ headerChild: any }> {

    render() {
        return (
            <View style={{ width: '100%' }}>

                <View style={{
                    backgroundColor: '#273139', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
                    justifyContent: "center", padding: 20, paddingVertical: 60, paddingBottom: 100
                }}>
                    <View style={{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>
                        <Image source={WelcomeLogo} style={{ height: 43, width: 134, display: 'flex' }} />
                        <IconButton></IconButton>
                    </View>
                </View>
                <View style={{ position: 'relative' }}>
                    <View style={{ top: -70, width: '100%', marginBottom: -70 }}>
                        <View style={{ marginHorizontal: 20 }}>
                            {this.props.headerChild}
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

export default function BaseLayout(props: { headerChild: any, children: any }) {
    const header = new WithHeader(props);

    return (<View style={{ backgroundColor: '#F2F2F2', height: '100%' }}>
        {header.render()}
        <View style={{ margin: 20 }}>
            {props.children}
        </View>
    </View>);
}
