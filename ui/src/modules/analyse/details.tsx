import { Pressable } from "react-native";
import { useRouter } from "../../shared/router";
import { Text } from "../../shared/text";

export function DetailsScreen() {
    const { pop, currentParams } = useRouter();

    const { product } = currentParams;

    return <>
        <Text type='pageTitle'>{product.name}</Text>
        <Text type='pageTitle'>{product.quantity}</Text>
        <Pressable onPress={() => {
            pop();
        }}>
            <Text type='default'>Go back</Text></Pressable>
    </>;
}
