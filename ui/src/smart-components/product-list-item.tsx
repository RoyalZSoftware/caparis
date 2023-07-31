import { Image, View } from "react-native";
import WelcomeLogo from '../assets/welcome-logo.png';
import { formatDistanceToNow } from "date-fns";
import { Product } from "@caparis/core";
import Barcode from '../assets/fridge.png';
import { ListItem, Text, theme } from "@caparis/ui-components/src";

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

export function InventoryListItem({product}: {product: Product}) {
    const thumbnailStyles = {width: 48, height: 48, borderRadius: theme.borderRadius.m, shadowColor: theme.colors.primary};
    return <View style={{padding: theme.spacing.m, backgroundColor: theme.colors.white, marginBottom: theme.spacing.m, borderRadius: theme.borderRadius.m, display: 'flex', flexDirection: "row", alignItems: 'center'}}>
        {
            product.imageUrl ?
            <Image style={thumbnailStyles} source={{uri: product.imageUrl}}></Image>
            : <Image style={thumbnailStyles} source={Barcode}></Image>
        }
        <View style={{marginLeft: theme.spacing.m}}>
            <Text type={'listItem'}>{product.name}</Text>
            <Text type={'listItemAdditionalData'}>{product.quantity}</Text>
            
            <Text type={'listItemAdditionalData'}>Exp: {product.expiryDate.toDateString()}</Text>
        </View>
    </View>
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
                            <Text color={item.expiryDateColor()} type='default'>{formatDistanceToNow(item.expiryDate)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}