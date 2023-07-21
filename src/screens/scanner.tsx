import { Text } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from "react";
import { from } from "rxjs";
import BaseLayout from "../components/base-layout";

export interface ScannerScreenConfiguration {
    barcodeScanned: (data: string) => void;
    navigator: unknown;
};

export class DefaultScannerScreenConfiguration implements ScannerScreenConfiguration {
    barcodeScanned: (data: string) => {
    };
    navigator: unknown;
}

const canUseBarCodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        from(BarCodeScanner.requestPermissionsAsync()).subscribe(({ status }) => {
            setHasPermission(status === 'granted');
            setLoading(false);
        })
    }, []);

    return { hasPermission, loading };
}

export default function ScannerScreen(props: ScannerScreenConfiguration) {

    const { loading, hasPermission } = canUseBarCodeScanner();

    if (loading) {
        return <BaseLayout><Text>Loading...</Text></BaseLayout>;
    }

    if (!hasPermission) {
        return (<BaseLayout><Text>Please allow the camera permissions to use this feature.</Text></BaseLayout>);
    }

    return (
        <BaseLayout headerChild={
            <BarCodeScanner testID={'scanner'} onBarCodeScanned={({ data }) => props.barcodeScanned(data)}></BarCodeScanner>
        }>
            
        </BaseLayout>
    );
}

ScannerScreen.defaultProps = new DefaultScannerScreenConfiguration();