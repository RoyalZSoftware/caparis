import { Pressable } from "react-native";
import { Route, useRouter } from "../../shared/router";
import { Text } from "../../shared/text";
import { InventoryRoute } from "./inventory";

export function DetailsScreen() {
    const {navigateTo, currentParams} = useRouter();

    const {product} = currentParams;
    
    return <>
        <Text type='default'>{JSON.stringify(product)} Welt</Text>
        <Pressable onPress={() => {
            navigateTo(InventoryRoute);
        }}>
            <Text type='default'>Go back</Text></Pressable>
    </>;
}

export const DetailsRoute: Route = {
    render: <DetailsScreen></DetailsScreen>,
    title: 'Details',
    url: '/details'
}