import { Text, View } from "react-native";
import { Product } from "../data-provider/models/product";
import { ListItem } from "./list";

export class ProductListItem implements ListItem {
    
    constructor(private _product: Product) { }

    render() {
        return (
            <View style={{marginBottom: 10}}>
                <Text>{this._product.name}</Text>
                <Text>{new Date(this._product.expiryDate).getFullYear()}</Text>
            </View>
        );
    }

}
