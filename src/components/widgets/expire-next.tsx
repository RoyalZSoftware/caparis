import { FlatList, View } from "react-native";
import { Product } from "../../data-provider/models/product";
import { ExpireNextProductListItem } from "../product-list-item";
import { Widget } from "./widget";

export function ExpireNextWidget({ expireNext }: { expireNext: Product[] }) {

    return (
        <Widget title={'Expire next'}>
            <View style={{ maxHeight: 200, overflow: 'hidden' }}>
                <FlatList data={expireNext}
                    renderItem={
                        ({ item }: { item: Product }) => <ExpireNextProductListItem item={item}></ExpireNextProductListItem>
                    }
                    keyExtractor={item => item.id}
                ></FlatList>
            </View>
        </Widget>
    );
}