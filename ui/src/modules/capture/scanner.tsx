import { Text } from "react-native";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { BaseLayout } from "../../shared/base-layout";

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
        of(0).subscribe(() => {
            setHasPermission('granted');
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
        <BaseLayout>
        <Text>Scanner Page</Text>
        </BaseLayout>
    );
}

ScannerScreen.defaultProps = new DefaultScannerScreenConfiguration();