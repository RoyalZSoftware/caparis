import WelcomeLogo from '../assets/welcome-logo.png';
import { Component } from "react";
import { Image, Pressable, View } from "react-native";
import { theme } from './theme';
import Document from '../assets/icons/Document.png';
import { useRouter } from './router';

function IconButton() {
    return (
        <View style={{ backgroundColor: theme.colors.primary + '32', padding: theme.spacing.s, borderRadius: theme.borderRadius.m }}>
            <Image style={{ width: 24, height: 24 }} source={Document}></Image>
        </View>
    );
}

export interface HeaderProps { }


export class Header<T extends HeaderProps> extends Component<T> {
    render() {
        return (
            <View style={{ width: '100%' }}>
                {this._renderHeader()}
            </View>
        );

    }

    protected _renderHeaderImages() {
        const {setCurrentUrl, currentUrl} = useRouter();
        return (
            <View style={{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>
                <Image source={WelcomeLogo} style={{ height: 43, width: 134, display: 'flex' }} />
                <Pressable onPress={() => {
                    setCurrentUrl(currentUrl == '/home' ? '/inventory': '/home');
                }}><IconButton></IconButton></Pressable>
            </View>
        );

    }

    protected _renderHeader() {
        return (
            <View style={{
                backgroundColor: '#273139', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
                justifyContent: "center", padding: 20, paddingVertical: 60, paddingBottom: 100
            }}>
                {this._renderHeaderImages()}
            </View>
        );
    }
}

export interface HeaderWithChildProps extends HeaderProps {
    headerChild: React.ReactFragment;
}

export class HeaderWithChild<T extends HeaderWithChildProps> extends Header<T> {
    render() {
        return (
            <View style={{ width: '100%' }}>
                {this._renderHeader()}
                {this._renderHeaderChild()}
            </View>
        );
    }

    private _renderHeaderChild() {
        return (
            <View style={{ top: -70, width: '100%', marginBottom: -70 }}>
                <View style={{ marginHorizontal: 20 }}>
                    {this.props.headerChild}
                </View>
            </View>
        );
    }

}
