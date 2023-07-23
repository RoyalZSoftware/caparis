import { FlatList, Text, View } from "react-native";
import { Product } from "../../core/product";
import { ExpireNextProductListItem } from "../product-list-item";
import { Widget } from "./widget";

export function ExpireNextWidget({ expireNext }: { expireNext: Product[] }) {

    return (
        <Widget title={'High priority'}>
            <View style={{ maxHeight: 200, overflow: 'hidden' }}>
                {expireNext.length == 0 ?
                    <Text>Great! No products will expire within the next 3 days.</Text> :
                    <FlatList data={expireNext}
                        renderItem={
                            ({ item }: { item: Product }) => <ExpireNextProductListItem item={item}></ExpireNextProductListItem>
                        }
                        keyExtractor={item => item.id.value}
                    ></FlatList>
                }
            </View>
        </Widget>
    );
}