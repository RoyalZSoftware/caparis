import { Component } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import WelcomeLogo from '../assets/welcome-logo.png';

export class WithHeader extends Component {

    render() {
        return (
            <View style={{ width: '100%' }}>

                <View style={{
                    backgroundColor: '#273139', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
                    justifyContent: "center", padding: 20, paddingVertical: 50
                }}>
                    <View style={{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>
                        <Image source={WelcomeLogo} style={{ height: 43, width: 134, display: 'flex' }} />
                        <Button onPress={() => { }} title={'Do'}></Button>
                    </View>
                </View>
                <View style={{ position: 'relative' }}>

                    <View style={{ top: -20, width: '100%' }}>
                        <View style={{ marginHorizontal: 20, backgroundColor: 'white', borderRadius: 15, padding: 20 }}>
                            {this.props.headerChildren}
                        </View>
                    </View>

                </View>
            </View>

        );
    }

}

export function ExpireNextWidget() {

    return (
        <View style={{ maxHeight: 200, overflow: 'hidden' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Expire next</Text>
            <View style={{backgroundColor: '#F2F2F2', borderRadius: 8, padding: 10}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>Tomatoes</Text>
            </View>
        </View>
    );
}
export default function BaseLayout(props) {
    const header = new WithHeader(props);

    return (<View style={{backgroundColor: '#F2F2F2', height: '100%'}}>
        {header.render()}
        <View style={{margin: 20}}>
        {props.children}
        </View>
    </View>);
}

const styles = StyleSheet.create({
});
