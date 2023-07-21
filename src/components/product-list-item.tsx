import { Image, View } from "react-native";
import { Product } from "../core/product";
import { ListItem } from "./list";
import WelcomeLogo from '../assets/welcome-logo.png';
import { Text } from "./text";
import { theme } from "./theme";
import { formatDistanceToNow } from "date-fns";

export class ProductListItemBase extends ListItem<Product> {

    render() {
        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: 8, padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={WelcomeLogo}
                        style={{ width: 32, height: 32, borderRadius: 6, marginRight: 8 }} />
                </View>
            </View>
        );
    }

}

export class ExpireNextProductListItem extends ProductListItemBase {
    render() {
        const { item } = this.props;

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://images.openfoodfacts.org/images/products/807/680/951/3722/front_de.163.400.jpg' }}
                        style={{ width: 32, height: 32, borderRadius: 6, marginRight: 16 }} />
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 2, flexDirection: 'row' }}>
                        <Text type='listItem' style={{ marginRight: theme.spacing.s }}>{item.quantity}x {item.name}</Text>

                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text type='default' style={{ opacity: 0.5 }}>Exp: </Text>
                            <Text color={item.decorate().expiryDateColor} type='default'>{formatDistanceToNow(item.expiryDate)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}